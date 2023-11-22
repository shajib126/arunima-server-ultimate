const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Product name is required']
    },
    price:{
        type:Number,
        required:[true,'Product price is required'],
        
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    inStock:{
        type:Number,
        required:[true,'how much available this product is required']
    },
    imageUrl: [Object]
},{timestamps:true})

const Product = mongoose.model('Product',productSchema)
module.exports = Product