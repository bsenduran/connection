var api = {};
(function () {
    var process = require('process');
    var httpsPort = process.getProperty('https.port');
    var provider = {
        "oauth_version": "2",
        "authorization_url": "https://login.salesforce.com/services/oauth2/authorize",
        "access_token_url": "https://login.salesforce.com/services/oauth2/token",
        "api_key": "3MVG9Y6d_Btp4xp5NS5XjHs9kGfHkRbkqHl3FYAvCnc86tjATSdAEFxEeXj_yV4nNuX43VOeFIH9DQjxu2n62",
        "api_secret": "2324074892980891031",
        "callback_url": "https://localhost:" + httpsPort + "/publisher/asts/connection/oauth2_success?name=salesforce&type=oauth&version=2",
        "response_type": "code"
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

        // First get the OAuth Google End point.
//        var googleOAuthEp = session.get("oauth_service");

        // Then get the access token given that verifier.
        var code = request.getParameter("code");
        var url = provider.access_token_url;
        var redirectUrl = provider.callback_url;
        var clientId = provider.api_key;
        var clientSecret = provider.api_secret;


        var dataString = "grant_type=authorization_code" +
                         "&code=" + code +
                         "&redirect_uri=" + encodeURIComponent(redirectUrl) +
                         "&client_id=" + clientId +
                         "&client_secret=" + clientSecret;

        var result = post(url, dataString, {"Data-Type" : "application/x-www-form-urlencoded"}, "json");

        log.info(result);

        var getResult = get(result.data.id, '', {"Authorization" : "Bearer " + result.data.access_token}, "json");

        log.info('User Info : ' + stringify(getResult.data));

        var username = getResult.data.username;

        log.info(username);

        var authInfo = {"id" : username, "data":{"oauthConsumerKey" : clientId, "oauthConsumerSecret" : clientSecret , "oauthAccessToken" : result.data.access_token, "oauthRefreshToken" : result.data.refresh_token, "instanceUrl" : result.data.instance_url}};

        return authInfo;
    }
}());
