var fb = require('facebook');

var _options = {
	text: "",
	title: "",
	url: "",
	picture: "",
	email: {
		subject: "",
		errorMsg: "Mail client not supported"
	},
	twitter: {
		errorMsg: "Twitter was not found in your phone"
	},
	facebook: {
		errorMsg: "Error contacting facebook in your phone"
	},
	whatsapp: {
		errorMsg: "Whatsapp was not found in your phone"
	},
	onSuccess: function(){}
};

/** Opens an email composer window */
function _sendEmail(textForSharing, subject, callback){
	var emailDialog = Titanium.UI.createEmailDialog();
	emailDialog.addEventListener('complete', callback);

	if (!emailDialog.isSupported()) {
		Ti.UI.createAlertDialog({title:"",message:_options.email.errorMsg}).show();
	}else{
		emailDialog.setSubject(subject);

		var body_html = textForSharing;
		emailDialog.setMessageBody(body_html);
		emailDialog.setHtml(true);
		emailDialog.open();
	}
}

/** opens a facebook popup with a predefined stream (fb post) */
function _sendFacebookStream(data)
{
	var shareCompleted = function _shareCompleted(e) {
        if (e.success) {
			if(typeof data.callback === "function")
				data.callback();
        } else {
            alert(_options.facebook.errorMsg);
        }

        fb.removeEventListener('shareCompleted', _shareCompleted);
    };
	
	fb.addEventListener('shareCompleted', shareCompleted);

	var facebookOptions = {
        link: data.link,
        name: data.name,
        description: data.description,
        caption: data.caption,
        picture: data.picture
    };

	if(fb.getCanPresentShareDialog()) {
        fb.presentShareDialog(facebookOptions);
    } else {
        fb.presentWebShareDialog(facebookOptions);
    }
}

/** fasade method to select which service should be contacted and with which data */
function _postTo(service, data) {
	var isOpen;
	switch(service) {
		case 'facebook':
			_sendFacebookStream(data);
			break;
		case 'twitter':
			isOpen = Titanium.Platform.openURL('twitter://post?message=' + encodeURIComponent(data.text + ' ' + data.url));
			if(OS_IOS){
				isOpen = Titanium.Platform.canOpenURL('twitter://post');
			}
			if(isOpen)
				data.callback();
			else
				alert(_options.twitter.errorMsg);
			break;
		case 'whatsapp':
			isOpen = Titanium.Platform.openURL('whatsapp://send?text=' + encodeURIComponent(data.text + ' ' + data.url));
			if(OS_IOS){
				isOpen = Titanium.Platform.canOpenURL('whatsapp://send');
			}
			if(isOpen)
				data.callback();
			else
				alert(_options.whatsapp.errorMsg);
			break;
		case 'mail':
			_sendEmail(data.text + ' ' + data.url, data.subject, data.callback);
			break;
	}
}

function shareOnWhatsapp() {
	_postTo('whatsapp', {
		text: _options.text,
		url: _options.url,
		callback: _options.onSuccess
	});
}

function shareOnTwitter() {
	_postTo('twitter', {
		text: _options.text,
		url: _options.url,
		callback: _options.onSuccess
	});
}

function shareOnMail() {
	_postTo('mail', {
		text: _options.text,
		url: _options.url,
		subject: _options.email.subject,
		callback: _options.onSuccess
	});
}

function shareOnFacebook() {
	//TODO: ANALYTICS
	//TODO: SPECIFIC TEXTS FOR SPECIFIC NETWORKS
	//analytics.trackEvent('eventShared', '{network: "facebook", name: "' + eventName + '", id: "' + eventId + '"}');
	_postTo('facebook', {
		description: _options.text,
		message: _options.email.subject,
		caption: _options.email.subject,
		name: _options.title,
		link: _options.url,
		picture: _options.picture,
		callback: _options.onSuccess
	});
}

function init(options) {
	_options = options;
	if(options.top) $.socialButtons.top = options.top;
	if(options.backgroundColor) $.socialButtons.backgroundColor = options.backgroundColor;
}

exports.init = init;