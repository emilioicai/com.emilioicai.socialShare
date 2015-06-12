# com.emilioicai.socialShare
## What is this?
![](screenshot.png?raw=true)

This widget is a standalone sharing buttons bar for the most popular social networks and messaging apps. It allows users to share a predefined string.
## Usage
To include the widget in your app with Alloy just add this tag into your view:
<Require type="widget" src="com.emilioicai.socialShare" id="socialShare"/>

### init(config)
Initializes the social sharing buttons. Config can contain the following properties:
- text: text to be shared in all the social networks or messaging apps
- title: title of the social post (where it makes sense i.e. facebook)
- url: link to be added to the social post
- picture: image included in the social post (where it makes sense i.e. facebook)
- email.subject: subject to be added when sharing by email
- email.errorMsg: error message to be displayed if the email client is not available in the device
- twitter.errorMsg: error message to be displayed if twitter is not available in the device
- facebook.errorMsg: error message to be displayed if facebook is not available in the device
- whatsapp.errorMsg: error message to be displayed if whatsapp is not available in the device
- onSuccess: callback to be fired in case the sharing was successful

```
var shareUrl = "http://9gag.com";
var textForSocialPost = "Check this out!";
var title = "The best site in the interwebs";
var picture = "http://9gag.com/logo.jpg";
var socialOptions = {
	top: 5,
	text: textForSocialPost,
	title: title,
	url: shareUrl,
	picture: picture,
	email: {
		subject: L('sharing_emailsubject'),
		errorMsg: L('mail_not_supported_body')
	},
	twitter: {
		errorMsg: L('twitter_error')
	},
	facebook: {
		errorMsg: L('facebook_error')
	},
	whatsapp: {
		errorMsg: L('no_whatsapp')
	},
	onSuccess: function(){}
};
$.socialShare.init(socialOptions);
```