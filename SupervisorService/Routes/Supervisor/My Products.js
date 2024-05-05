// ====================== Initialization ======================
const express = require('express');
const router = express.Router();
const { SuperVisorConnection, WarehouseConnection, ProductConnection, RequestConnection } = require('../../DB/Connection');
const { supervisorAuthorize } = require('../Middleware/authorize');
const { performJoin } = require('../../Utils/CustomJoin');

// ====================== Request ======================
// Function to perform the join operation

  
  
router.get("/", supervisorAuthorize, (req, res) => {
    const userQuery = "SELECT ID as CID1 FROM `user` WHERE Token = '" + req.user.token + "';"
    SuperVisorConnection.query(userQuery, (err, userResult) => {
        if (err) {
            console.error('Error executing userQuery:', err);
            return res.json("Error");
        }
        console.log(userResult)
        // Assuming userQuery returns some result, you can extract the relevant data and use it in query2
        const warehouseQuery=`select ID as CID3 ,Name as WName  ,SID as CID2 from warehouses`
        
        WarehouseConnection.query(warehouseQuery, (err, warehouseResult) => {
            if (err) {
                console.error('Error executing userQuery:', err);
                return res.json("Error");
            }
            console.log(warehouseResult)
         
        const productQuery=`select products.ID as PID , products.Name , products.Description ,products.Photo ,products.Stock,WID as CID4    from products`

            ProductConnection.query(productQuery, (err, productResult) => {
                if (err) {
                    console.error('Error executing userQuery:', err);
                    return res.json("Error");
                }
                const joinedResults = performJoin(userResult,warehouseResult, productResult);

              res.status(200).json(joinedResults)
             
    
            })

        })

       
    });
});

router.post("/", supervisorAuthorize, (req, res) => {

    const query = "INSERT INTO `requests` VALUES (Null,' " + req.body.SID + " ','" + req.body.WID + "','" + req.body.PID + "','" + req.body.Quantity + "','Pending');"
    RequestConnection.query(query, (err, result) => {
        console.log(err)
        if (err) return (res.status(500).send(err));
        else return (res.json("Request is Sent"));
    })
})

// ====================== Export ======================
module.exports = router;
