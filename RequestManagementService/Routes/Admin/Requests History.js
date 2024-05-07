// ====================== Initialization ======================
const express = require('express');
const router = express.Router();

const { adminAuthorize } = require('../Middleware/authorize');
const { RequestConnection, SuperVisorConnection, ProductConnection, WarehouseConnection } = require('../../DB/Connection');
const { performJoin } = require('../../Utils/CustomJoin');

// ====================== Requests ======================
router.get("/",adminAuthorize, (req, res) => {
    try{
        const userQuery = "SELECT ID as CID1 ,Name as SName FROM `user` WHERE Type != 'Admin';"
         SuperVisorConnection.query(userQuery, (err, userResult) => {
             if (err) {
                 console.error('Error executing userQuery:', err);
                 return res.json("Error");
             }
     
             // Assuming userQuery returns some result, you can extract the relevant data and use it in query2
             const requestQuery=`select requests.ID,requests.SID as CID2,requests.WID as CID3 ,requests.Quantity,requests.State from requests where requests.State != 'Pending'; `
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
                     console.log(userResult)
                     console.log(requestResult)

                     console.log(warehouseResult)
                     console.log(productResult)
                     console.log(joinedResults)


                   res.status(200).json(joinedResults)
                  
         
                 })
         
                 })
     
             })
     
            
         });
     }
     catch(err){
         console.log(err)
     }

    // const query = "SELECT user.Name as SuperVisorName,products.Name as ProductName ,warehouses.Name as WarehouseName,requests.Quantity,requests.State FROM `requests` JOIN products ON products.ID=requests.PID JOIN user on user.ID=requests.SID JOIN warehouses on warehouses.ID=requests.WID WHERE requests.State != 'Pending';";
    // conn.query(query, (err, data) => {
    //     if (err) return (res.json("Erorr"));
    //     return res.json(data);
    // });
})

// ====================== Export ======================
module.exports = router;