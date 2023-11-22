
const express = require('express')
require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const userRouter = require('./User/User.router')
const productRouter = require('./Products/Product.router')
const categoryRouter = require('./Categories/Category.router')
const cartRouter = require('./Cart/Cart.router')
const cloudinary = require('cloudinary').v2

const app = express()

app.use(express.json({limit:'50mb'}))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.get('/health',(req,res)=>{
    res.json({
        success:true,
        message:'health is good'
    })
})
app.use('/user',userRouter)
app.use('/product',productRouter)
app.use('/category',categoryRouter)
app.use('/cart',cartRouter)

//sslcommerze
const SSLCommerzPayment = require('sslcommerz-lts')
const { isAuth } = require('./Auth/Auth.middleware')
const store_id = "zubae64a544031d597"
const store_passwd = "zubae64a544031d597@ssl"
const is_live = false
app.post('/order',isAuth,(req,res)=>{
    const cart= req.body
    const tran_id = new mongoose.Types.ObjectId().toString()
    const data = {
        total_amount: cart.total,
        currency: 'BDT',
        tran_id: tran_id, // use unique tran_id for each api call
        success_url: `http://localhost:5000/payment/success/${tran_id}`,
        fail_url: 'http://localhost:3030/fail',
        cancel_url: 'http://localhost:3030/cancel',
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: req.user.name,
        cus_email: req.user.email,
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
 
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.init(data).then(apiResponse => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL
        res.send({url:GatewayPageURL})
        console.log('Redirecting to: ', GatewayPageURL)
    })

    app.post('/payment/success/:id', async(req,res)=>{
        try {
            res.redirect('http://localhost:3000/success')
        } catch (error) {
            console.log(error.message);
        }
    })
})



cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
  });


const port = process.env.PORT
const uri = process.env.DB_URI

app.listen(port,()=>console.log(`server running ${port}`))
mongoose.connect(uri).then(()=>{
    console.log(`DB connected ${mongoose.connection.host}`);
}).catch((err)=>{
    console.log(err);
})