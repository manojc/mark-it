var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RoleMasterSchema = new Schema({
    Type: 'String'
});
var RoleMaster = mongoose.model('RoleMaster', RoleMasterSchema);

var RoleSchema = new Schema({
    Type: 'String',
    Name: 'String',
    ParentId: {
        type: Schema.Types.ObjectId,
        ref: 'Role'
    },
    Parents: []
});
var Role = mongoose.model('Role', RoleSchema);

var UserSchema = new Schema({
    Provider: 'String',
    PassportId: 'String',
    DisplayName: 'String',
    Email: 'String',
    ProfilePicUrl: 'String',
    IsNew: 'Boolean',
    Roles: []
});
var User = mongoose.model('User', UserSchema);


//class room model
var ClassRoomSchema = new Schema({
    Name: String,
    ClassTeacher: String,
    Details: String
});
var ClassRoom = mongoose.model('ClassRoom', ClassRoomSchema);
//class room model ends


//student model
var StudentSchema = new Schema({
    FirstName: String,
    LastName: String,
    Class: String,
    RollNumber: Number,
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
    Date: Date,
    IsPresent: Boolean,
    Note: String,
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
    User: User,
    Role: Role,
    RoleMaster: RoleMaster,
    Attendance: Attendance,
    Student: Student,
    ClassRoom: ClassRoom
};
