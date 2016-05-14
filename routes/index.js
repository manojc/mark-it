var express = require('express');
var router = express.Router();
var appConfig = require('dotenv').config();
var swig = require('swig');

/* GET home page. */
router.get('/', function(req, res) {

    var role = getUserRole(req.user);
    var homePagePath = getRoleBasedHomePage(role);
    var swigModel = getSwigModel(req.user);

    res.send(swig.renderFile(homePagePath, swigModel));
});

/* GET home page. */
router.get('/success', function(req, res) {
    res.json({
        response: 'success!!'
    });
});

/* GET home page. */
router.get('/error', function(req, res) {
    res.json('<h1>user session expired!!</h1>');
});

/* GET home page. */
router.get('*', function(req, res) {
    res.sendFile('page-not-found.html', {
        root: './public/pages'
    });
});


function getRoleBasedHomePage(role) {

    if (!role) role = '';

    var homePagePath = './public/pages/';

    switch (role.toLowerCase()) {

        case 'admin':
            return homePagePath + 'admin-home.html';
            break;

        case 'student':
            return homePagePath + 'student-home.html';
            break;

        case 'teacher':
            return homePagePath + 'teacher-home.html';
            break;

        case 'principal':
            return homePagePath + 'principal-home.html';
            break;

        case 'parent':
            return homePagePath + 'parent-home.html';
            break;

        default:
            return homePagePath + 'home.html';
    }
}

function getUserRole(user) {
    if (!user || !user.role)
        return '';
    return user.role;
}

function getSwigModel(user) {
    var swigModel = {
        isDevEnvironment: process.env.ENV === 'DEV',
        isAuthenticated: false
    };

    if (user)
        swigModel.isAuthenticated = true;

    return swigModel;
}


module.exports = router;
