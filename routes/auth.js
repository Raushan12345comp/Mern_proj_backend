var express = require('express')
var router = express.Router()

const { check, validationResult } = require('express-validator');

const {signout, signup, signin, isSignedIn} = require("../controllers/auth")


router.post("/signup",[
    check("name", "name should be at least 3 char").isLength({ min: 5 }),
    check("email", "email is required").isEmail(),
    check("password", "passsword should  be at least 3 char").isLength({ min: 3 }),
], signup)



router.post("/signin",[
    check("email", "email is required").isEmail(),
    check("password", "passsword field is required").isLength({ min: 1 }),
], signin)


router.get("/signout", signout);
router.get("/signin", signin);



module.exports = router;