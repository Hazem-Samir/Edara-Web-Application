// ====================== Initialization ======================
const express = require('express');
const router = express.Router();
const conn = require('../../DB/Connection');
const { body, validationResult, param } = require('express-validator');
const util = require("util");
const isAdmin = require("../Middleware/Admin")
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// ====================== Requests ======================
router.get("/", isAdmin, (req, res) => {
    const query = "SELECT * FROM `user` WHERE `Type` = 'Supervisor';";
    conn.query(query, (err, data) => {
        if (err) return (res.json("Erorr"));
        return res.json(data);
    });
})

router.post("/", isAdmin,
    body("Email").isEmail().withMessage("Please Enter Valid Email"),
    body("Name").isString().withMessage("Please Enter Valid Name").isLength({ min: 4, max: 25 }).withMessage("Name sholud be bewteen 4 to 25 charcters"),
    body("Password").isLength({ min: 8, max: 18 }).withMessage("Password sholud be bewteen 8 to 18 charcters"),

    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const query = util.promisify(conn.query).bind(conn);
            const checkEmailExists = await query("select * from user where Email ='" + req.body.Email + "'");
            if (checkEmailExists.length > 0) {
                res.status(400).json("Email Already Exists");
            }

            else {

                const user = {
                    Name: req.body.Name,
                    Email: req.body.Email,
                    Password: await bcrypt.hash(req.body.Password, 10),
                    Token: crypto.randomBytes(16).toString("hex"),
                    Phone: req.body.Phone
                }
                const insert = "INSERT INTO user VALUES (NULL,'" + user.Name + "','" + user.Email + "','" + user.Password + "','" + user.Token + "','Supervisor','" + user.Phone + "','1')";
                await query(insert);
                delete user.Password;
                res.status(200).json("Supervisor Added Successfully")
            }
        }

        catch (err) {
            err = "Internal Server Error";
            res.status(500);
            return (res.json(err));
        }


    })

router.delete("/:ID", isAdmin, (req, res) => {
    const query = "DELETE FROM `user` WHERE `ID` = " + req.params.ID + ";";
    const con = conn.query(query, (error, data) => {
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

router.put("/", isAdmin, body("Email").isEmail().withMessage("Please Enter Valid Email"),
    body("Name").isString().withMessage("Please Enter Valid Name").isLength({ min: 4, max: 25 }).withMessage("Name sholud be bewteen 4 to 25 charcters"),
    body("Password").isLength({ min: 8, max: 18 }).withMessage("Password sholud be bewteen 8 to 18 charcters"), async (req, res) => {
    Password= await bcrypt.hash(req.body.Password, 10);
    const query = "UPDATE `user` SET `Name`='" + req.body.Name + "',`Email`='" + req.body.Email + "',`Password`='" + Password + "',`Phone`='" + req.body.Phone + "' WHERE `ID` = " + req.body.PID + ";";
    conn.query(query, (error, data) => {
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