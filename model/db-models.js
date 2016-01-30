var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dbModels = {

    login: {
        FirstName: 'String',
        LastName: 'String'
    },

    User: {
        UserName: 'String',
        Strategy: {}
    },

    Strategy: {
        Name: 'String',
        Info: {
            Id: 'String',
            DisplayName: 'String',
            Email: 'String',
            ProfilePicUrl: 'String'
        }
    },

    Student: {
        FirstName: 'String',
        LastName: 'String',
        Class: 'String',
        Division: 'String'
    },

    Attendance: {
        StudentId: Schema.ObjectId,
        Date: 'Date',
        IsPresent: 'Boolean',
        Note: 'String'
    },

    getDbSchema: function(model, modelName, collectionName) {

        //singleton pattern
        if (!this[modelName])
            this[modelName] = mongoose.model(modelName, new mongoose.Schema(model, {
                collection: collectionName
            }));
        return this[modelName];
    }
}

module.exports = dbModels;
