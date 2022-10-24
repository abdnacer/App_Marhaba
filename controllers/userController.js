const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
var storage = require('local-storage')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Role = require('../models/roleModel')
const { exists } = require('../models/userModel')

const registerUser = asyncHandler(async (req, res) => {
  const { first_name, last_name, email, password } = req.body

  if (first_name == "" || last_name == "" || email == "" || password == "") {
    res.status(400)
    throw new Error('Please fill the all Field')
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Eror('User already Exists')
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password, salt)
  const role = "635138c845b4621feaff0f66"

  // Create User
  const user = await User.create({
    first_name,
    last_name,
    email,
    password: hashPassword,
    role,
  })


  if (user) {
    res.status(200).json({
      _id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id)
    })
  }
  else {
    res.status(400)
    throw new Error('Invalid User Data')
  }
})



const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user && bcrypt.compare(password, user.password)) {
    generateToken(user.id)
    const role = await Role.findOne({_id: user.role})
      .then((role) => {
        res.send(`/api/user/${role.name}/me`)
      })
      .catch(() => {
        res.send(error)
      })
  }
  else {
    res.status(400)
    throw new Error('Invalid Credialts')
  }
})



const generateToken = (id) => {

  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
  storage('token', token)
  return token
}

// const forgotPassword = asyncHandler( async(req, res) => {
//   const { email } = req.body
//   if(!email && email == ""){
//     res.send("Please fill all the fields")
//   }

//   const userExists = await User.findOne({ email })

//   // storage('emailUser', userExists.email)
//   if(userExists){
//     res.json({ Email: userExists.email})
//   }else{
//     res.send('this email not exists')
//   }
// })

// const repeatPassword = asyncHandler( async(req, res) => {
//   const { email, password } = req.body
//   if(!password && !email){
//     res.send('Please fill all the field')
//   }

//   // const userEmail = storage('emailUser')
//   const userEmail = await User.findOne({email})

//   if(userEmail){
//     const passHashed = await bcrypt.hash(password, 10)

//     const user = await User.updateOne({
//       password: passHashed
//     })
//     if(user){
//       res.send({message: "User Update password"})
//     }
//     else{
//       res.send({message: "User Not Update password"})
//     }
//   }
//   else{
//     res.send('repeat to add email')
//   }

// })



module.exports = {
  registerUser,
  loginUser,
  // forgotPassword,
  // repeatPassword
}