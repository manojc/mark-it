var express = require('express'),
    router = express.Router(),
    dbSchema = require('../model/database-schema');

/* GET master user role list*/
router.get('/get-user-roles', function(req, res) {

    dbSchema
        .RoleMaster
        .find({})
        .exec(function(err, response) {
            if (err)
                res.json({
                    status: 'failure',
                    message: 'an error has occured',
                    Data: null
                });
            else
                res.json({
                    status: 'success',
                    message: 'roles fetched successfully',
                    Data: response
                });
        });
});

/* GET user details with id */
router.get('/get-user-details', function(req, res) {

    if (!req.user || !req.user.Id)
        res.json({
            status: 'failure',
            message: 'user id not found',
            Data: null
        });
    else {
        dbSchema
            .User
            .findOne({
                _id: req.user.Id
            })
            .populate('UserRoleId', 'Type Name Parents')
            .exec(function(err, response) {
                if (err)
                    res.json({
                        status: 'failure',
                        message: 'an error has occured',
                        Data: null
                    });
                else {
                    var userName = '';
                    var type = '';
                    if (response.UserRoleId) {
                        if (response.UserRoleId.Name)
                            userName = response.UserRoleId.Name;
                        if (response.UserRoleId.Type)
                            type = response.UserRoleId.Type;
                    }
                    res.json({
                        status: 'success',
                        message: 'user fetched successfully',
                        Data: {
                            DisplayName: response.DisplayName,
                            Email: response.Email,
                            ProfilePicUrl: response.ProfilePicUrl,
                            Id: response._id,
                            UserName: userName,
                            Type: type,
                            IsNew: response.IsNew
                        }
                    });
                }
            });
    }
});

router.post('/update-user-details', function(req, res, next) {
    if (req.body.Type.toLowerCase() !== 'principal') {
        next();
    } else {

        dbSchema
            .User
            .findOne({
                'Roles.Type': 'Admin'
            }, 'Roles')

        .exec(function(err, response) {
            req.body.AdminRole = response.Roles[0];
            req.body.AdminRole.IsMyRole = false;
            next();
        });
    }

}, function(req, res) {
    if (!req.body)
        res.json({
            status: 'failure',
            message: 'user details not found',
            Data: null
        });

    dbSchema
        .User
        .findOne({
            '_id': req.body._id
        })
        .exec(function(err, user) {
            if (err) {
                res.json({
                    status: 'failure',
                    message: 'an error has occured',
                    Data: null
                });
            } else if (!user) {
                res.json({
                    status: 'failure',
                    message: 'user details not found',
                    Data: null
                });
            } else if (!user.IsNew) {
                res.json({
                    status: 'Warning',
                    message: 'user details already updated',
                    Data: user
                });
            } else {
                user.IsNew = false;
                user.Roles.push({
                    Type: req.body.Type,
                    Name: req.body.UserName,
                    IsMyRole: true
                });

                if (req.body.Type.toLowerCase() === 'principal') {
                    user.Roles.push(req.body.AdminRole);
                } else if (req.body.Type.toLowerCase() !== 'admin') {
                    for (var i = 0; i < req.body.parentRoles.length; i++) {
                        req.body.parentRoles[i].IsMyRole = false;
                        user.Roles.push(req.body.parentRoles[i]);
                    };
                }

                user.save(function(err, updatedUser) {
                    if (err) {
                        res.json({
                            status: 'failure',
                            message: 'an error has occured',
                            Data: null
                        });
                    } else if (!updatedUser) {
                        res.json({
                            status: 'failure',
                            message: 'could not update the user',
                            Data: null
                        });

                    } else if (updatedUser) {
                        res.json({
                            status: 'success',
                            message: 'user details updated successfully',
                            Data: updatedUser
                        });

                    }
                })
            }

        });
});

module.exports = router;
