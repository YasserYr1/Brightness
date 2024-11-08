const mongoose = require('mongoose');

const {Schema} = mongoose;

const userSchema = new Schema({
    num: Number,
    name: String,
    email: String,
    password: String,
    classes: [{
        type: Schema.Types.ObjectId,
        ref: 'Class'
    }],
    subject: {
        type: Schema.Types.ObjectId,
        ref: 'Subject'
    }
    
})

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;