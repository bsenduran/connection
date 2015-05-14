var api = {};
(function () {


    api.getClientId = function(){
        return '';
    };

    api.getFrameworkData = function(){
        return '<link rel="stylesheet" href="/publisher/themes/default/css/bootstrap.min.css">' +
               '<script src="/publisher/themes/default/js/jquery-1.10.2.min.js"></script>';
    };

    api.getForm = function(){
        var htmlStr = '<br/><br/><div class="center-block col-md-4"></div>' +
                      '<div class="center-block col-md-4">' +
                      '<div class="panel panel-primary">' +
                      '                           <form method="post" action="/publisher/asts/connection/basic_success">' +
                      '                               <div class="panel-footer">' +
                      '                                   <h3 class="panel-title">Enter JIRA Credentials</h3>' +
                      '                               </div>' +
                      '                               <div class="panel-body">' +
                      '                                   <div class="form-group">' +
                      '                                       <label for="url">JIRA URL</label>' +
                      '                                       <input type="text" name="url" class="form-control" id="url" placeholder="Enter JIRA URL" required>' +
                      '                                       </div>' +
                      '                                       <hr/>' +
                      '                                       <div class="form-group">' +
                      '                                           <label for="Username">Username</label>' +
                      '                                           <input type="text" name="username" class="form-control" id="Username" placeholder="Enter username" required>' +
                      '                                           </div>' +
                      '                                           <div class="form-group">' +
                      '                                               <label for="Password">Password</label>' +
                      '                                               <input type="password" name="password" class="form-control" id="Password" placeholder="Enter password"required>' +
                      '                                               </div>' +
                      '                                           </div>' +
                      '                                           <div class="panel-footer">' +
                      '                                               <div class="center-block col-md-10"></div>' +
                      '                                                 <input type="Submit" value="Connect" class="btn btn-primary " />' +
                      '                                           </div>' +
                      '                                               <input type="hidden" name="identifier" value="url">' +
                      '                                       </form>' +
                      '                                   </div>' +
                      '                               </div>';
        return api.getFrameworkData() + htmlStr;
    };

}());