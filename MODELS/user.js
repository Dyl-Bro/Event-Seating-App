const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

userSchema.virtual('id').get(function() {
    return this._id.toHexString();
});
userSchema.set('toJSON', {//enabling the virtuals to this schema for virtual id
    virtuals: true,
});



exports.User = mongoose.model('User', userSchema);