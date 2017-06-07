Möchte man neue Inhalte in seinen JTL\-Shop einfügen, sollten sich diese möglichst an das Template Design anpassen. Das CSS Framework [Bootstrap](http://getbootstrap.com/ "") bringt einige Komponenten mit, die durch das Standard EVO Template bereits eine ordentliche Optik haben und an diversen Stellen im Shop wiederverwendet werden. Nutzen wir bei eigenen Inhalten eben diese Komponenten nach, fügen sie sich quasi nahtlos in unseren Shop ein.

## Bootstrap Panel

Ein [Bootstrap Panel](http://getbootstrap.com/components/#panels "") ist im Grunde eine Box mit Titel, Inhalt und optionalem Fußbereich. Der HTML Code dafür ist recht übersichtlich.

```
<div class="panel panel-default">
  <div class="panel-heading">Panel Heading</div>
  <div class="panel-body">Panel Content</div>
</div>
```

Das EVO Template verwendet solche Panels bspw. in der Sidebar, um [Boxen](https://guide.jtl-software.de/Boxen_in_JTL-Shop_verwalten "") wie die Produktfilter in Artikellisten einheitlich darzustellen.

![Merkmalfilter im JTL-Shop mit Bootstrap Panels](https://kreativkonzentrat.de/storedocs/img/posts/cds2_default-panel.png "Merkmalfilter im JTL-Shop mit Bootstrap Panels")

Möchte man ein Bootstrap Panel in den eigenen JTL\-Shop einfügen, könnte man hierfür natürlich [Dropper](https://kreativkonzentrat.de/Dropper "") verwenden: einfach obiges HTML Grundgerüst in ein [Plain Drop](https://kreativkonzentrat.de/Plain "") kopieren, mit Inhalten füllen, ggf. die Klasse und somit die Optik des Panels \(neben `panel-default` sind Werte wie `panel-warning` oder `panel-info` möglich\) ändern und schließlich an [beliebigen Stellen des Shops einfügen](https://kreativkonzentrat.de/Wiki?page=dropper/details/einfuegemethoden "") .

![Bootstrap Panel via Plain Drop](https://kreativkonzentrat.de/storedocs/img/posts/cds2_plain-panel.png "Bootstrap Panel via Plain Drop")

In unserem Beispiel fügen wird mit `<div class="h5 panel-title">...</div>` noch ein EVO Element in den Kopfbereich ein und sorgen so dafür, dass der Titel unseres Panels auch wirklich mit den restlichen EVO Boxen harmoniert.

## Zu viel HTML

Aber man sieht bereits: eine nicht unerhebliche Menge an HTML um den eigentlichen Inhalt herum. Nicht jeder kann oder will diese HTML Elemente "erlernen". So auch die Betreiber von [Gartenallerlei.de](https://www.gartenallerlei.de/ "") , die bereits [einige weitere Drops im Einsatz](https://kreativkonzentrat.de/Dropper-Referenzen "") haben. Die Lösung war hier ein **Custom Drop** , das uns die Funktionen eines Bootstrap Panels bietet und dabei die Eingabe des HTML Grundgerüstes unnötig macht.

## Custom Drops

In der Reihe "Custom Drops Showcase" präsentieren wir euch hin und wieder eigens entwickelte Drops, die Spezialanforderungen von Shopbetreibern lösen. Custom Drops kann prinzipiell jeder entwickeln. Alles was man dafür braucht, ist Dropper Silber oder Dropper Gold und unser [umfangreiches Entwicklerhandbuch](https://kreativkonzentrat.de/Wiki?page=dropper/dev "") .

## "Content Panel" Drop

Mit dem "Content Panel" \- Custom Drop reduziert sich die Möglichkeit von Eingabefehlern, gleichzeitig steigt die Usability der Contentpflege. Titel, Inhalte und Fußbereich eines Panels können wir bequem \(und ohne Drumherum\) mit bereits bekannten [Text\- und HTML Controls](https://kreativkonzentrat.de/Wiki?page=dropper/details/controls "") eingeben. Auch beim Stil orientieren wir uns an den Möglichkeiten von Bootstrap: die o.g. Klassen wie `panel-default` können wir einfach per Button setzen.

![Content Panel Drop im Dropper Backend](https://kreativkonzentrat.de/storedocs/img/posts/cds2_backend-panel.gif "Content Panel Drop im Dropper Backend")

In unserem ersten Beispiel fügen wir ein Bannerbild inklusive Titel mit unserem Custom Drop ein. Das Bannerbild verlinkt dabei einen Auswahlassistenten, der für diese Kategorie erstellt wurde.

![Banner mit Content Panel Drop in der Sidebar](https://kreativkonzentrat.de/storedocs/img/posts/cds2_assistent-sidebar.png "Banner mit Content Panel Drop in der Sidebar")

Um unser Custom Drop flexibel einsetzen zu können, wird für den Inhalt ein HTML Control verwendet. Das wird uns auch im nächsten Beispiel noch weiterhelfen.

## Custom Drop in Custom Drop

Das Schöne an Custom Drops: sie lassen sich wie jedes anderen Drop [miteinander verknüpfen](https://kreativkonzentrat.de/Wiki?page=dropper/details/layout "") . In unserem zweiten Beispiel definieren wir den Inhalt eines Custom Panel Drops nicht via \(HTML\-\) Text, sondern verwenden ein weiteres Custom Drop, um die Ausgabe im Panel zu erzeugen. Verknüpfen können wir die Drops übrigens via Drag'n'Drop.

![Media Objects Drop wird per Drag'n'Drop verlinkt](https://kreativkonzentrat.de/storedocs/img/posts/cds2_dragndrop.gif "Media Objects Drop wird per Drag'n'Drop verlinkt")

## "Media Objects" Drop

Ein [Media Object](http://getbootstrap.com/components/#media "") ist eine weitere Bootstrap Komponente, die kleinere Textfragmente inklusive Bild darstellt. Das "Media Objects" \- Custom Drop orientiert sich wiederum an dieser Bootstrap Komponente und ermöglicht es dem Nutzer darüber hinaus, ganze [Listen](https://kreativkonzentrat.de/Wiki?page=dropper/details/controls#cmsanchor-listcontrol "") von Media Objects auszugeben. Ideal, um themenrelevante \(und ggf. auch externe\) Informationen in einer Kategorie zu verlinken. Bei Gartenallerlei sind das bspw. Beiträge aus einem externen Wordpress\-Blog.

![Media Objects Drop im Dropper Backend](https://kreativkonzentrat.de/storedocs/img/posts/cds2_backend-media.gif "Media Objects Drop im Dropper Backend")

Wir pflegen unseren eigentlichen Inhalt also im Media Objects Drop und verknüpfen das Ganze dann in ein Content Panel Drop.

![Media Objects als Beitragsteaser in der JTL-Shop Sidebar](https://kreativkonzentrat.de/storedocs/img/posts/cds2_media-objects-sidebar.png "Media Objects als Beitragsteaser in der JTL-Shop Sidebar")

Bei letzterem nutzen wir in diesem Fall noch ein kleines Feature: vor dem Panel\-Titel kann optional ein Icon angezeigt werden. Da im EVO Template bereits [Font Awesome](http://fontawesome.io/ "") integriert ist, reicht uns dazu in der Drop Konfiguration eine Angabe wie `fa fa-info-circle` .

![Font Icon Option in der Konfiguration des Content Panel Drops](https://kreativkonzentrat.de/storedocs/img/posts/cds2_panel-font-icon.png "Font Icon Option in der Konfiguration des Content Panel Drops")

## Sieht vielleicht aufwendig aus ...

... ist es aber nicht. Auch wenn die beiden Custom Drops viele Eingaben bieten: sie verwenden allesamt Standard\-Eingabeelemente. Mit unserem [Drop Builder](https://kreativkonzentrat.de/Drop-Builder-vorgestellt "") sind diese schnell zusammengestellt und grundlegend dokumentiert. Auch die Darstellung der Inhalte bereitet wenig Kopfzerbrechen: die Bootstrap Komponenten sind gut dokumentiert und werden im Standard EVO Template größenteils ordentlich dargestellt.

Auf PHP können wir hier komplett verzichten und die Ausgabe mit den Smarty Templates unserer Drops \(siehe unten\) realisieren. Alles in allem sind diese Drops in wenigen Stunden entstanden.

Dafür können die Inhalte vom Shopbetreiber oder Mitarbeitern auch ohne Kenntnisse der Bootstrap Komponenten eingefügt und gepflegt werden. Ganz davon abgesehen, dass auch bei diesen Custom Drops automatisch Backups bei jedem Speichervorgang erstellt werden, wir ohne Aufwand mehrsprachige Eingaben realisieren und unsere Inhalte unter vielen verschiedenen Bedingungen im JTL\-Shop darstellen können.

## Und warum nicht "Bootstrap Panel"?

Warum eigentlich "Content Panel" und nicht "Bootstrap Panel"? Ehrlich gesagt: zunächst war es sogar so. Aber: dieser Ansatz greift zu kurz. Denn ein weitere großer Vorteil von Drops ist, dass sie uns von Templatezwängen befreien können. Wechselt man das Template seines Shops \(z.B. weg von Bootstrap\), ändern wir einfach die `template.tpl` des Drops, die in der jetzigen Fassung viele Klassen von Bootstrap und dem EVO Template nachnutzt:

```
<div class="panel panel-{$drop.panelStyle} cds-content-panel cds-content-panel-{$drop._internal.guid} {$drop.css_class}">
    {if !empty($drop.title)}
        {strip}
            <div class="panel-heading">
                <div class="h5 panel-title">
                    {if !empty($drop.font_icon_title_css)}
                        <i class="{$drop.font_icon_title_css}"></i>
                    {/if}
                    {$drop.title}
                </div>
            </div>
        {/strip}
    {/if}
    {if !empty($drop.content)}
        <div class="panel-body">
            {if $drop.eval_smarty}
                {eval var=$drop.content}
            {else}
                {$drop.content}
            {/if}
        </div>
    {/if}
    {if $drop.show_footer && !empty($drop.footer_content)}
        <div class="panel-footer">
            {if $drop.eval_smarty}
                {eval var=$drop.footer_content}
            {else}
                {$drop.footer_content}
            {/if}
        </div>
    {/if}
</div>
```

Klassen wie `panel` oder `panel-heading` könnten wir im neuen Template einfach mit passenden Klassen ersetzen. Oder sogar die Struktur des Quelltextes anpassen. Wir machen uns also nicht von Bootstrap abhängig.

## Kleine Vorschau am Ende

In der nächsten Dropper Version werden umfangreiche Neuerungen rund um das Templating kommen. Es wird dann noch einfacher möglich sein, alternative Optiken für Drops je nach verwendeten JTL\-Shop Template auszuliefern. Und da beschränken wir uns nicht auf das Tiny oder EVO Template. Bleibt also gespannt!