const router = require('express').Router()

const { 
  registerUser,
  loginUser,
  // forgotPassword,
  // repeatPassword
} = require('../controllers/userController')

router.post('/register', registerUser)
router.post('/login', loginUser)


// router.get('/forgotPassword', forgotPassword)
// router.post('/forgotPassword', repeatPassword)

// const verifyrole = require('../controllers/userController')
// app.post('/register', verifyrole.verifyRole)
// app.post('/login', verifyrole.verifyRole)

module.exports = router