let html = `
		<table cellspacing="0" cellpadding="0" width="100%" border="0"><tbody><tr><td align="center">
	            <table class="deviceWidth" style="padding: 20px;" cellspacing="0" cellpadding="0" bgcolor="#FBFAF7" width="768" border="0"><tbody><tr><td>
	                    <table class="deviceWidth" cellspacing="0" cellpadding="0" bgcolor="#FFFFFF" width="100%" border="0"><tbody><tr><td style="padding: 20px; border-bottom-color: #EEEEE9; border-bottom-style: dotted; border-bottom-width: 3px;" class="center"><a href="https://www.test.at" target="_blank"><img src="https://www.spritzwerk.at/images/mail_templates/spritzwerk_logo.png" alt="Test" height="60" width="auto"></a></td>
	                        </tr><tr><td style="padding: 20px; font-size: 12px; line-height: 18px;">Hey Max, <br><br>
	                            Sine line<br><br>
	                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?<br><br></td>
	                        </tr><tr><td style="padding: 20px; font-size: 10px; color: #7F7E7E;" class="center" bgcolor="#FBFAF7">
	                            Some Stuff inside here...
	                          </td>
	                        </tr></tbody></table></td>
	                </tr></tbody></table></td>
	        </tr></tbody></table>
`;

const html2md = require('../lib/index.js');
console.log(html2md(html, {
	disable: ['table']
}));