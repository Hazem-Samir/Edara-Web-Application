// ====================== Initialization ======================
const express = require('express');
const router = express.Router();
const { supervisorAuthorize } = require('../Middleware/authorize');
const { SuperVisorConnection, RequestConnection } = require('../../DB/Connection');

// ====================== Requests ======================
router.get("/:Token", supervisorAuthorize, (req, res) => {
    console.log(req.session.id);
    const query1 = "SELECT ID FROM `user` WHERE Token = '"+ req.user.token +"';"
    SuperVisorConnection.query(query1,
        (err, result) => {
            if (err) console.log(res.json("Erorr"));          
            const query2 = `SELECT requests.ID,requests.SID,requests.PID,requests.Quantity,requests.State,${process.env.MYSQL_HOST_PRODUCT}.productdb.products.Name,${process.env.MYSQL_HOST_PRODUCT}.productdb.products.Description,${process.env.MYSQL_HOST_PRODUCT}.productdb.products.Photo,${process.env.MYSQL_HOST_PRODUCT}.productdb.products.Stock FROM 'requests' JOIN ${process.env.MYSQL_HOST_PRODUCT}.productdb.products ON requests.PID=${process.env.MYSQL_HOST_PRODUCT}.productdb.products.ID WHERE requests.SID=" + result[0].ID + ";`
            RequestConnection.query(query2,
                (err, result) => {
                    if (err) return (res.json("Erorr"));
                    return res.json(result);
                })
        }); 

})

// ====================== Export ======================
module.exports = router;