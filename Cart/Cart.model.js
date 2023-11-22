const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    productCount:{
        type:Number,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

const Cart = mongoose.model("Cart",cartSchema)
module.exports = Cart