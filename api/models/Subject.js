const mongoose = require('mongoose');

const {Schema} = mongoose;
const subjectSchema = new Schema({
    subjectName: String,
});

const subjectModel = mongoose.model('Subject', subjectSchema);
module.exports = subjectModel;