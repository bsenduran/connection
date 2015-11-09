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
        // We have to change the callback_url host name depending on whether the cloud or local deployment. This value should be
        // same as the google developer credentials
        "callback_url": "https://localhost:9443/publisher/assets/connection/oauth2_success?name=googlespreadsheet&type=oauth&version=2",
        "authorize_params": {
            "state": "wso2recipetrial",
            "scope": "https://www.googleapis.com/auth/drive.readonly https://spreadsheets.google.com/feeds/",
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


        var dataString = "grant_type=authorization_code"
                                 +"&code=" + code
                                 +"&redirect_uri=" + encodeURIComponent(redirectUrl)
                                 +"&client_id=" + clientId
                                 +"&client_secret=" + clientSecret;

        var result = post(url, dataString, {"Data-Type" : "application/x-www-form-urlencoded"}, "json");

        log.info(result);

        if (result.data.error) return;

        var getResult = get("https://www.googleapis.com/drive/v2/about", '', {"Authorization" : "Bearer " + result.data.access_token}, "json");

        log.info('User Info : ' + stringify(getResult.data));

        var emailAddress = getResult.data.user.emailAddress;

        log.info(emailAddress);

        var authInfo = {"id" : emailAddress, "data":{"oauthConsumerKey" : clientId, "oauthConsumerSecret" : clientSecret , "oauthAccessToken" : result.data.access_token, "oauthRefreshToken" : result.data.refresh_token}};


        return authInfo;
    }
}());
