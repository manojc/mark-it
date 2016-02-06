var express = require('express'),
    router = express.Router(),
    dbSchema = require('../model/database-schema'),
    studentModel = dbSchema.Student;

//get all students
router.get('/all', function(req, res) {
    studentModel
        .find({})
        .populate('ClassRoomId', 'Name ClassTeacher')
        .exec(function(err, response) {
            if (err)
                res.json({
                    status: 'Failure',
                    message: 'an error has occured',
                    Data: null
                });
            else
                res.json({
                    status: 'success',
                    Message: 'Students are fetched successfully!',
                    Data: response
                });
        });
});

//get student with id
router.get('/', function(req, res) {
    if (!req.query.id)
        res.json({
            status: 'Failure',
            Message: "Id doesn't exist",
            Data: null
        });
    else
        studentModel.findOne({
            _id: req.query.id
        }, function(err, response) {
            if (err) res.json({
                status: 'Failure',
                Message: 'An error has occured',
                Data: null
            });
            else
                res.json({
                    status: 'success',
                    Message: 'Student details are fetched successfully!',
                    Data: response
                });
        });

});

//add students 
router.post('/add-student', function(req, res) {

    if (!req.body || !req.body.length)
        res.json({
            status: 'Failure',
            message: 'student information is not present',
            Data: null
        });

    else
        studentModel.collection.insert(req.body, function(err, response) {
            if (err)
                res.json({
                    status: 'Failure',
                    message: 'An error has occured',
                    Data: null
                });
            else
                res.json({
                    status: 'success',
                    message: 'student information is inserted successfully',
                    Data: response
                });
        });
});

module.exports = router;
