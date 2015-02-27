var api = {};
(function () {
    var process = require('process');
    var httpsPort = process.getProperty('https.port');
    var serverHost = "https://" + process.getProperty('server.host');

    var provider = {
        "oauth_version": "1",
        "authorization_url": "https://twitter.com/oauth/authorize",
        "access_token_url": "https://twitter.com/oauth/access_token",
        "request_token_url": "https://twitter.com/oauth/request_token",
        "api_key": "V7gCu0rSpzUOlZXNrsaPki4cp",
        "api_secret": "dM2Rzr2LaFzfV4bdW6dQJ2WQernT9E7xHf8hwJ7BUwwRV4NgBV",
        "callback_url" : serverHost + '/publisher/asts/connection/oauth1_success'
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
        var twitter = session.get("oauth_service");

        // Get the Token using OAuth service
        var auth_token = twitter.getAccessToken(verifier);

        // Get user info -- specific to Twitter
        var user = auth_token.rawResponse.split("=").pop();
        log.info('User Info : ' + stringify(user));

        var clientId = provider.api_key;
        var clientSecret = provider.api_secret;

        var screenName = user;
        var authInfo = {"id" : screenName, "data":{"consumerKey" : clientId, "consumerSecret" : clientSecret, "accessToken" : auth_token.token, "accessTokenSecret" : auth_token.secret}};

        return authInfo;
    }
}());
