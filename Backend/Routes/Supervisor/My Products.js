// ====================== Initialization ======================
const express = require('express');
const router = express.Router();
const conn = require('../../DB/Connection');
const { supervisorAuthorize } = require('../Middleware/authorize');

// ====================== Request ======================
router.get("/:Token", supervisorAuthorize, (req, res) => {
    const query1 = "SELECT ID FROM `user` WHERE Token = '" + req.user.token + "';"
    conn.query(query1,
        (err, result) => {
            if (err) console.log(res.json("Erorr"));

            const query2 = "SELECT products.ID as PID , products.Name , products.Description ,products.Photo ,products.Stock ,products.WID , user.ID as SID FROM `products` join warehouses on products.WID = warehouses.ID join user on warehouses.SID = user.ID WHERE user.ID=" + result[0].ID + ";"
            conn.query(query2,
                (err, result, fields) => {
                    if (err) return (res.json("Erorr"));
                    return res.json(result);
                });
        });
})

router.post("/", supervisorAuthorize, (req, res) => {
    const query = "INSERT INTO `requests` VALUES (Null,' " + req.body.SID + " ','" + req.body.WID + "','" + req.body.PID + "','" + req.body.Quantity + "','Pending');"
    conn.query(query, (err, result) => {
        if (err) return (res.status(500).send(err));
        else return (res.json("Request is Sent"));
    })
})

// ====================== Export ======================
module.exports = router;