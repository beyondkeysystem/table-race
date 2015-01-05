var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    UserSchema,
    User;

UserSchema = new Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        lowercase: true,
        require: false,
        trim: true
    },
    oauth: {
        type: Number,
        require: true,
        min: 0
    },
    photo: {
        type: String,
        require: false,
        trim: true
    },
    network: {
        type: String,
        lowercase: true,
        require: true,
        trim: true
    },
    token: {
        type: String,
        trim: true
    },
    created: {
        type: Date,
        'default': function() {
            return new Date()
        }
    }
}, {
    collection: 'users'
});

User = mongoose.model('User', UserSchema);

module.exports = User;