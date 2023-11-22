const Cart = require("./Cart.model");

const addToCart = async(req,res)=>{
    try {
        console.log(req.body);
        const {product,productCount} = req.body
        const userId = req.user._id
        
        const cart = new Cart({product,productCount,user:userId})
        await cart.save()
        res.status(201).json({
            success:true,
            message:'product added to the cart',
            cart
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const getAllCart = async(req,res)=>{
    
    try {
        const carts = await Cart.find({user:req.user._id}).populate('product')
        console.log(carts);    
        res.status(200).json({
            success:true,
            carts
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const getCartById = async(req,res)=>{
    try {
        const carts = await Cart.find({userId:req.user._id})
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
const removeCart = async(req,res)=>{
    const {cartId} = req.params
 
    try {
        const cart = await Cart.findOneAndRemove({_id:cartId,user:req.user._id})
        if (!cart) {
            res.status(404).json({
                success:false,
                message:"cart not found"
            });
            
          }
      res.status(200).json({
        success:true,
        message:"Removed"
      })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

module.exports = {
    addToCart,
    getAllCart,
    getCartById,
    removeCart
}