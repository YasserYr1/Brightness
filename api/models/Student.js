const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({
  studentName: String,
  scoress: [{
    subject: {
      type: Schema.Types.ObjectId,
      ref: 'Subject',
    },
    values: {
      type: [Number],
      default: [0, 0, 0],
    },
  }],
  totalScoress: [{
    subject: {
      type: Schema.Types.ObjectId,
      ref: 'Subject',
    },
    value: {
      type: Number,
      default: 0,
    },
  }],
  classes: [{
    type: Schema.Types.ObjectId,
    ref: 'Class',
  }],
});

const studentModel = mongoose.model('Student', studentSchema);
module.exports = studentModel;
