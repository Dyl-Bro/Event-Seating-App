const mongoose = require('mongoose');

const tableSchema = mongoose.Schema({
    name: {type: String, required: true},
    guests: [{
        type: String,
        required: true
    }]
})


tableSchema.virtual('id').get(function(){
    return this._id.toHexString();
})
tableSchema.set('toJSON', {
    virtuals: true
})
exports.Table = mongoose.model('Table', tableSchema);