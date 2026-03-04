
const user = require('../Modal/user')
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
require('dotenv').config()


exports.createDetails = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      

     
  
   
      const existingemail = await user.findOne({email})
      if(existingemail){
        res.status(500).json({message:"email already used"})
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new user({
        name,
        email,
        password: hashedPassword ,
      });
  
      await newUser.save();
  
      res.status(201).json({
        message: "Successfully created",
      });
  
    } catch (err) {
      console.log("FULL ERROR:", err);
      res.status(500).json({
        message: err.message,
      });
    }
  };

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Check if email & password are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // 2️⃣ Find user by email
    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }

    // 3️⃣ Compare password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 4️⃣ Generate JWT
    const token = jwt.sign(
      { id: existingUser._id },
      process.env.Secretkey,
      { expiresIn: "1d" }
    );

   
    res.status(200).json({
      token,
      user: {
        id: existingUser._id,
        email: existingUser.email,
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


  
 