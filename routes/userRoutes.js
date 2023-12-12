const express = require('express')
const router = express.Router()
const {registerUser, authUser, allUsers,} = require('../controller/userControllers')
const {protect} = require('../middleware/authMiddleware')
const { userOtp, verifyOtp } = require('../controller/emailOtp')

router.route('/').post(registerUser).get(protect,allUsers)
router.post('/login',authUser)
router.post('/otp',userOtp)
router.post('/otp-verify',verifyOtp)




module.exports = router;