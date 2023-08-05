const mongoose = require('mongoose')
let userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Name: String,
    EmpTitle: String,
    Department: String,
    Salary: String
})
module.exports = mongoose.model('todies', userSchema);