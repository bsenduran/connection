asset.server = function (ctx) {
    var type = ctx.type;
    return {
        onUserLoggedIn: function () {
        },
        endpoints: {
            apis: [
                {
                    url: 'deleteAccount',
                    path: 'deleteAccount.jag'
                },
                {
                    url: 'oauth1',
                    path: 'oauth1.jag'
                },
                {
                    url: 'oauth2',
                    path: 'oauth2.jag'
                },
                {
                    url: 'basic',
                    path: 'basic.jag'
                }
            ],
            pages: [
                {
                    title: 'oauth1_success',
                    url: 'oauth1_success',
                    path: 'oauth1_success.jag'
                },
                {
                    title: 'oauth2_success',
                    url: 'oauth2_success',
                    path: 'oauth2_success.jag'
                },
                {
                    title: 'basic_success',
                    url: 'basic_success',
                    path: 'basic_success.jag'
                }
            ]
        }
    };
};
