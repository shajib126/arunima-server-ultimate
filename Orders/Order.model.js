const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    shippingInfo:{
        address:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        phone:{
            type:Number,
            required:true
        },
    },
    
    orderItems:[
        {
            name:{
                type:String,
                required:true
            },
            price:{
                type:Number,
                required:true
            },
            quantity:{
                type:Number,
                required:true
            },
            image:{
                type:String
            }
        }
    ],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

})

const Order = mongoose.model('Order',orderSchema)
module.exports = Order