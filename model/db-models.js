var mongoose = require('mongoose');

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

    getDbSchema: function(model, modelName, collectionName) {

        //singleton pattern
        if (!this[model])
            this[model] = mongoose.model(modelName, new mongoose.Schema(model, {
                collection: collectionName
            }));
        return this[model];
    }
}

module.exports = dbModels;
