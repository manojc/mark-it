var mongoose = require('mongoose');

exports.connect = function(callback) {
    mongoose.connect('mongodb://localhost/manoj');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        callback();
    });
}
