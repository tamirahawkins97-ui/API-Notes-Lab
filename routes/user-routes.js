//DEPENDANCIES 
const express = require("express");
const router = express.Router();
const authController = require("../controllers/user-controllers");
const verifyAuthentication = require("../middleware/verifyAuthentication");
const adminOnly = require("../middleware/adminOnly");

// You could use this line to apply a middleware to every defined route in your router if you wanted
// router.use(verifyAuthentication);

module.exports = router;
//I.N.D.U.C.E.S

//INDEX - 
// You could use this line to apply a middleware to every defined route in your router.
// router.use(verifyAuthentication);

router.get("/", verifyAuthentication, authController.getUser);
router.get("/admin", verifyAuthentication, adminOnly, authController.getUser);
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
//NEW - 

//DELETE -

//UPDATE -

//CREATE - 

//EDIT - 

module.exports = router;