const express = require("express")
const router = express.Router()

const { Signup, Login } = require("../controller/userAuthController")
const { Authorization, isSeller, isAdmin, isBuyer } = require("../middleware/userAuthorization")

router.post("/signup", Signup)
router.post("/login", Login)

//Protected Routes

router.get("/test", Authorization)
router.get("/seller", Authorization, isSeller)
router.get("/admin", Authorization, isAdmin)
router.get("/buyer",Authorization, isBuyer)

module.exports = router;