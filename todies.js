const mongoose = require('mongoose')
let userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Title: String,
    description: String,
    UserId: String,
    Status: String
})
module.exports = mongoose.model('todies', userSchema);