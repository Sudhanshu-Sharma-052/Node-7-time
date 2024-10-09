const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamps');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    mobileNo: { type: String },
    emailId: { type: String },
    password: { type: String },
    usertype:{ type: Number, default:2, enum:[1,2] },
    createdAt:Date,
    updatedAt:Date

})
StudentSchema.plugin(timestamps,{ index: true });
module.exports = mongoose.model('Student', StudentSchema)