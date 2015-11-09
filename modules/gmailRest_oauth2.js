var api = {};
(function () {
    var process = require('process');
    var httpsPort = process.getProperty('https.port');
    var serverHost = "https://" + process.getProperty('server.host');

    var provider = {
        "oauth_version": "2",
        "authorization_url": "https://accounts.google.com/o/oauth2/auth",
        "access_token_url": "https://accounts.google.com/o/oauth2/token",
        "api_key": "244501108396-k0pan5bk1d3mtsqj3c1o06uentn0knrs.apps.googleusercontent.com",
        "api_secret": "DtyDJj2iMGbJpP3xITpvq9V1",
        "callback_url": "https://localhost:" + httpsPort + "/publisher/assets/connection/oauth2_success?name=googlespreadsheet&type=oauth&version=2",
        "authorize_params": {
            "state": "wso2recipetrial",
            "scope": "https://mail.google.com/ https://www.googleapis.com/auth/userinfo.email",
            "access_type": "offline",
            "approval_prompt": "force"
        }
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

        log.info('Access Token : ' + stringify(result.data));

        if (result.data.error) return;

        // In this case, its needed to take user's email separately to uniquely identify the user
        var getResult = get("https://www.googleapis.com/userinfo/email?alt=json&access_token=" + result.data.access_token,'','json');

        log.info('User Info : ' + stringify(getResult.data));

        var emailAddress = getResult.data.data.email;
        var authInfo = {"id" : emailAddress, "data":{"username" : emailAddress, "oauthConsumerKey" : clientId, "oauthConsumerSecret" : clientSecret , "oauthAccessToken" : result.data.access_token, "oauthRefreshToken" : result.data.refresh_token}};

        return authInfo;
    }
}());
