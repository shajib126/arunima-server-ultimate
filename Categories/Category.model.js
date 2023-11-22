const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Category name is must or should not be empty']
    }
})

const Category = mongoose.model("Category",categorySchema)
module.exports = Category