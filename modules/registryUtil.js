var api = {};
(function () {
    var log = new Log("registry_util");

    var carbon = require('carbon');
    var server = new carbon.server.Server();
    var options = {system: true,  domain: carbon.server.tenantDomain() , tenantId: carbon.server.tenantId()};
    var dataStore = new carbon.registry.Registry(server, options);

    api.insertNewAccount = function (path, newAcct, newAuthInfo) {

        var reg_path = '/_system/governance/' + path;

        var res = dataStore.get(reg_path);
        var accountContent = res.content;
        var acctContentJSON = JSON.parse(accountContent);

        acctContentJSON[newAcct] = newAuthInfo;

        res.content = JSON.stringify(acctContentJSON);

        dataStore.put(reg_path, res);
    };

    api.deleteAccount = function (path, acct) {

        var reg_path = '/_system/governance/' + path;

        var res = dataStore.get(reg_path);
        var accountContent = res.content;
        var acctContentJSON = JSON.parse(accountContent);

        delete acctContentJSON[acct];

        res.content = JSON.stringify(acctContentJSON);

        dataStore.put(reg_path, res);
    };
}());