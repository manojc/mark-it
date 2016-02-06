var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//class room model
var ClassRoomSchema = new Schema({
    Name: {
        type: String
    },
    ClassTeacher: {
        type: String
    },
    Details: {
        type: String
    }
});
var ClassRoom = mongoose.model('ClassRoom', ClassRoomSchema);
//class room model ends


//student model
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
    RollNumber: {
        type: Number
    },
    ClassRoomId: {
        type: Schema.Types.ObjectId,
        ref: 'ClassRoom',
        required: true
    }

});
var Student = mongoose.model('Student', StudentSchema);
//student model ends


//attendance model
var AttendanceSchema = new Schema({
    Date: {
        type: Date
    },
    IsPresent: {
        type: Boolean
    },
    Note: {
        type: String
    },
    StudentId: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    ClassRoomId: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'ClassRoom',
        required: true
    }
});
var Attendance = mongoose.model('Attendance', AttendanceSchema);
//attendance model ends


module.exports = {
    Attendance: Attendance,
    Student: Student,
    ClassRoom: ClassRoom
};
