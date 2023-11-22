const Product =require('./Product.model')

const cloudinary = require('cloudinary').v2


const createProduct = async(req,res)=>{
    console.log(req.body);
    try {
        const {name,price,description,category,inStock} = req.body
        const url = []
        for(let file of req.body.images){
            const result = await cloudinary.uploader.upload(file,{
                folder:'arunimaproduct'
               })
              url.push(result.url);
        }
      
      const product = new Product({
        name,price,description,category,inStock,imageUrl:url
      })
      await product.save()
      res.status(201).json({
        success:true,
        product
      })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }

}

const allProduct = async(req,res)=>{
    try {
        const products = await Product.find().populate('category')
        res.status(200).json({
            success:true,
            products
        })
    } catch (error) {
        res.status({
            success:false,
            message:error.message
        })
    }
}

const productById = async(req,res)=>{
    try {
        const productId = req.params.id
        console.log(productId);
        const product = await Product.findById(productId).populate('category')
        console.log(product);
        if(!product){
            res.status(404).json({
                success:false,
                message:`product not found by this ${productId}`
            })
        }else{
            res.status(200).json({
                success:true,
                product
            })
        }
    } catch (error) {
        
    }
}
module.exports = {
    createProduct,
    allProduct,
    productById
}