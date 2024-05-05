// ====================== Initialization ======================
const express = require('express');
const router = express.Router();
const { SuperVisorConnection, WarehouseConnection, ProductConnection, RequestConnection } = require('../../DB/Connection');
const { supervisorAuthorize } = require('../Middleware/authorize');

// ====================== Request ======================
router.get("/:Token", supervisorAuthorize, (req, res) => {
    const query1 = "SELECT ID FROM `user` WHERE Token = '" + req.user.token + "';"
    SuperVisorConnection.query(query1, (err, result) => {
        if (err) {
            console.error('Error executing query1:', err);
            return res.json("Error");
        }

        // Assuming query1 returns some result, you can extract the relevant data and use it in query2
        const userID = result[0].ID;

        const query2 = `
            SELECT 
               products.ID as PID,
                products.Name,
             warehouses.Name as WNAME,
               products.Description,
                products.Photo,
               products.Stock,
                products.WID,
                user.ID as SID 
            FROM 
                ${process.env.MYSQL_HOST_PRODUCT}.products 
            JOIN 
                ${process.env.MYSQL_HOST_WAREHOUSE}.warehouses 
                ON products.WID = warehouses.ID 
            JOIN 
                user 
                ON warehouses.SID = user.ID 
            WHERE 
                user.ID = ${userID};`;

        SuperVisorConnection.query(query2, (err, result, fields) => {
            if (err) {
                console.error('Error executing query2:', err);
                return res.json("Error");
            }
            return res.json(result);
        });
    });
});

router.post("/", supervisorAuthorize, (req, res) => {
    const query = "INSERT INTO `requests` VALUES (Null,' " + req.body.SID + " ','" + req.body.WID + "','" + req.body.PID + "','" + req.body.Quantity + "','Pending');"
    RequestConnection.query(query, (err, result) => {
        if (err) return (res.status(500).send(err));
        else return (res.json("Request is Sent"));
    })
})

// ====================== Export ======================
module.exports = router;
