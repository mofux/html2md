const html2md = require('../index.js');

let sample = 
`<div>&amp;lt;h1&amp;gt;Test&amp;lt;/h1&amp;gt;</div></div>`;

let sample2 = 
`
<pre>
			<code>
			.test {
				background: red;
				foreground: blue;
			}




		  asdflkjasdfljöasdf
			</code>
</pre>
`

let sample3 = `
<pre lang="no-highlight"><code>1. First ordered list item
2. Another item
⋅⋅* Unordered sub-list. 
1. Actual numbers don't matter, just that it's a number
⋅⋅1. Ordered sub-list
4. And another item.

⋅⋅⋅You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).

⋅⋅⋅To have a line break without a paragraph, you will need to use two trailing spaces.⋅⋅
⋅⋅⋅Note that this line is separate, but within the same paragraph.⋅⋅
⋅⋅⋅(This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.)

* Unordered list can use asterisks
- Or minuses
+ Or pluses
</code></pre>
`;

let sample4 = `
<pre>
	<code>
	&lt;!DOCTYPE html&gt;
	&lt;html lang="de"&gt;
		&lt;head&gt;
	    	&lt;!-- Meta Data --&gt;
	        &lt;meta charset="utf-8"&gt;
	        &lt;meta http-equiv="X-UA-Compatible" content="IE=edge"&gt;
	        &lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;
	        &lt;title&gt;Robert Waedow - minimalistisches webdesign&lt;/title&gt;
	        &lt;meta name="description" content="Robert Waedow - Erstellung von Medien im On- und Offline-Bereich mit dem Fokus auf das Wesentliche"/&gt;
	        &lt;meta name="keywords" content="Webdesign, JTL, Templates, HTML5, Bootstrap 3, CSS3, waedow, medienkommunikator"/&gt;
	        &lt;meta name="author" content="Robert Waedow"/&gt;
	        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"&gt;
	       	&lt;link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon"&gt; 
	        
	        &lt;!-- Stlylesheet --&gt;
	        &lt;link href="css/style.css" rel="stylesheet"&gt;
	        
	        &lt;!-- Skin Color --&gt;
	        &lt;link rel="stylesheet" href="css/colors/blue.css" id="color-skins"/&gt; 
	        &lt;!-- Smartsupp Live Chat script --&gt;
	        &lt;script type="text/javascript"&gt;
	        var _smartsupp = _smartsupp || {};
	        _smartsupp.key = 'db9c40515db09e75283b9bfd02bbde6d3cf0b293';
	        window.smartsupp||(function(d) {
	            var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
	            s=d.getElementsByTagName('script')[0];c=d.createElement('script');
	            c.type='text/javascript';c.charset='utf-8';c.async=true;
	            c.src='//www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
	        })(document);
	        &lt;/script&gt;
	        &lt;!-- Piwik --&gt;
	&lt;script type="text/javascript"&gt;
	  var _paq = _paq || [];
	  _paq.push(['trackPageView']);
	  _paq.push(['enableLinkTracking']);
	  (function() {
	    var u="//waedow.com/piwik/";
	    _paq.push(['setTrackerUrl', u+'piwik.php']);
	    _paq.push(['setSiteId', 1]);
	    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
	    g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
	  })();
	&lt;/script&gt;
	&lt;noscript&gt;&lt;p&gt;&lt;img src="//waedow.com/piwik/piwik.php?idsite=1" style="border:0;" alt="" /&gt;&lt;/p&gt;&lt;/noscript&gt;
	&lt;!-- End Piwik Code --&gt;
		&lt;/head&gt;
		&lt;body&gt;
	        &lt;!-- Start Preloader 
	        &lt;div class="preloader"&gt;
	           &lt;img src="img/assets/logo.png" class="preloader-logo" alt="preloader-logo"&gt;
	            &lt;div class="spinner"&gt;&lt;/div&gt;
	        &lt;/div&gt;
	        End Preloader --&gt;
	        
			&lt;!-- Start Home --&gt;
	    	&lt;section id="home" data-stellar-background-ratio="0.6"&gt;
	        	&lt;div class="parallax-overlay"&gt;&lt;/div&gt; 
	            &lt;div class="home-container text-center"&gt;
	            	&lt;div class="home-title" id=""&gt;
	                	&lt;div&gt;
	                        &lt;h2&gt;&lt;small class="white"&gt;Medienkommunikation&lt;/small&gt; &lt;br&gt;&lt;strong&gt;Robert Waedow&lt;/strong&gt;&lt;/h2&gt;
	                    &lt;/div&gt;
	            	&lt;/div&gt;
	            &lt;/div&gt;
	            &lt;div class="home-bottom"&gt;
	            	&lt;div class="container text-center"&gt;
	                    &lt;div class="move"&gt;
	                        &lt;a href="#about" class="fa fa-chevron-down"&gt;&lt;/a&gt;
	                        &lt;div class="dots"&gt;&lt;/div&gt;  
	                    &lt;/div&gt;  
	            	&lt;/div&gt; 
	            &lt;/div&gt;
	        &lt;/section&gt;
	        &lt;!-- End Home --&gt;
	        
	        &lt;!--Start Header--&gt;
	        &lt;section id="fixed-navbar"&gt;
				&lt;nav class="navbar navbar-default navbar-sticky" role="navigation"&gt;
					&lt;div class="container"&gt;                  
						&lt;div class="navbar-header"&gt;
							&lt;button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#main-nav"&gt;
	                            &lt;span class="sr-only"&gt;Toggle navigation&lt;/span&gt;
	                            &lt;span class="icon-bar"&gt;&lt;/span&gt;
	                            &lt;span class="icon-bar"&gt;&lt;/span&gt;
	                            &lt;span class="icon-bar"&gt;&lt;/span&gt;
						    &lt;/button&gt;
	                        &lt;a class="navbar-brand" href="#"&gt;&lt;h3&gt;Robert Waedow&lt;/h3&gt;&lt;/a&gt;
						&lt;/div&gt;
	                    &lt;div class="collapse navbar-collapse" id="main-nav"&gt;
	                        &lt;ul class="nav navbar-nav  navbar-right"&gt;
	                            &lt;li&gt;&lt;a href="#home"&gt;Start&lt;/a&gt;&lt;/li&gt;
	                            &lt;li&gt;&lt;a href="#about"&gt;Über mich&lt;/a&gt;&lt;/li&gt;
	                            &lt;li&gt;&lt;a href="#services"&gt;Leistungen&lt;/a&gt;&lt;/li&gt;
							    &lt;li&gt;&lt;a href="#portfolio"&gt;Referenzen&lt;/a&gt;&lt;/li&gt;                        
	                            &lt;li&gt;&lt;a href="#contact-form"&gt;Kontakt&lt;/a&gt;&lt;/li&gt;                         
	                            &lt;li&gt;&lt;a id="top" class="social-icon" href="#"&gt;&lt;i class="icon icon-support"&gt;&lt;/i&gt;&lt;/a&gt;&lt;/li&gt;
	                          
	                      &lt;/ul&gt;
	                    &lt;/div&gt;&lt;!-- /.navbar-collapse --&gt;
					&lt;/div&gt;&lt;!-- /.container --&gt;
				&lt;/nav&gt;
			&lt;/section&gt;
	        &lt;!--End Header--&gt;
	        
	        &lt;div class="site-wrapper"&gt;
	            &lt;!--Start About--&gt;
	            &lt;section id="about"&gt;
	                &lt;div class="container content"&gt;
	                    
	                    &lt;div class="col-lg-12 section-title-about wow fadeInUp"&gt;
	                        &lt;h2&gt;Erstellung von &lt;span class="highlight"&gt;On- und Offlinemedien&lt;/span&gt;&lt;br&gt;&lt;/h2&gt;
							&lt;p class="lead"&gt;&lt;/p&gt;
	                    &lt;/div&gt;
	                    
	                    &lt;div class="row"&gt;
	                        &lt;div class="col-md-6 col-sm-6 wow fadeIn" data-wow-delay="0.1s"&gt;
	                            &lt;div class="about-row"&gt;
	                                &lt;div class="about-icon"&gt;
	                                    &lt;i class="icon ion-pinpoint ion-3x highlight"&gt;&lt;/i&gt;
	                                    &lt;i class="icon ion-pinpoint back-icon"&gt;&lt;/i&gt;
	                                &lt;/div&gt;
	                                &lt;div class="about-info"&gt;
	                                	&lt;h4&gt;Minimalistisches Design&lt;/h4&gt;
	                                	&lt;p class="about-description"&gt;Der Fokus meiner Arbeit liegt in der Klarheit und Einfachheit der Informationsdarstellung.&lt;/p&gt;
	                                &lt;/div&gt;
	                            &lt;/div&gt;
	                        &lt;/div&gt;
	                        &lt;div class="col-md-6 col-sm-6 wow fadeIn" data-wow-delay="0.3s"&gt;
	                            &lt;div class="about-row"&gt;
	                                &lt;div class="about-icon"&gt;
	                                    &lt;i class="icon ion-gear-b ion-3x highlight"&gt;&lt;/i&gt;
	                                    &lt;i class="icon ion-gear-b back-icon"&gt;&lt;/i&gt;
	                                &lt;/div&gt;
	                                &lt;div class="about-info"&gt;
	                                  &lt;h4&gt;Zukunftsorientierte Technologien&lt;/h4&gt;
	                                    &lt;p class="about-description"&gt;Ich bin immer auf der Suche nach neuen Trends und Technologien um diese in meinen Projekten umsetzen zu können.&lt;/p&gt;
	                                &lt;/div&gt;
	                            &lt;/div&gt;
	                        &lt;/div&gt;
	                        &lt;div class="col-md-6 col-sm-6 wow fadeIn" data-wow-delay="0.1s"&gt;
	                            &lt;div class="about-row"&gt;
	                                &lt;div class="about-icon"&gt;
	                                    &lt;i class="icon ion-ios-lightbulb-outline ion-3x highlight"&gt;&lt;/i&gt;
	                                    &lt;i class="icon ion-ios-lightbulb-outline back-icon"&gt;&lt;/i&gt;
	                                &lt;/div&gt;
	                                &lt;div class="about-info"&gt;
	                                	&lt;h4&gt;Kreative Ideen&lt;/h4&gt;
	                                	&lt;p class="about-description"&gt;Außergewöhnliche Ideen entstehen meist nicht am Arbeitsplatz sondern durch Perspektivwechsel und Austausch mit anderen.&lt;/p&gt;
	                                &lt;/div&gt;
	                            &lt;/div&gt;
	                        &lt;/div&gt;
	                        &lt;div class="col-md-6 col-sm-6 wow fadeIn" data-wow-delay="0.3s"&gt;
	                            &lt;div class="about-row"&gt;
	                                &lt;div class="about-icon"&gt;
	                                    &lt;i class="icon ion-ios-heart ion-3x highlight"&gt;&lt;/i&gt;
	                                    &lt;i class="icon ion-ios-heart back-icon"&gt;&lt;/i&gt;
	                                &lt;/div&gt;
	                                &lt;div class="about-info"&gt;
	                                  &lt;h4&gt;Leidenschaftliche Internetaffinität&lt;/h4&gt;
	                                    &lt;p class="about-description"&gt;Begeisterung für moderne Designansätze ermöglichen eine ständige Zukunftsorientierung.&lt;/p&gt;
	                                &lt;/div&gt;
	                            &lt;/div&gt;
	                        &lt;/div&gt;
	                    &lt;/div&gt;
	                    
	                &lt;/div&gt;
	            &lt;/section&gt;
	            &lt;!--End About--&gt;
	            
	            &lt;!-- Start Who We Are --&gt;
	            &lt;section id="who-we-are" data-stellar-background-ratio="0.6"&gt;
	                &lt;div class="row" style="position:relative;"&gt;
	                	&lt;div class="parallax-overlay"&gt;&lt;/div&gt; 
	                    &lt;div class="container"&gt; 
	                        &lt;div class="col-md-6 col-we-are wow fadeInUp"&gt;
	                            &lt;h2 class="we-are-info"&gt;Über mich&lt;/h2&gt;          
	                            &lt;br&gt;
	                            &lt;p class="p-info"&gt;Schon als Kind war es mir immer wichtig Dinge zu verstehen. Eine technische Ausbildung und ein anschließendes Studium im Bereich der Technischen Redaktion bot die Grundlage um diese Leidenschaft zur Berufung zu machen.&lt;/p&gt; 
	                            &lt;p class="p-info"&gt;Parallel begann ich erste Projektarbeiten im On- und Offlinebereich umzusetzen.&lt;/p&gt; 
	                            &lt;p class="p-info"&gt;Im Masterstudiengang Medienkommunikation konnte ich mein medientheoretisches Wissen weiter vertiefen und an vielen unterschiedlichen Projekten anwenden. Nach meiner Masterarbeit im Bereich der Webusability wurde meine Selbstständigkeit zum Vollzeitjob.&lt;/p&gt;  
								&lt;p class="p-info"&gt;Somit bin ich nun immer auf der Suche nach neuen spannenden Projekten.&lt;/p&gt; 
	                        &lt;/div&gt;
	                        
	                        &lt;div class="col-md-6 col-md-skills wow fadeInUp" data-wow-delay="0.3s"&gt;
	                        	&lt;div class="skills-col"&gt;
	                                &lt;p&gt;&lt;em&gt;Web Design&lt;/em&gt;&lt;/p&gt;
	                                &lt;div class="skillbar" data-percent="90%"&gt;
	                                    &lt;div class="skillbar-title"&gt;&lt;span&gt;90%&lt;/span&gt;&lt;/div&gt;
	                                    &lt;div class="skillbar-bar"&gt;&lt;/div&gt;
	                                &lt;/div&gt;
	                                                               
	                                &lt;p&gt;&lt;em&gt;E-Commerce&lt;/em&gt;&lt;/p&gt;
	                                &lt;div class="skillbar" data-percent="70%"&gt;
	                                    &lt;div class="skillbar-title"&gt;&lt;span&gt;70%&lt;/span&gt;&lt;/div&gt;
	                                    &lt;div class="skillbar-bar"&gt;&lt;/div&gt;
	                                &lt;/div&gt;

	                                &lt;p&gt;&lt;em&gt;JTL-Shop&lt;/em&gt;&lt;/p&gt;
	                                &lt;div class="skillbar" data-percent="75%"&gt;
	                                    &lt;div class="skillbar-title"&gt;&lt;span&gt;75%&lt;/span&gt;&lt;/div&gt;
	                                    &lt;div class="skillbar-bar"&gt;&lt;/div&gt;
	                                &lt;/div&gt;

	                                &lt;p&gt;&lt;em&gt;Dropper&lt;/em&gt;&lt;/p&gt;
	                                &lt;div class="skillbar" data-percent="80%"&gt;
	                                    &lt;div class="skillbar-title"&gt;&lt;span&gt;80%&lt;/span&gt;&lt;/div&gt;
	                                    &lt;div class="skillbar-bar"&gt;&lt;/div&gt;
	                                &lt;/div&gt;

	                                &lt;p&gt;&lt;em&gt;Print Design&lt;/em&gt;&lt;/p&gt;
	                                &lt;div class="skillbar" data-percent="60%"&gt;
	                                    &lt;div class="skillbar-title"&gt;&lt;span&gt;60%&lt;/span&gt;&lt;/div&gt;
	                                    &lt;div class="skillbar-bar"&gt;&lt;/div&gt;
	                                &lt;/div&gt;
	                               
	                            &lt;/div&gt;
	                		&lt;/div&gt; 

	                	&lt;/div&gt;
	                &lt;/div&gt;
	            &lt;/section&gt;
	        	&lt;!-- End Who We Are --&gt;        

	            &lt;!-- Start Services --&gt;
	            &lt;section id="services"&gt;
	                &lt;div class="container"&gt;
	                    
	                    &lt;div class="col-lg-12 section-title wow fadeIn"&gt;
	                        &lt;h2&gt;&lt;strong&gt;Leistungen&lt;/strong&gt;&lt;/h2&gt;
	                        &lt;p class="lead"&gt;Grundsätzlich habe ich immer Interesse an neuen Projekten&lt;/p&gt;
	                    &lt;/div&gt;
	                    
	                    &lt;div class="services-container"&gt;
	                        &lt;div class="row services-row"&gt;
	                            &lt;div class="col-md-4 col-sm-6 wow fadeIn" data-wow-delay="0.1s"&gt;
	                                &lt;div class="service"&gt;
	                                    &lt;div class="service-icon"&gt;
	                                        &lt;i class="icon ion-ios-monitor-outline ion-5x highlight"&gt;&lt;/i&gt;
	                                    &lt;/div&gt;
	                                    &lt;div class="service-info"&gt;
	                                      &lt;h4&gt;Webdesign&lt;/h4&gt;
	                                    
	                                    &lt;/div&gt;
	                                &lt;/div&gt;
	                            &lt;/div&gt;
	                            &lt;div class="col-md-4 col-sm-6 wow fadeIn" data-wow-delay="0.2s"&gt;
	                                &lt;div class="service"&gt;
	                                    &lt;div class="service-icon"&gt;
	                                        &lt;i class="icon icon-jtl ion-5x highlight"&gt;&lt;/i&gt;
	                                    &lt;/div&gt;
	                                    &lt;div class="service-info"&gt;
	                                      &lt;h4&gt;JTL-Shop Templates&lt;/h4&gt;
	                                       
	                                    &lt;/div&gt;
	                                &lt;/div&gt;
	                            &lt;/div&gt;
	                            &lt;div class="col-md-4 col-sm-6 wow fadeIn" data-wow-delay="0.3s"&gt;
	                                &lt;div class="service"&gt;
	                                    &lt;div class="service-icon"&gt;
	                                        &lt;i class="icon ion-social-wordpress ion-5x highlight"&gt;&lt;/i&gt;
	                                    &lt;/div&gt;
	                                    &lt;div class="service-info"&gt;
	                                      &lt;h4&gt;Wordpress&lt;/h4&gt;
	                                       
	                                    &lt;/div&gt;
	                                &lt;/div&gt;
	                            &lt;/div&gt;                
	                            &lt;div class="col-md-4 col-sm-6 wow fadeIn" data-wow-delay="0.4s"&gt;
	                                &lt;div class="service"&gt;
	                                    &lt;div class="service-icon"&gt;
	                                        &lt;i class="icon ion-map ion-5x highlight"&gt;&lt;/i&gt;
	                                    &lt;/div&gt;
	                                    &lt;div class="service-info"&gt;
	                                      &lt;h4&gt;Printmedien&lt;/h4&gt;
	                                       
	                                    &lt;/div&gt;
	                                &lt;/div&gt;
	                            &lt;/div&gt;
	                            &lt;div class="col-md-4 col-sm-6 wow fadeIn" data-wow-delay="0.5s"&gt;
	                                &lt;div class="service"&gt;
	                                    &lt;div class="service-icon"&gt;
	                                    	&lt;i class="icon ion-ionic ion-5x highlight"&gt;&lt;/i&gt;
	                                    &lt;/div&gt;
	                                    &lt;div class="service-info"&gt;
	                                      &lt;h4&gt;Kundenbetreuung&lt;/h4&gt;
	                                       
	                                    &lt;/div&gt;
	                                &lt;/div&gt;
	                            &lt;/div&gt;
	                            &lt;div class="col-md-4 col-sm-6 wow fadeIn" data-wow-delay="0.6s"&gt;
	                                &lt;div class="service"&gt;
	                                    &lt;div class="service-icon"&gt;
	                                        &lt;i class="icon ion-paper-airplane ion-5x highlight"&gt;&lt;/i&gt;
	                                    &lt;/div&gt;
	                                    &lt;div class="service-info"&gt;
	                                      &lt;h4&gt;Zukunftsideen&lt;/h4&gt;
	                                       
	                                    &lt;/div&gt;
	                                &lt;/div&gt;
	                            &lt;/div&gt;                
	                        &lt;/div&gt;
	                	&lt;/div&gt;
	                    
	                &lt;/div&gt;
	            &lt;/section&gt;
	            &lt;!-- End Services --&gt;
	            &lt;!-- Start Separator-Quotes --&gt;
	            &lt;section id="separator-quotes" data-stellar-background-ratio="0.6"&gt;
	                &lt;div class="row text-center" style="position:relative;"&gt;
	                	&lt;div class="parallax-overlay"&gt;&lt;/div&gt; 
	                    &lt;div class="quotes liquid-slider" id="quotes-slider"&gt;
	                        &lt;div class="col-lg-12"&gt;
	                            &lt;h2&gt;&lt;i class="fa fa-quote-left highlight"&gt;&lt;/i&gt; &lt;small class="white"&gt;Perfektion ist nicht dann erreicht, wenn man nichts mehr hinzufügen, sondern nichts mehr weglassen kann&lt;/small&gt;&lt;i class="fa fa-quote-right highlight"&gt;&lt;/i&gt;&lt;/h2&gt;
	                            &lt;p class="label label-primary"&gt;Antoine de Saint-Exupary&lt;/p&gt;
	                        &lt;/div&gt;
	                        &lt;div class="col-lg-12"&gt;
	                            &lt;h2&gt;&lt;i class="fa fa-quote-left highlight"&gt;&lt;/i&gt;&lt;small class="white"&gt;Kreativität ist &lt;/small&gt;funktionales Chaos &lt;small class="white"&gt;im Kopf.&lt;/small&gt;&lt;i class="fa fa-quote-right highlight"&gt;&lt;/i&gt;&lt;/h2&gt;
	                            &lt;p class="label label-primary"&gt;Aba Assa&lt;/p&gt;
	                        &lt;/div&gt;
	                        &lt;div class="col-lg-12"&gt;
	                            &lt;h2&gt;&lt;i class="fa fa-quote-left highlight"&gt;&lt;/i&gt; Einfachheit&lt;small class="white"&gt; ist die höchste Form der Raffinesse&lt;/small&gt; &lt;i class="fa fa-quote-right highlight"&gt;&lt;/i&gt;&lt;/h2&gt;
	                            &lt;p class="label label-primary"&gt;DIETER F. UCHTDORF&lt;/p&gt;
	                        &lt;/div&gt;
	            		&lt;/div&gt;
	                    
	                &lt;/div&gt;
	            &lt;/section&gt;
	        	&lt;!-- End Separator-Quotes --&gt;
	            &lt;!-- Start Portfolio Section --&gt;  
	            &lt;section id="portfolio"&gt; 
	                &lt;div class="container"&gt;                
	                    &lt;div class="col-lg-12 section-title wow fadeInUp"&gt;
	                        &lt;h2&gt;&lt;strong&gt;Referenzen&lt;/strong&gt;&lt;/h2&gt;
	                        &lt;p class="lead"&gt;Eine kleine Auswahl realisierter Projekte&lt;span class="highlight"&gt;&lt;/span&gt;&lt;/p&gt;
	                    &lt;/div&gt;
	                    &lt;div id="filters-container-fullwidth" class="cbp-l-filters-button wow fadeInUp"&gt;
	                        &lt;div data-filter="*" class="cbp-filter-item-active cbp-filter-item"&gt;All&lt;div class="cbp-filter-counter"&gt;&lt;/div&gt;&lt;/div&gt;

	                    &lt;/div&gt;
	                    &lt;div id="grid-container-fullwidth" class="cbp-l-grid-fullScreen"&gt;
	                        &lt;ul&gt;   
	                            
	                            &lt;li class="cbp-item effect effects identity logo"&gt;
	                                &lt;div class="img"&gt;
	                                    &lt;img src="img/portfolio/1.png" class="img-responsive" alt="" /&gt;
	                                    &lt;div class="overlay"&gt;
	                                        &lt;ul class="expand"&gt;
	                                            &lt;li class="cbp-l-caption-title"&gt;kreativkonzentrat&lt;/li&gt;
	                                            &lt;li class="cbp-l-caption-desc"&gt;Logodesign, Kundenkommunikation, Marketing&lt;/li&gt;
	                                            &lt;li class="cbp-l-icon"&gt;&lt;a href="https://kreativkonzentrat.de" target="_blank" class="extern-link"&gt;&lt;i class="icon-link"&gt;&lt;/i&gt;&lt;/a&gt;&lt;/li&gt;
	                                        &lt;/ul&gt;
	                                    &lt;/div&gt;
	                                &lt;/div&gt;
	                            &lt;/li&gt; 

	                            &lt;li class="cbp-item effect effects identity logo"&gt;
	                                &lt;div class="img"&gt;
	                                    &lt;img src="img/portfolio/ehv.png" class="img-responsive" alt="" /&gt;
	                                    &lt;div class="overlay"&gt;
	                                        &lt;ul class="expand"&gt;
	                                            &lt;li class="cbp-l-caption-title"&gt;EHV GmbH&lt;/li&gt;
	                                            &lt;li class="cbp-l-caption-desc"&gt;Design + Umsetzung&lt;/li&gt;
	                                            &lt;li class="cbp-l-icon"&gt;&lt;a href="http://ehv-gmbh.de" target="_blank" class="extern-link"&gt;&lt;i class="icon-link"&gt;&lt;/i&gt;&lt;/a&gt;&lt;/li&gt;
	                                        &lt;/ul&gt;
	                                    &lt;/div&gt;
	                                &lt;/div&gt;
	                            &lt;/li&gt; 

	                            &lt;li class="cbp-item effect effects identity logo"&gt;
	                                &lt;div class="img"&gt;
	                                    &lt;img src="img/portfolio/dibadu.png" class="img-responsive" alt="" /&gt;
	                                    &lt;div class="overlay"&gt;
	                                        &lt;ul class="expand"&gt;
	                                            &lt;li class="cbp-l-caption-title"&gt;dibadu&lt;/li&gt;
	                                            &lt;li class="cbp-l-caption-desc"&gt;JTL, Template, Design&lt;/li&gt;
	                                            &lt;li class="cbp-l-icon"&gt;&lt;a href="https://dibadu.de" target="_blank" class="extern-link"&gt;&lt;i class="icon-link"&gt;&lt;/i&gt;&lt;/a&gt;&lt;/li&gt;
	                                        &lt;/ul&gt;
	                                    &lt;/div&gt;
	                                &lt;/div&gt;
	                            &lt;/li&gt; 

	                            &lt;li class="cbp-item effect effects identity logo"&gt;
	                                &lt;div class="img"&gt;
	                                    &lt;img src="img/portfolio/bloodmilla.png" class="img-responsive" alt="" /&gt;
	                                    &lt;div class="overlay"&gt;
	                                        &lt;ul class="expand"&gt;
	                                            &lt;li class="cbp-l-caption-title"&gt;bloodmilla&lt;/li&gt;
	                                            &lt;li class="cbp-l-caption-desc"&gt;JTL, Templateanpassung&lt;/li&gt;
	                                            &lt;li class="cbp-l-icon"&gt;&lt;a href="https://bloodmilla.de" target="_blank" class="extern-link"&gt;&lt;i class="icon-link"&gt;&lt;/i&gt;&lt;/a&gt;&lt;/li&gt;
	                                        &lt;/ul&gt;
	                                    &lt;/div&gt;
	                                &lt;/div&gt;
	                            &lt;/li&gt; 

	                            &lt;li class="cbp-item effect effects identity logo"&gt;
	                                &lt;div class="img"&gt;
	                                    &lt;img src="img/portfolio/omp.png" class="img-responsive" alt="" /&gt;
	                                    &lt;div class="overlay"&gt;
	                                        &lt;ul class="expand"&gt;
	                                            &lt;li class="cbp-l-caption-title"&gt;onlinemarketing.plus&lt;/li&gt;
	                                            &lt;li class="cbp-l-caption-desc"&gt;Wordpress&lt;/li&gt;
	                                            &lt;li class="cbp-l-icon"&gt;&lt;a href="http://onlinemarketing.plus" target="_blank" class="extern-link"&gt;&lt;i class="icon-link"&gt;&lt;/i&gt;&lt;/a&gt;&lt;/li&gt;
	                                        &lt;/ul&gt;
	                                    &lt;/div&gt;
	                                &lt;/div&gt;
	                            &lt;/li&gt; 

	                            &lt;li class="cbp-item effect effects identity logo"&gt;
	                                &lt;div class="img"&gt;
	                                    &lt;img src="img/portfolio/sieben-meilen.png" class="img-responsive" alt="" /&gt;
	                                    &lt;div class="overlay"&gt;
	                                        &lt;ul class="expand"&gt;
	                                            &lt;li class="cbp-l-caption-title"&gt;Sieben Meilen&lt;/li&gt;
	                                            &lt;li class="cbp-l-caption-desc"&gt;JTL, Templateanpassung&lt;/li&gt;
	                                            &lt;li class="cbp-l-icon"&gt;&lt;a href="https://sieben-meilen.de" target="_blank" class="extern-link"&gt;&lt;i class="icon-link"&gt;&lt;/i&gt;&lt;/a&gt;&lt;/li&gt;
	                                        &lt;/ul&gt;
	                                    &lt;/div&gt;
	                                &lt;/div&gt;
	                            &lt;/li&gt;                            
	                            
	                            &lt;li class="cbp-item effect effects identity logo"&gt;
	                                &lt;div class="img"&gt;
	                                    &lt;img src="img/portfolio/2.png" class="img-responsive" alt="" /&gt;
	                                    &lt;div class="overlay"&gt;
	                                        &lt;ul class="expand"&gt;
	                                            &lt;li class="cbp-l-caption-title"&gt;employ in Sydney&lt;/li&gt;
	                                            &lt;li class="cbp-l-caption-desc"&gt;Templateumsetzung, Visitenkarten, Broschüren&lt;/li&gt;
	                                            &lt;li class="cbp-l-icon"&gt;&lt;a href="http://www.employ.com.au/" target="_blank" class="extern-link"&gt;&lt;i class="icon-link"&gt;&lt;/i&gt;&lt;/a&gt;&lt;/li&gt;
	                                        &lt;/ul&gt;
	                                    &lt;/div&gt;
	                                &lt;/div&gt;
	                            &lt;/li&gt;
	                            
	                            &lt;li class="cbp-item effect effects web-design"&gt;
	                                &lt;div class="img"&gt;
	                                    &lt;img src="img/portfolio/3.png" class="img-responsive" alt="" /&gt;
	                                    &lt;div class="overlay"&gt;
	                                        &lt;ul class="expand"&gt;
	                                            &lt;li class="cbp-l-caption-title"&gt;brotkult&lt;/li&gt;
	                                            &lt;li class="cbp-l-caption-desc"&gt;Templateumsetzung, Startseitendesign&lt;/li&gt;
	                                            &lt;li class="cbp-l-icon"&gt;&lt;a href="http://www.brotkult.de" target="_blank" class="extern-link"&gt;&lt;i class="icon-link"&gt;&lt;/i&gt;&lt;/a&gt;&lt;/li&gt;
	                                        &lt;/ul&gt;
	                                    &lt;/div&gt;
	                                &lt;/div&gt;
	                            &lt;/li&gt;
	                            
	                            &lt;li class="cbp-item effect effects motion identity"&gt;
	                                &lt;div class="img"&gt;
	                                    &lt;img src="img/portfolio/4.png" class="img-responsive" alt="" /&gt;
	                                    &lt;div class="overlay"&gt;
	                                        &lt;ul class="expand"&gt;
	                                            &lt;li class="cbp-l-caption-title"&gt;bäckereioptimierer&lt;/li&gt;
	                                            &lt;li class="cbp-l-caption-desc"&gt;Design, Templateumsetzung, Wordpress&lt;/li&gt;
	                                            &lt;li class="cbp-l-icon"&gt;&lt;a href="http://www.baeckerei-optimierer.de/" target="_blank" class="extern-link"&gt;&lt;i class="icon-link"&gt;&lt;/i&gt;&lt;/a&gt;&lt;/li&gt;
	                                        &lt;/ul&gt;
	                                    &lt;/div&gt;
	                                &lt;/div&gt;
	                            &lt;/li&gt;
	                            
	                            &lt;li class="cbp-item effect effects identity"&gt;
	                                &lt;div class="img"&gt;
	                                    &lt;img src="img/portfolio/5.png" class="img-responsive" alt="" /&gt;
	                                    &lt;div class="overlay"&gt;
	                                        &lt;ul class="expand"&gt;
	                                            &lt;li class="cbp-l-caption-title"&gt;balugar Shop&lt;/li&gt;
	                                            &lt;li class="cbp-l-caption-desc"&gt;Startseitendesign, JTL-Shop3&lt;/li&gt;
	                                            &lt;li class="cbp-l-icon"&gt;&lt;a href="http://www.balugar.de" target="_blank" class="extern-link"&gt;&lt;i class="icon-link"&gt;&lt;/i&gt;&lt;/a&gt;&lt;/li&gt;
	                                        &lt;/ul&gt;
	                                    &lt;/div&gt;
	                                &lt;/div&gt;
	                            &lt;/li&gt;
	                            
	                            &lt;li class="cbp-item effect effects web-design"&gt;
	                                &lt;div class="img"&gt;
	                                    &lt;img src="img/portfolio/6.png" class="img-responsive" alt="" /&gt;
	                                    &lt;div class="overlay"&gt;
	                                        &lt;ul class="expand"&gt;
	                                            &lt;li class="cbp-l-caption-title"&gt;food-it&lt;/li&gt;
	                                            &lt;li class="cbp-l-caption-desc"&gt;Design, Templates, Kundenprojekte, Wordpress&lt;/li&gt;
	                                            &lt;li class="cbp-l-icon"&gt;&lt;a href="http://www.food-it.de" target="_blank" class="extern-link"&gt;&lt;i class="icon-link"&gt;&lt;/i&gt;&lt;/a&gt;&lt;/li&gt;
	                                        &lt;/ul&gt;
	                                    &lt;/div&gt;
	                                &lt;/div&gt;
	                            &lt;/li&gt; 
	                            
	                            &lt;li class="cbp-item effect effects identity motion"&gt;
	                                &lt;div class="img"&gt;
	                                    &lt;img src="img/portfolio/7.png" class="img-responsive" alt="" /&gt;
	                                    &lt;div class="overlay"&gt;
	                                        &lt;ul class="expand"&gt;
	                                            &lt;li class="cbp-l-caption-title"&gt;the echo group&lt;/li&gt;
	                                            &lt;li class="cbp-l-caption-desc"&gt;Logodesign, Wordpress, Templates&lt;/li&gt;
	                                            &lt;li class="cbp-l-icon"&gt;&lt;a href="https://echogroup.com.au/" target="_blank" class="extern-link"&gt;&lt;i class="icon-link"&gt;&lt;/i&gt;&lt;/a&gt;&lt;/li&gt;
	                                        &lt;/ul&gt;
	                                    &lt;/div&gt;
	                                &lt;/div&gt;
	                            &lt;/li&gt; 
	                            
	                            &lt;li class="cbp-item effect effects web-design graphic"&gt;
	                                &lt;div class="img"&gt;
	                                    &lt;img src="img/portfolio/8.png" class="img-responsive" alt="" /&gt;
	                                    &lt;div class="overlay"&gt;
	                                        &lt;ul class="expand"&gt;
	                                            &lt;li class="cbp-l-caption-title"&gt;baeckerprogramm.de&lt;/li&gt;
	                                            &lt;li class="cbp-l-caption-desc"&gt;Website, Messematerialien&lt;/li&gt;
	                                            &lt;li class="cbp-l-icon"&gt;&lt;a href="http://baeckerprogramm.de" target="_blank" class="extern-link"&gt;&lt;i class="icon-link"&gt;&lt;/i&gt;&lt;/a&gt;&lt;/li&gt;
	                                        &lt;/ul&gt;
	                                    &lt;/div&gt;
	                                &lt;/div&gt;
	                            &lt;/li&gt;
	                            
	                            &lt;li class="cbp-item effect effects graphic logo"&gt;
	                                &lt;div class="img"&gt;
	                                    &lt;img src="img/portfolio/9.png" class="img-responsive" alt="" /&gt;
	                                    &lt;div class="overlay"&gt;
	                                        &lt;ul class="expand"&gt;
	                                            &lt;li class="cbp-l-caption-title"&gt;Philosophischer Frühling&lt;/li&gt;
	                                            &lt;li class="cbp-l-caption-desc"&gt;Design für Flyer und Poster&lt;/li&gt;
	                                        &lt;/ul&gt;
	                                    &lt;/div&gt;
	                                &lt;/div&gt;
	                            &lt;/li&gt;  
	                            
	                        &lt;/ul&gt;
	                    &lt;/div&gt;
	                &lt;/div&gt;
	            &lt;/section&gt;
	            &lt;!-- End Portfolio Section --&gt;           

	            &lt;!-- Start Google Map --&gt;
	            &lt;section id="map-section"&gt;
	            	&lt;div id="map"&gt;
					&lt;/div&gt;
	            &lt;/section&gt;
	            &lt;!-- End Google Map --&gt;			
	 
	            &lt;!-- Start Contact Form --&gt;
	            &lt;section id="contact-form"&gt;
	            	&lt;div class="container"&gt;
	                	&lt;div class="col-lg-12 section-title wow fadeInUp"&gt;
	                        &lt;h2&gt;&lt;strong&gt;Lust auf eine Zusammenarbeit?&lt;/strong&gt;&lt;/h2&gt;
	                        &lt;p class="lead"&gt;Melde dich!&lt;span class="highlight"&gt;&lt;/span&gt;&lt;/p&gt;
	                    &lt;/div&gt;
	                	&lt;div class="col-lg-12 text-center wow fadeInUp" id="contact"&gt;
	                    	&lt;div id="message"&gt;&lt;/div&gt;
	                        &lt;form method="post" action="contact.php" name="contactform" id="contactform"&gt;
	                        &lt;fieldset&gt;
	                        &lt;div class="col-md-6"&gt; 
	                            &lt;input name="name" type="text" id="name" size="30" value="" placeholder="Name"/&gt;
	                            &lt;br /&gt;
	                            &lt;input name="email" type="text" id="email" size="30" value="" placeholder="Email"/&gt;
	                            &lt;br /&gt; 
	                            &lt;input name="phone" type="text" id="phone" size="30" value="" placeholder="Telefon"/&gt;
	                		&lt;/div&gt;
	                        &lt;div class="col-md-6"&gt; 
	                            &lt;textarea name="comments" cols="40" rows="5" id="comments" placeholder="Nachricht"&gt;&lt;/textarea&gt;
	                        &lt;/div&gt;
	                        &lt;div class="col-md-12 text-center"&gt;
	                            &lt;input type="submit" class="submit" id="submit" value="Senden" /&gt;
	                        &lt;/div&gt;
	                        &lt;/fieldset&gt;
	                        &lt;/form&gt;
	                    &lt;/div&gt;
	                &lt;/div&gt;
	            &lt;/section&gt;
	            &lt;!-- End Contact Form --&gt;
	             
	            &lt;!-- Start Footer --&gt;
	            &lt;footer id="footer"&gt;
	            	&lt;div class="col-lg-12 text-center"&gt;
	            		&lt;div class="back-to-top"&gt;
	                        &lt;i class="fa fa-angle-double-up"&gt;&lt;/i&gt;
	                    &lt;/div&gt;
	                &lt;/div&gt;
	            	&lt;div class="container text-center"&gt;
	                	&lt;div class="row"&gt;
	                        &lt;div class="col-lg-12 footer-menu"&gt;
	                            &lt;span class="pull-left text-left"&gt;Copyright @ 2016 &lt;br /&gt;Robert Waedow&lt;br /&gt;Institutsgasse 6&lt;br /&gt;01067 Dresden&lt;br /&gt;&lt;!-- 0351 84 70 89 61 --&gt;0174-2049760&lt;br /&gt;kontakt@waedow.com&lt;/span&gt;
	                            &lt;span class="pull-right"&gt;
	                                &lt;a href="#home"&gt;Start&lt;/a&gt;
	                                &lt;a href="#about"&gt;Über mich&lt;/a&gt;
	                                &lt;a href="#services"&gt;Leistungen&lt;/a&gt;
	                                &lt;a href="#portfolio"&gt;Referenzen&lt;/a&gt;
	                                &lt;a href="#contact"&gt;Kontakt&lt;/a&gt;
									&lt;a href="impressum.html"&gt;Impressum&lt;/a&gt;
	                            &lt;/span&gt;
	                        &lt;/div&gt;
	                       &lt;a rel="nofollow" style="color: #333;" href="https://webmail.netcupmail.de"&gt;.&lt;/a&gt;
	        			&lt;/div&gt;
	                &lt;/div&gt;
	            &lt;/footer&gt;
	            &lt;!-- End Footer --&gt;
			&lt;/div&gt;
	 
	        &lt;!-- jQuery Plugins --&gt;
	        &lt;script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"&gt;&lt;/script&gt;
	        &lt;script src="js/plugins/bootstrap.min.js"&gt;&lt;/script&gt; 
	        &lt;script src="js/plugins/smoothscroll.js"&gt;&lt;/script&gt;
			&lt;script src="js/plugins/jquery.liquid-slider.js"&gt;&lt;/script&gt;
	        &lt;script src="js/plugins/jquery.stellar.js" type="text/javascript"&gt;&lt;/script&gt;    
	        &lt;script src="js/plugins/jquery.sticky.js" type="text/javascript"&gt;&lt;/script&gt; 
	        &lt;script src="js/plugins/waypoints.min.js" type="text/javascript"&gt;&lt;/script&gt;
	        &lt;script src="js/plugins/wow.min.js" type="text/javascript"&gt;&lt;/script&gt;
	        &lt;script src="js/plugins/jquery.counterup.min.js" type="text/javascript"&gt;&lt;/script&gt;
	        &lt;script src="js/plugins/moderniz.min.js"&gt;&lt;/script&gt; 
			&lt;script src="js/plugins/jquery.easing.1.3.min.js"&gt;&lt;/script&gt;
			&lt;script src="js/plugins/jquery.touchSwipe.min.js"&gt;&lt;/script&gt;
	        &lt;script src="js/plugins/jquery.cubeportfolio.min.js" type="text/javascript"&gt;&lt;/script&gt;
	        &lt;script src="js/plugins/jquery.flexslider-min.js" type="text/javascript"&gt;&lt;/script&gt;
	        &lt;script src="js/plugins/jquery.mb.YTPlayer.js" type="text/javascript"&gt;&lt;/script&gt;
			&lt;script src="js/plugins/jquery.backstretch.min.js"&gt;&lt;/script&gt;
	        &lt;script src="js/plugins/tweetie.js" type="text/javascript"&gt;&lt;/script&gt;
	        &lt;script src="https://maps.googleapis.com/maps/api/js?sensor=false" type="text/javascript"&gt;&lt;/script&gt; 
	        &lt;script src="js/plugins/gmap3.min.js" type="text/javascript"&gt;&lt;/script&gt; 
	        &lt;script src="js/plugins/revslider.min.js" type="text/javascript"&gt;&lt;/script&gt; 
			&lt;script src="js/scripts.js" type="text/javascript"&gt;&lt;/script&gt; 
	 
		&lt;/body&gt;
	&lt;/html&gt;
	</code>
</pre>
`;

let sample5 = `
<div>- test 1</div>
<div>- test2</div>
<div>- test 3</div>
`;

/*
console.log(html2md(sample4));

console.log(html2md(sample3));

console.log(html2md(sample2));

console.log(html2md(sample, {
	// make rendering lists possible, even if they are not a list in html
	utils: (utils) => {
		utils.escapeable = ['[', ']', '(', ')', '#', '`']; // ['*', '#', '`', '_', '-', '+', '[', ']', '(', ')'];
		return utils;
	}
}));
*/

console.log(html2md(sample5)) /*, {
	// make rendering lists possible, even if they are not a list in html
	utils: (utils) => {
		utils.escapeable = ['[', ']', '(', ')', '#', '`']; // ['*', '#', '`', '_', '-', '+', '[', ']', '(', ')'];
		return utils;
	}
}));
*/
