var api = {};
(function () {
    var process = require('process');
    var httpsPort = process.getProperty('https.port');
    var serverHost = "https://" + process.getProperty('server.host');

    var provider = {
        "oauth_version": "1",
        "authorization_url": "https://sandbox.evernote.com/OAuth.action",
        "access_token_url": "https://sandbox.evernote.com/oauth",
        "request_token_url": "https://sandbox.evernote.com/oauth",
        "api_key": "wso2recipe-0482",
        "api_secret": "d29cfacc5c91676f",
        "token_type": "SANDBOX",
        "callback_url" : serverHost  + ':' + httpsPort + '/publisher/asts/connection/oauth1_success'
    };

    api.getProviderConfig = function () {
        return provider;
    };

    api.getRedirectUrl = function(){
        return provider.callback_url;
    };

    api.getClientId = function(){
        return provider.api_key;
    };

    api.getClientSecret = function(){
        return provider.api_secret;
    };

    api.getAccessTokenUrl = function () {
        return provider.access_token_url;
    }

    api.getAccessTokenResults = function () {
        // Get the access token given that verifier.
        var verifier = request.getParameter("oauth_verifier");

        // In OAuth 1.0, previously used OAuth service object can be reused
        var evernote = session.get("oauth_service");

        // Get the Token using OAuth service
        var auth_token = evernote.getAccessToken(verifier);

        log.info('User Info : ' + stringify(user));

        // Get noteStoreUrl from response
        var noteStoreUrl = auth_token.rawResponse.match("edam_noteStoreUrl=([^&]+)").toString().slice(17);
        noteStoreUrl = decodeURIComponent(noteStoreUrl).split(',').pop();

        var clientId = provider.api_key;
        var clientSecret = provider.api_secret;
        var tokenType = provider.token_type;

        var screenName = noteStoreUrl + "@" + tokenType;// TODO : Temp. Fix for testing
        var authInfo = {"id" : screenName, "data":{"consumerKey" : clientId, "consumerSecret" : clientSecret, "devToken" : auth_token.token, "noteStoreUrl" : noteStoreUrl, "devTokenType" : tokenType}};

        return authInfo;
    }
}());
