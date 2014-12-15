asset.server = function (ctx) {
    var type = ctx.type;
    return {
        onUserLoggedIn: function () {
        },
        endpoints: {
            apis: [
                {
                    url: 'twitterOAuth',
                    path: 'twitterOAuth.jag'
                },
                {
                    url: 'googlespreadsheetOAuth',
                    path: 'googlespreadsheetOAuth.jag'
                },
                {
                    url: 'gmailOAuth',
                    path: 'gmailOAuth.jag'
                },
                {
                    url: 'salesforceOAuth',
                    path: 'salesforceOAuth.jag'
                },
                {
                    url: 'jiraOAuth',
                    path: 'jiraOAuth.jag'
                },
                {
                    url: 'deleteAccount',
                    path: 'deleteAccount.jag'
                },
                {
                    url: 'updater',
                    path: 'updater.jag'
                }
            ],
            pages: [
                {
                    title: 'Success ' + type,
                    url: 'success',
                    path: 'success.jag'
                },
                {
                    title: 'Google Success' + type,
                    url: 'googleSuccess',
                    path: 'googleSuccess.jag'
                },
                {
                    title: 'gMail Success' + type,
                    url: 'googleMailSuccess',
                    path: 'googleMailSuccess.jag'
                },
                {
                    title: 'salesforce Success' + type,
                    url: 'salesforceSuccess',
                    path: 'salesforceSuccess.jag'
                },
                {
                    title: 'jira Success' + type,
                    url: 'jiraSuccess',
                    path: 'jiraSuccess.jag'
                },
                {
                    title: 'jiraLoginSuccess',
                    url: 'jiraLoginSuccess',
                    path: 'jiraLoginSuccess.jag'
                }
            ]
        }
    };
};