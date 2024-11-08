const mongoose = require('mongoose');

const {Schema} = mongoose;

const classSchema = new Schema({
    className: String,
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },

    students: [{
        type: Schema.Types.ObjectId,
        ref: 'Student',
    }]
});

const classModel = mongoose.model('Class', classSchema);
module.exports = classModel;