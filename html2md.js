const cheerio = require('cheerio');
const minify = require('html-minifier').minify;

let escapeMD = (s) => {
    let escapeable = ['*', '#', '`', '_', '-', '[', ']', '(', ')'];
    for (let char of escapeable) {
        s = s.replace(new RegExp('\\' + char, 'g'), '\\' + char);
    }
    return s;
};

let unescapeHTML = (s) => {
    let res = s
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&amp;/g, '&')
                .replace('/&apos;/g', '\'')
                .replace(/&quot;/g, '"');
    return res;
};

let encodeHTML = (s) => { 
    let res = s.replace(/&/g, '##$AMP$##')
            .replace(/"/g, '##$QUOT$##')
            .replace(/</g, '##$LT$##')
            .replace(/\'/g, '##$APOS$##')
            .replace(/\ /g, '##$SPACE$##')
            .replace(/\t /g, '##$TAB$##')
            .replace(/\n /g, '##$NEWLINE$##')
            .replace(/>/g, '##$GT$##');
    return res;
};

let decodeHTML = (s) => {
    let res = s.replace(/\#\#\$AMP\$\#\#/g, '&')
            .replace(/\#\#\$QUOT\$\#\#/g, '"')
            .replace(/\#\#\$SPACE\$\#\#/g, ' ')
            .replace(/\#\#\$APOS\$\#\#/g, '\'')
            .replace(/\#\#\$TAB\$\#\#/g, '\t')
            .replace(/\#\#\$NEWLINE\$\#\#/g, '\n')
            .replace(/\#\#\$LT\$\#\#/g, '<')
            .replace(/\#\#\$GT\$\#\#/g, '>');
    return res;
};

let unIndent = (text) => {
    let lines = text.split('\n');
    let commonSpacing = 9999;
    let res = [];

    for (let line of lines) {
        if (line.trim()) {
            // how many spaces at the beginning?
            let count = line.search(/\S|$/);
            commonSpacing = Math.min(count, commonSpacing);
        }
    }
    
    for (let line of lines) {
        res.push(line.substring(commonSpacing));
    }

    return res.join('\n');
};

let attrMD = ($elem, leadingSpace) => {
    return '';
    let md = '';
    let cls = $elem.attr('class');
    let id = $elem.attr('id');
    let classes = cls ? cls.split(' ') : [];

    if (!id && !classes.length) return '';

    
    if (id) md += '#' + id.trim();

    for (let clsItem of classes) {
        if (clsItem.trim()) md += ' .' + clsItem.trim();
    }
    if (md.length) md = (leadingSpace ? ' ' : '')  + '{ ' + md + ' }';
    return md;
};

let empty = ($elem) => {
    let text = $elem.text();
    if (!text.length) return true;
    if (!text.trim()) return true;
    return false;
};

let prepare = {
    // prepare code so that is not affected by our operations
    'pre code': ($elem) => $elem.html(unIndent($elem.html())),
    'code': ($elem) => {
        if (!$elem.parents('pre').length) $elem.html(unIndent($elem.html()));
    },
    // only allow text in anchors
    'a': ($elem) => $elem.html($elem.text())
};

var transforms = {
    'strong': ($elem) => !empty($elem) ? '**' + $elem.text() + '**' : '',
    'i': ($elem) => !empty($elem) ? '*' + $elem.text() + '*' : '',
    'br': ($elem) => '\n',
    'p': ($elem) => !empty($elem) ? '\n\n' + $elem.text() + '\n\n' : '',
    'ul': ($elem) => '\n' + (!$elem.parents('ul,ol').length ? '\n' : '') + $elem.text().trim() + '\n' + (!$elem.parents('ul,ol').length ? '\n' : ''),
    'ol': ($elem) => '\n' + (!$elem.parents('ul,ol').length ? '\n' : '') + $elem.text().trim() + '\n' + (!$elem.parents('ul,ol').length ? '\n' : ''),
    'li': ($elem) => {
        if (empty($elem)) return '';
        let md = '';
        // get parent
        let $container = $elem.parent('ul, ol');
        let contType = ($container.length ? $container.get(0).tagName : 'ul');
        let text = $elem.text().trim();
        if (contType === 'ol') {
            $container.find('>li').is((index) => {
                md = (index+1) + '. ' + text;
            });
        } else {
            md = '- ' + text;
        }
        // check how deep we are nested and offset
        let indent = $elem.parents('ul, ol').length;
        for (i=0; i<(indent-1)*3; i++) {
            md = encodeHTML(' ') + md;
        }
        md = '\n' + md;
        return md;
    },
    'pre': ($elem) => !empty($elem) ? '\n\n```\n' + $elem.text().trim() + '\n```\n\n' : '',
    'code': ($elem) => {
        if (empty($elem)) return '';
        // only if we are not inside a pre (block)
        if (!$elem.parents('pre').length) { 
            return '`' + encodeHTML(unescapeHTML($elem.text())) + '`';
        }
        return encodeHTML(unescapeHTML($elem.text().trim()));
    },
    'a': ($elem) => {
        if (empty($elem)) return '';
        let link = $elem.attr('href');
        let title = $elem.attr('title');
        let text = $elem.text();
        if (!link || !text) return text;
        text = text.trim();
        link = link.trim();
        title = title ? title.trim() : '';
        return '[' + text + '](' + link + ' "' + title + '")' + attrMD($elem);
    },
    'img': ($elem) => {
        let src = $elem.attr('src');
        let title = $elem.attr('title');
        let alt = $elem.attr('alt') || title || '';
        if (!src) return '';
        return '![' + alt + '](' + src + ' "' + (title ? title : alt) + '")' + attrMD($elem);
    },
    'blockquote': ($elem) => {
        if (empty($elem)) return '';
        let md = '\n';
        let text = $elem.text().trim();
        let parts = text.split('\n');
        for (let part of parts) {
            md += '> ' + part.trim() + '\n';
        }
        md += '\n';
        //md = md.replace(/\>\ \n\>/g, '\n> ');
        return md;
    },
    'h1, h2, h3, h4, h5, h6': ($elem) => {
        if (empty($elem)) return '';
        let level = +$elem.get(0).tagName.replace('h', '');
        let md = '';
        for (i=0; i<level; i++) {
            md += '#';
        }
        md = '\n\n' + md + ' ' + $elem.text().replace(/\n/g, ' ') + attrMD($elem, true) + '\n\n';
        return md;
    },
    'hr': ($elem) => '\n\n___\n\n',
    '_default': ($elem) => $elem.text()
};

let html2md = function(html) {
    html = minify(html, {collapseWhitespace: true});
    const $ = cheerio.load(html);

    let elems = $('body *').toArray().reverse();

    // escape markdown in text nodes
    for (let el of elems) {
        let $el = $(el);
        if (el.children.length && !$el.is('code') && !$el.is('pre') && !$(el).parents('code, pre').length) {
            for (let child of el.children) {
                if (child.type === 'text') { 
                    child.data = escapeMD(child.data);
                }
            }
        }
    }

    // some tags need to be transformed beforehand because thier inner workings
    // dont interrest us to much and might need to be escaped, like in a <pre>
    for (let selector in prepare) {
        let fn = prepare[selector];
        $(selector).each((idx, el) => {
            $el = $(el);
            fn($el, $);
        });
    }

    // reselect because dom might have changed
    elems = $('body *').toArray().reverse();
    
    let _transforms = {};
    
    for (let tag in transforms) {
        let tags = tag.split(',');
        for (let t2 of tags) {
            if (t2.trim()) {
                _transforms[t2.trim()] = transforms[tag];
            }
        }
    }
    
    transforms = _transforms;
    
    // loop through all elements, beginning with the deepest ones in the tree and replace their outcome by their markdown equivalent
    for (let el of elems) {
        let $el = $(el);
        let tagName = el.tagName;
        let fn = transforms[tagName] ? transforms[tagName] : transforms._default;
        let res = fn($el, $);
        $el.replaceWith(res);
    }

    // get the final transformed text
    let output = $('body').text();
    // only allow a maximum of two \n after each other
    output = output.replace(/$(\n){2,999}/gm, '\n\n').trim();
    // allow only one space seperator
    output = output.replace(/(\ ){2,9999}/gm, ' ');
    // decode encoded letters back
    output = decodeHTML(output);
    
    return output;
};

module.exports = html2md;