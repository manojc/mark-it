var UserModel = require('../model/database-schema').User;


exports.saveUser = function(user, callback) {

    if (!user) callback(null, user);

    UserModel
        .findOne({
            'PassportId': user.Id
        })
        .exec(function(err, response) {
            if (err)
                callback(err, null);
            if (!response) {
                new UserModel({
                    Provider: user.Provider,
                    PassportId: user.Id,
                    DisplayName: user.DisplayName,
                    Email: user.Email,
                    ProfilePicUrl: user.ProfilePicUrl,
                    IsNew: true
                }).save(function(err, dbResponse) {
                    if (err)
                        callback(err, dbResponse);
                    callback(null, dbResponse);
                });
            } else {
                callback(err, response);
            }
        });
}

exports.getUser = function(id, callback) {

    if (!id) callback(err, null);

    UserModel.findOne({
        '_id': id
    }, function(err, response) {
        if (err) callback(err, null);
        callback(null, response);
    });
}
