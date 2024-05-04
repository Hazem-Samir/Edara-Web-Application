// ====================== Initialization ======================
const express = require('express');
const router = express.Router();
const {SuperVisorConnection, WarehouseConnection, ProductConnection, RequestConnection} = require('../../DB/Connection');
const { supervisorAuthorize } = require('../Middleware/authorize');

// ====================== Request ======================
router.get("/:Token", supervisorAuthorize, (req, res) => {
    const query1 = "SELECT ID FROM `user` WHERE Token = '" + req.user.token + "';"
    SuperVisorConnection.query(query1,
        (err, result) => {
            if (err) console.log(res.json("Erorr"));

            const query2 = `SELECT ${process.env.MYSQL_HOST_PRODUCT}.productdb.products.ID as PID , ${process.env.MYSQL_HOST_PRODUCT}.productdb.products.Name ,${process.env.MYSQL_HOST_WAREHOUSE}.warehousedb.warehouses.Name as WNAME, ${process.env.MYSQL_HOST_PRODUCT}.productdb.products.Description ,${process.env.MYSQL_HOST_PRODUCT}.productdb.products.Photo ,${process.env.MYSQL_HOST_PRODUCT}.productdb.products.Stock ,${process.env.MYSQL_HOST_PRODUCT}.productdb.products.WID , user.ID as SID FROM ${process.env.MYSQL_HOST_PRODUCT}.productdb.products join ${process.env.MYSQL_HOST_WAREHOUSE}.warehousedb.warehouses on ${process.env.MYSQL_HOST_PRODUCT}.productdb.products.WID = ${process.env.MYSQL_HOST_WAREHOUSE}.warehousedb.warehouses.ID join user on ${process.env.MYSQL_HOST_WAREHOUSE}.warehousedb.warehouses.SID = user.ID WHERE user.ID=" + result[0].ID + ";`
            SuperVisorConnection.query(query2,
                (err, result, fields) => {
                    if (err) return (res.json("Erorr"));
                    return res.json(result);
                });
        });
})

router.post("/", supervisorAuthorize, (req, res) => {
    const query = "INSERT INTO `requests` VALUES (Null,' " + req.body.SID + " ','" + req.body.WID + "','" + req.body.PID + "','" + req.body.Quantity + "','Pending');"
    RequestConnection.query(query, (err, result) => {
        if (err) return (res.status(500).send(err));
        else return (res.json("Request is Sent"));
    })
})

// ====================== Export ======================
module.exports = router;