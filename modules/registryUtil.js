/**
 * Created by ravindra on 10/1/14.
 * This is used to manipulate carbon registry. All the read, update and delete operation against the registry should use these utility methods defined here.
 */
var api = {};
(function () {
    var process = require('process');
    var httpsPort = process.getProperty('https.port');
    var log = new Log("registry_util");

    // Access registry
    var carbon = require('carbon');

    var url = 'https://localhost:'+httpsPort+'/admin/services/';
    var server = new carbon.server.Server(url);
    var options = {system: true,  domain: carbon.server.tenantDomain() , tenantId: carbon.server.tenantId()};
    var dataStore = new carbon.registry.Registry(server, options);

    var getAccountsContent = function (path) {
        log.info("path is "+ path);
        var res;
        // We assume that at least an empty Account file exists in the registry at this point.
        res = dataStore.get('/_system/governance/' + path);

        log.info("res "+ res);
        return res.content;
    };

    api.insertNewAccount = function (path, newAcct, newAuthInfo) {
        var log = new Log();
        var accountContent = getAccountsContent(path);

        var acctContentJSON = parse(stringify(accountContent));

        // If there's no any user account with the given name then create one.
        if (!acctContentJSON.hasOwnProperty(newAcct)) {
            // Setting the JSON contents here.
            acctContentJSON[newAcct] = parse(newAuthInfo);

            var res = dataStore.get('/_system/governance/' + path);
            // Setting the registry resource here.
            res.content = stringify(acctContentJSON);

            // updating the registry with the new resource here.
            dataStore.put('/_system/governance/' + path, res);
        }
    };

    api.deleteAccount = function (path, acct) {
        var accountContent = parse(stringify(getAccountsContent(path)));

        // delete the relevant entry from the JSON object.
        delete accountContent[acct];

        // Get the registry and update the content.
        var res = dataStore.get('/_system/governance/' + path);

        // setting the registry resource content here.
        res.content = stringify(accountContent);

        // updating the registry with the new resource here.
        dataStore.put('/_system/governance/' + path, res);
    };
}());