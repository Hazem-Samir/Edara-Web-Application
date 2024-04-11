// ====================== Initialization ======================
const express = require('express');
const router = express.Router();
const conn = require('../../DB/Connection')
const isAdmin = require("../Middleware/Admin")

// ====================== Requests ======================
router.get("/",isAdmin, (req, res) => {
    const query = "SELECT user.Name as SuperVisorName,products.Name as ProductName ,warehouses.Name as WarehouseName,requests.Quantity,requests.State FROM `requests` JOIN products ON products.ID=requests.PID JOIN user on user.ID=requests.SID JOIN warehouses on warehouses.ID=requests.WID WHERE requests.State != 'Pending';";
    conn.query(query, (err, data) => {
        if (err) return (res.json("Erorr"));
        return res.json(data);
    });
})

// ====================== Export ======================
module.exports = router;