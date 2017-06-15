const html2md = require('../lib/index.js');

let table = `
<table class="infobox biography vcard" style="width:22em;width:24em">
<caption class="fn">Michael Schumacher</caption>
<tbody><tr>
<td colspan="2" style="text-align:center"><a href="/wiki/File:Schumacher_china_2012.jpg" class="image"><img alt="Schumacher china 2012.jpg" src="//upload.wikimedia.org/wikipedia/commons/thumb/7/71/Schumacher_china_2012.jpg/220px-Schumacher_china_2012.jpg" width="220" height="349" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/7/71/Schumacher_china_2012.jpg/330px-Schumacher_china_2012.jpg 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/7/71/Schumacher_china_2012.jpg/440px-Schumacher_china_2012.jpg 2x" data-file-width="1624" data-file-height="2576"></a>
<div>Schumacher at the <a href="/wiki/2012_Chinese_Grand_Prix" title="2012 Chinese Grand Prix">2012 Chinese Grand Prix</a></div>
</td>
</tr>
<tr>
<th scope="row">Born</th>
<td><span style="display:none">(<span class="bday">1969-01-03</span>)</span> 3 January 1969 <span class="noprint ForceAgeToShow">(age&nbsp;48)</span><br>
<a href="/wiki/H%C3%BCrth" title="Hürth">Hürth</a>, <a href="/wiki/West_Germany" title="West Germany">West Germany</a></td>
</tr>
<tr>
<th colspan="2" style="text-align:center;background-color: gainsboro"><a href="/wiki/Formula_One" title="Formula One">Formula One</a> World Championship career</th>
</tr>
<tr>
<th scope="row"><a href="/wiki/FIA_Super_Licence#Nationality_of_drivers" title="FIA Super Licence">Nationality</a></th>
<td><span class="flagicon"><a href="/wiki/Germany" title="Germany"><img alt="Germany" src="//upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/23px-Flag_of_Germany.svg.png" width="23" height="14" class="thumbborder" srcset="//upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/35px-Flag_of_Germany.svg.png 1.5x, //upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/46px-Flag_of_Germany.svg.png 2x" data-file-width="1000" data-file-height="600"></a></span> German</td>
</tr>
<tr>
<th scope="row">Active years</th>
<td><a href="/wiki/1991_Formula_One_season" title="1991 Formula One season">1991</a>–<a href="/wiki/2006_Formula_One_season" title="2006 Formula One season">2006</a>, <a href="/wiki/2010_Formula_One_season" title="2010 Formula One season">2010</a>–<a href="/wiki/2012_Formula_One_season" title="2012 Formula One season">2012</a></td>
</tr>
<tr>
<th scope="row">Teams</th>
<td><a href="/wiki/Jordan_Grand_Prix" title="Jordan Grand Prix">Jordan</a>, <a href="/wiki/Benetton_Formula" title="Benetton Formula">Benetton</a>, <a href="/wiki/Scuderia_Ferrari" title="Scuderia Ferrari">Ferrari</a>, <a href="/wiki/Mercedes-Benz_in_Formula_One" title="Mercedes-Benz in Formula One">Mercedes</a></td>
</tr>
<tr>
<th scope="row">Entries</th>
<td>308 (306 starts)</td>
</tr>
<tr>
<th scope="row"><a href="/wiki/List_of_Formula_One_World_Drivers%27_Champions" title="List of Formula One World Drivers' Champions">Championships</a></th>
<td>7 (<a href="/wiki/1994_Formula_One_season" title="1994 Formula One season">1994</a>, <a href="/wiki/1995_Formula_One_season" title="1995 Formula One season">1995</a>, <a href="/wiki/2000_Formula_One_season" title="2000 Formula One season">2000</a>, <a href="/wiki/2001_Formula_One_season" title="2001 Formula One season">2001</a>, <a href="/wiki/2002_Formula_One_season" title="2002 Formula One season">2002</a>, <a href="/wiki/2003_Formula_One_season" title="2003 Formula One season">2003</a>, <a href="/wiki/2004_Formula_One_season" title="2004 Formula One season">2004</a>)</td>
</tr>
<tr>
<th scope="row"><a href="/wiki/List_of_Formula_One_Grand_Prix_winners" title="List of Formula One Grand Prix winners">Wins</a></th>
<td>91</td>
</tr>
<tr>
<th scope="row">Podiums</th>
<td>155</td>
</tr>
<tr>
<th scope="row">Career points</th>
<td>1,566</td>
</tr>
<tr>
<th scope="row"><a href="/wiki/List_of_Formula_One_polesitters" title="List of Formula One polesitters">Pole positions</a></th>
<td>68</td>
</tr>
<tr>
<th scope="row"><a href="/wiki/List_of_Formula_One_drivers_who_set_a_fastest_lap" title="List of Formula One drivers who set a fastest lap">Fastest laps</a></th>
<td>77</td>
</tr>
<tr>
<th scope="row">First entry</th>
<td><a href="/wiki/1991_Belgian_Grand_Prix" title="1991 Belgian Grand Prix">1991 Belgian Grand Prix</a></td>
</tr>
<tr>
<th scope="row">First win</th>
<td><a href="/wiki/1992_Belgian_Grand_Prix" title="1992 Belgian Grand Prix">1992 Belgian Grand Prix</a></td>
</tr>
<tr>
<th scope="row">Last win</th>
<td><a href="/wiki/2006_Chinese_Grand_Prix" title="2006 Chinese Grand Prix">2006 Chinese Grand Prix</a></td>
</tr>
<tr>
<th scope="row">Last entry</th>
<td><a href="/wiki/2012_Brazilian_Grand_Prix" title="2012 Brazilian Grand Prix">2012 Brazilian Grand Prix</a></td>
</tr>
<tr>
<td colspan="2" style="text-align:center">
<table class="infobox vcard" style="padding:0;border:none;margin:-3px;width:auto;min-width:100%;font-size:100%;clear:none;float:none;background-color:transparent;width: 24em">
<tbody><tr>
<th colspan="2" style="text-align:center;background-color: gainsboro"><a href="/wiki/24_Hours_of_Le_Mans" title="24 Hours of Le Mans">24 Hours of Le Mans</a> career</th>
</tr>
<tr>
<th scope="row"><abbr title="Participating years">Years</abbr></th>
<td><a href="/wiki/1991_24_Hours_of_Le_Mans" title="1991 24 Hours of Le Mans">1991</a></td>
</tr>
<tr>
<th scope="row">Teams</th>
<td><a href="/wiki/Sauber" title="Sauber">Team Sauber</a> <a href="/wiki/Mercedes-Benz_in_motorsport" title="Mercedes-Benz in motorsport">Mercedes</a></td>
</tr>
<tr>
<th scope="row">Best finish</th>
<td>5th in C2 (1991)</td>
</tr>
<tr>
<th scope="row">Class wins</th>
<td>0</td>
</tr>
</tbody></table>
</td>
</tr>
</tbody></table>
`

console.log(html2md(table));
