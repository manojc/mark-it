var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StudentSchema = new Schema({
    FirstName: {
        type: String
    },
    LastName: {
        type: String
    },
    Class: {
        type: String
    },
    Division: {
        type: String
    }
});

var Student = mongoose.model('Student', StudentSchema);

var AttendanceSchema = new Schema({
    StudentId: {
        type: Schema.Types.ObjectId,
        ref: 'Student'
    },
    Date: {
        type: Date
    },
    IsPresent: {
        type: Boolean
    },
    Note: {
        type: String
    }
});

var Attendance = mongoose.model('Attendance', AttendanceSchema);

module.exports = {
    Attendance: Attendance,
    Student: Student
};
