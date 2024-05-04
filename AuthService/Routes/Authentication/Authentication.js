// ====================== Initialization ======================
const express = require('express');
const router = express.Router();
const conn = require('../../DB/Connection')
const { body, validationResult, } = require('express-validator');
const util = require("util");
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { decryptData, encryptData, handleData } = require('./BackendEncryption');

const key = 'Network-Security-Project-Senior';




router.use(cookieParser());

// ====================== Requests ======================
router.post("/",handleData,
    body("Email").isEmail().withMessage("Please Enter Valid Email"),
    body("Password").isLength({ min: 8, max: 50 }).withMessage("Password sholud be bewteen 8 to 18 charcters"),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors);
                return res.status(400).json({ errors: errors.array() });
            }
            // let password = decryptData(req.body.Password).replace('"', '').replace('"', '');
            console.log(req.body.Email);
            // let email = decryptData(req.body.Email);
            const query = util.promisify(conn.query).bind(conn);

            // the following query returns array of objects
            const user = await query("select * from user where Email ='" + req.body.Email + "'");
            
            if (user.length == 0) {
                res.status(404).json("Email or Passowrd Not Found");
            }
            const checkPassword= await bcrypt.compare(req.body.Password,user[0].Password);
            if(checkPassword){
                delete user[0].Password;

                // Generate a JWT(JSON WEB TOKEN)
                // secretkey = 'Network Security'
                //initializing jwt
                const token = jwt.sign({ token: user[0].Token, username: user[0].Name }, key, { expiresIn: '1h' });
                await query("UPDATE `user` SET `Status` = '1' WHERE Token = '" + user[0].Token + "';");
                //session
                req.session.visited = true;
                req.session.user = { token: user[0].Token, username: user[0].Name };
                console.log(req.session.id);
                //encryption
                console.log(encryptData({token:token , type:user[0].Type , name: user[0].Name}).length);
                res.status(200).json(encryptData({token:token , type:user[0].Type , name: user[0].Name}));
            }
            else {
                res.status(404).json("Email or Password is Inccorect");
            }
        }
        catch (err) {
            // res.status(500).json("Error");
        }
})


router.put("/", (req, res) => {
    // console.log(req.body);
    const query = "UPDATE `user` SET `Status`='0' WHERE Token = '"+ req.body.Token +"';";
    conn.query(query, (error, data) => {
        if (error) {
            res.statusCode = 500;
            return (res.json(error));
        }
        else {
            req.session.destroy();
            res.statusCode = 200;
            return (res.json("Logout"));

        }
    });
})

// ====================== Export ======================
module.exports = router;