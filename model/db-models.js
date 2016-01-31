var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dbModels = {

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
        if (!this[modelName])
            this[modelName] = mongoose.model(modelName, new mongoose.Schema(model, {
                collection: collectionName
            }));
        return this[modelName];
    }
}

module.exports = dbModels;
