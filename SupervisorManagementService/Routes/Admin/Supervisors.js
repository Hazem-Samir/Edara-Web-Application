// ====================== Initialization ======================
const express = require('express');
const router = express.Router();

const { body, validationResult, param } = require('express-validator');
const util = require("util");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { adminAuthorize } = require('../Middleware/authorize');
const { decryptData, handleData } = require('../Authentication/BackendEncryption');
const { SuperVisorConnection } = require('../../DB/Connection');

// ====================== Requests ======================
router.get("/", adminAuthorize, (req, res) => {
    const query = "SELECT * FROM `user` WHERE `Type` = 'Supervisor';";
    SuperVisorConnection.query(query, (err, data) => {
        if (err) return (res.json("Erorr"));
        return res.json(data);
    });
})

router.post("/", adminAuthorize,handleData,
    body("Email").isEmail().withMessage("Please Enter Valid Email"),
    body("Name").isString().withMessage("Please Enter Valid Name").isLength({ min: 4, max: 25 }).withMessage("Name sholud be bewteen 4 to 25 charcters"),
    body("Password").isLength({ min: 8, max: 18 }).withMessage("Password sholud be bewteen 8 to 18 charcters"),
    body("Phone").isLength({ min: 11, max: 12 }).withMessage("Enter Phone Correctly"),

    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors);
                return res.status(400).json({ errors: errors.array() });
            }
             
            const query = util.promisify(SuperVisorConnection.query).bind(SuperVisorConnection);
            const checkEmailExists = await query("select * from user where Email ='" + req.body.Email + "'");
            if (checkEmailExists.length > 0) {
                res.status(400).json({data:"Email Already Exists"});
            }

            else {

                const user = {
                    Name: req.body.Name,
                    Email: req.body.Email,

                    //10 -> number of rounds to encrypt the password
                    Password: await bcrypt.hash(req.body.Password, 10),
                    Token: crypto.randomBytes(16).toString("hex"),
                    Phone: req.body.Phone
                }
                const insert = "INSERT INTO user VALUES (NULL,'" + user.Name + "','" + user.Email + "','" + user.Password + "','" + user.Token + "','Supervisor','" + user.Phone + "','0')";
                await query(insert);
                delete user.Password;
                //not important data to be encrypted
                res.status(200).json("Supervisor Added Successfully")
            }
        }

        catch (err) {
            err = "Internal Server Error";
            res.status(500);
            return (res.json(err));
        }


    })

router.delete("/:ID", adminAuthorize, (req, res) => {
    const query = "DELETE FROM `user` WHERE `ID` = " + req.params.ID + ";";
    SuperVisorConnection.query(query, (error, data) => {
        if (error) {
            res.statusCode = 500;
            return (res.json(error));
        }
        else {
            res.statusCode = 200;
            return (res.json("Supervisor Deleted Successfully"));
        }
    });
})

router.put("/", adminAuthorize,handleData, body("Email").isEmail().withMessage("Please Enter Valid Email"),
    body("Name").isString().withMessage("Please Enter Valid Name").isLength({ min: 4, max: 25 }).withMessage("Name sholud be bewteen 4 to 25 charcters"),
    body("Password").isLength({ min: 8, max: 18 }).withMessage("Password should be bewteen 8 to 18 charcters"), async (req, res) => {
        const errors = validationResult(req);
        let query;
    if (!errors.isEmpty()) {
        console.log(errors);
        if (errors.array()[0].value.length==0) {
            query = "UPDATE `user` SET `Name`='" + req.body.Name + "',`Email`='" + req.body.Email + "',`Phone`='" + req.body.Phone + "' WHERE `Token` = '" + req.body.Token + "';";
        } else {
            return res.status(400).json({ errors: errors.array() });
        }
        }
    else {
        Password = await bcrypt.hash(req.body.Password, 10);
        query = "UPDATE `user` SET `Name`='" + req.body.Name + "',`Email`='" + req.body.Email + "',`Password`='" + Password + "',`Phone`='" + req.body.Phone + "' WHERE `Token` = '" + req.body.Token + "';";
        }
    SuperVisorConnection.query(query, (error, data) => {
        if (error) {
            res.statusCode = 500;
            return (res.json(error));
        }
        else {
            res.statusCode = 200;
            return (res.json("Supervisor Updated Successfully"));

        }
    });
})

// ====================== Export ======================
module.exports = router;