// ====================== Initialization ======================
const express = require('express');
const router = express.Router();

const { adminAuthorize} = require('../Middleware/authorize');
const { SuperVisorConnection, WarehouseConnection, ProductConnection, RequestConnection } = require('../../DB/Connection');
const { performJoin } = require('../Utils/CustomJoin');


// ====================== Requests ======================
router.get("/",adminAuthorize, (req, res) => {
    console.log(req.user)
   
    try{
        const userQuery = "SELECT ID as CID1 ,Name as SName FROM `user` WHERE Type != 'Admin';"
         SuperVisorConnection.query(userQuery, (err, userResult) => {
             if (err) {
                 console.error('Error executing userQuery:', err);
                 return res.json("Error");
             }
     
             // Assuming userQuery returns some result, you can extract the relevant data and use it in query2
             const requestQuery=`select requests.ID,requests.SID as CID2,requests.WID as CID3 ,requests.Quantity,requests.State from requests where requests.State = 'Pending'; `
             RequestConnection.query(requestQuery, (err, requestResult) => {
                 if (err) {
                     console.error('Error executing userQuery:', err);
                     return res.json("Error");
                 }
              
             const warehouseQuery=`select ID as CID4 ,Name as WName from warehouses`
     
                 WarehouseConnection.query(warehouseQuery, (err, warehouseResult) => {
                     if (err) {
                         console.error('Error executing userQuery:', err);
                         return res.json("Error");
                     }
                   
                   const productQuery=`select WID as CID5 ,products.Name as PName,Stock  from products`
     
                 ProductConnection.query(productQuery, (err, productResult) => {
                     if (err) {
                         console.error('Error executing userQuery:', err);
                         return res.json("Error");
                     }
                     const joinedResults = performJoin(userResult,requestResult, warehouseResult,productResult);
                   res.status(200).json(joinedResults)
                  
         
                 })
         
                 })
     
             })
     
            
         });
     }
     catch(err){
         console.log(err)
     }

})

router.put("/accept", adminAuthorize, (req, res) => {
    const query = "UPDATE `requests` SET `State`='Accepted' WHERE `ID` = " + req.body.RID + ";";
    RequestConnection.query(query, (error, data) => {
        if (error) {
            console.log(error)
            res.statusCode = 500;
            return (res.json(error));
        }
        else {
            res.statusCode = 200;
            return (res.json("Request Accepted"));
        }
    });
})

router.put("/decline", adminAuthorize, (req, res) => {
    const query = "UPDATE `requests` SET `State`='Declined' WHERE `ID` = " + req.body.RID + ";";
    RequestConnection.query(query, (error, data) => {
        if (error) {
            console.log(error)
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