const jwt = require('jsonwebtoken')
const User = require('../User/User.model')

 const isAuth = async(req,res,next)=>{
    try {
        const {token} = req.headers
        
        if(token){
            const decode = jwt.verify(token,process.env.JWT_SECRET)
            
            const user = await User.findById(decode.user._id)
            console.log(user);
            req.user = user
            next()
        }else{
            res.status(403).json({
                success:false,
                message:'you are not authorized user'
            })
        }
       
    } catch (error) {
        res.status(403).json({
            success:false,
            message:'you are not authorized user',
            error
        })
    }
}

module.exports = {
    isAuth
}