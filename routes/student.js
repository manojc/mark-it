var express = require('express');
var router = express.Router();
var dbModels = require('../model/db-models');

var studentModel = dbModels.getDbSchema(dbModels.Student, 'studentModel', 'students');

//get all students
router.get('/all', function(req, res) {
    studentModel.find({}, function(err, response) {
        if (err)
            res.json({
                status: 'failure',
                message: 'an error has occured',
                data: null
            });
        else
            res.json({
                status: 'success',
                data: response
            });
    });
});

//get student with id
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

//add students 
router.post('/add-student', function(req, res) {

    if (!req.boddy || !req.body.length)
        res.json({
            status: 'failure',
            message: 'student information is not present',
            data: null
        });

    studentModel.collection.insert(req.body, function(err, response) {
        if (!err)
            res.json({
                status: 'failure',
                message: 'an error has occured',
                data: null
            });
        else
            res.json({
                status: 'success',
                data: response
            });
    });
});

module.exports = router;
