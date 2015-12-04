var dbModels = require('../model/db-models');
var userModel = dbModels.getDbSchema(dbModels.User, 'userModel', 'user.account');
var session = require('express-session');


exports.saveUser = function(user, callback) {

    if (!user) callback(null, user);

    userModel.findOne({
        'Strategies.Info.Id': user.id
    }, function(err, response) {
        if (err) callback(err, null);
        if (!response) {
            var dbUser = new userModel();
            dbUser.Strategies.push({
                Name: user.provider,
                Info: {
                    Id: user.id,
                    DisplayName: user.displayName,
                    Email: user.email,
                    ProfilePicUrl: user.profilePicUrl
                }
            });
            dbUser.save(function(err, dbResponse) {
                if (err)
                    callback(err, dbResponse);
                callback(null, dbResponse);
            });
        } else {
            callback(err, response);
        }
    });
}
