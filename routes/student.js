var express = require('express');
var router = express.Router();
var dbModels = require('../model/db-models');

var studentModel = dbModels.getDbSchema(dbModels.Student, 'studentModel', 'students');

router.get('/all', function(req, res) {
    studentModel.find({}, function(err, response) {
        if (err) res.json({
            status: 'failure',
            data: null
        });
        else
            res.json({
                status: 'success',
                data: response
            });
    });
});

router.get('/', function(req, res) {
    if (!req.query.id) res.json({
        status: 'id not found',
        data: null
    });
    else {
        studentModel.findOne({
            _id: req.query.id
        }, function(err, response) {
            if (err) res.json({
                status: 'failure',
                data: null
            });
            else
                res.json({
                    status: 'success',
                    data: response
                });
        });
    }
});

router.post('/add-student', function(req, res) {

    var studentList = [{
        FirstName: 'FirstName1',
        LastName: 'LastName1',
        Class: '8',
        Division: 'D'
    }, {
        FirstName: 'FirstName2',
        LastName: 'LastName2',
        Class: '8',
        Division: 'D'
    }, {
        FirstName: 'FirstName3',
        LastName: 'LastName3',
        Class: '8',
        Division: 'D'
    }, {
        FirstName: 'FirstName4',
        LastName: 'LastName4',
        Class: '8',
        Division: 'D'
    }, {
        FirstName: 'FirstName5',
        LastName: 'LastName5',
        Class: '8',
        Division: 'D'
    }, {
        FirstName: 'FirstName6',
        LastName: 'LastName6',
        Class: '8',
        Division: 'D'
    }, {
        FirstName: 'FirstName7',
        LastName: 'LastName7',
        Class: '8',
        Division: 'D'
    }, {
        FirstName: 'FirstName8',
        LastName: 'LastName8',
        Class: '8',
        Division: 'D'
    }, {
        FirstName: 'FirstName9',
        LastName: 'LastName9',
        Class: '8',
        Division: 'D'
    }, {
        FirstName: 'FirstName10',
        LastName: 'LastName10',
        Class: '8',
        Division: 'D'
    }];

    studentModel.collection.insert(studentList, function(err, response) {
        if (!err)
            res.json(response);
        else
            res.json({});
    });
});

module.exports = router;
