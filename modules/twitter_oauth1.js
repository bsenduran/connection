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
        // When deploying on the cloud we need to use the serverHost variable instead of the localhost because when we use
        // serverHost variable in the local setups with private ips, twitter redirection do not works as expected
        "callback_url" : 'https://localhost:' + httpsPort +'/publisher/assets/connection/oauth1_success'
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
    };

    api.getAccessTokenResults = function () {
        // Get the access token given that verifier.
        var verifier = request.getParameter("oauth_verifier");

        // In OAuth 1.0, previously used OAuth service object can be reused
        var twitter = session.get("oauth_service");

        // Get the Token using OAuth service
        var auth_token = twitter.getAccessToken(verifier);

        // Get user info -- specific to Twitter
        var clientId = provider.api_key;
        var clientSecret = provider.api_secret;

        var screenName = getScreenName(auth_token.rawResponse);
        log.info('User Info : ' + stringify(screenName));
        log.info("************************** " + serverHost + " *********** " + httpsPort);
        var authInfo = {"id" : screenName, "data":{"consumerKey" : clientId, "consumerSecret" : clientSecret, "accessToken" : auth_token.token, "accessTokenSecret" : auth_token.secret}};

        return authInfo;
    };

    var getScreenName = function (rawResponse) {
        var tokens = rawResponse.split('&');
        for (ctr=0; ctr<tokens.length; ctr++) {
            if (tokens[ctr].indexOf("screen_name") > -1) {
                return tokens[ctr].split("=")[1];
            }
        }
        return false;
    }
}());
