const User = require("./User.model");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcryptjs");


const signUp = async (req, res) => {

 
  const { name, email, password,avatar } = req.body;
 console.log(avatar); 
  
  try {
    const result = await cloudinary.uploader.upload(avatar, {
      folder: "arunimaavatar",
    });
  
    const hashedPass = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPass,
      avatar:result.url
    });
    await user.save();
    const token = await jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(201).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const signIn = async (req, res) => {
const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const matchPass = await bcrypt.compare(password, user.password);
      if (!matchPass) {
        return res.status(400).json({
          success: false,
          message: "Creadential error",
        });
      } else {
        const token = await jwt.sign({ user }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });
        res.status(201).json({
          success: true,
          user,
          token,
        });
      }
    }else{
        return res.status(400).json({
            success:false,
            message:'creadential error'
        })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const user = async(req,res)=>{
  try {
    const user = req.user
    if(user){
      res.status(200).json({
        success:true,
        user
      })
    }
  } catch (error) {
    res.status(500).json({
      success:true,
      message:error.message
    })
  }
}

module.exports = {
  signUp,
  signIn,
  user
}