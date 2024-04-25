// ====================== Initialization ======================
const express = require('express');
const router = express.Router();
const conn = require('../../DB/Connection');
const { supervisorAuthorize } = require('../Middleware/authorize');

// ====================== Requests ======================
router.get("/:Token",supervisorAuthorize, (req, res) => {
    const query1 = "SELECT ID FROM `user` WHERE Token = '"+ req.user.token +"';"
    conn.query(query1,
        (err, result) => {
            if (err) console.log(res.json("Erorr"));          
            const query2 = "SELECT requests.ID,requests.SID,requests.PID,requests.Quantity,requests.State,products.Name,products.Description,products.Photo,products.Stock FROM `requests` JOIN products ON requests.PID=products.ID WHERE requests.SID=" + result[0].ID + ";"
            conn.query(query2,
                (err, result) => {
                    if (err) return (res.json("Erorr"));
                    return res.json(result);
                })
        }); 
 
})

// ====================== Export ======================
module.exports = router;