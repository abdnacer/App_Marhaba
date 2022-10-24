var storage = require('local-storage')
const User = require('../models/userModel')
const Role = require('../models/roleModel')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const { json } = require('express')

const verifyRoleClient = (req, res) => {
  const token = storage('token')
  if (token) {
    const tokenUser = jwt.verify(token, process.env.JWT_SECRET)
    User.findById({ _id: tokenUser.id })
      .then(user => {
        Role.findOne({ _id: user.role })
          .then(role => {
            if (role.name == 'client') {
              res.send(`Bonjour ${user.first_name} ${user.last_name}, your role is: ${role.name}`)
            }
            else {
              res.send('is not User')
            }
          })
          .catch(() => { res.json({ message: 'error' }) })
      })
      .catch(() => { res.json({ message: 'error' }) })
  }
  else {
    res.send('no token')
  }
}

const verifyRoleLivreur = (req, res) => {
  const token = storage('token')
  if (token) {
    const tokenUser = jwt.verify(token , process.env.JWT_SECRET)
    User.findById({ _id: tokenUser.id })
    .then(user => {
      Role.findOne({_id: user.role})
      .then(role => {
        if(role.name == "livreur"){
          res.send(`Bonjour ${user.first_name} ${user.last_name}, your role is: ${role.name}`)
        }
        else{
          res.send('is not user')
        }
      }).catch(() => {
        res.json({ message: 'Error of role'})
      })
    })
    .catch(() => {
      res.json({message: "error of user"})
    })
  }
  else {
    res.send(token)
  }
}

const verifyRoleManager = (req, res) => {
  const token = storage('token')
  if(token){
    const tokenUser = jwt.verify(token, process.env.JWT_SECRET)
    User.findById({_id: tokenUser.id})
    .then(user => {
      Role.findOne({_id: user.role})
      .then(role => {
        if(role.name == "manager"){
          res.send(`Bonjour ${user.first_name} ${user.last_name}, your role is: ${role.name}`)
        }
        else{
          res.send("is not user")
        }
      })
      .catch(() => {
        res.send("error for role")
      })
    })
    .catch(() => {
      res.send('error for user')
    })
  }else{
    res.send('no token')
  }
}

module.exports = {
  verifyRoleClient,
  verifyRoleLivreur,
  verifyRoleManager
}