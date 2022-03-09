const mongoose = require('mongoose');
const {Table} = require('../MODELS/tables');

const seatArrangementSchema = mongoose.Schema({
    eventName: {
        type: String,
        required: true,
        default: 'New Event'
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tables: [{
        type: mongoose.Types.ObjectId,
        ref: 'Table',
        required: true
    }]
})

seatArrangementSchema.virtual('id').get(function () {
    return this._id.toHexString();
})
seatArrangementSchema.set('toJSON', {//enabling the virtuals to this schema for virtual id
    virtuals: true,
});

exports.seatArrangement = mongoose.model('seatArrangement', seatArrangementSchema);
