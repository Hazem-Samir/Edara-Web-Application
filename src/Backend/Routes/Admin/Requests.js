// ====================== Initialization ======================
const express = require('express');
const router = express.Router();
const conn = require('../../DB/Connection')
const isAdmin = require("../Middleware/Admin")

// ====================== Requests ======================
router.get("/",isAdmin, (req, res) => {
    const query = "SELECT requests.ID AS RID ,requests.Quantity,requests.State,user.Name AS SName,products.Name AS PName,products.Stock,warehouses.Name AS WName FROM `requests` join user ON user.ID = requests.SID join products on requests.PID = products.ID JOIN warehouses on warehouses.ID = requests.WID WHERE `State` = 'Pending';";
    conn.query(query, (err, data) => {
        if (err) return (res.json("Erorr"));
        return res.json(data);
    });
})

router.put("/accept", isAdmin, (req, res) => {
    const query = "UPDATE `requests` SET `State`='Accepted' WHERE `ID` = " + req.body.RID + ";";
    conn.query(query, (error, data) => {
        if (error) {
            res.statusCode = 500;
            return (res.json(error));
        }
        else {
            res.statusCode = 200;
            return (res.json("Request Accepted"));
        }
    });
})

router.put("/decline", isAdmin, (req, res) => {
    const query = "UPDATE `requests` SET `State`='Declined' WHERE `ID` = " + req.body.RID + ";";
    conn.query(query, (error, data) => {
        if (error) {
            res.statusCode = 500;
            return (res.json(error));
        }
        else {
            res.statusCode = 200;
            return (res.json("Request Declined"));

        }
    });
})

// ====================== Export ======================
module.exports = router;