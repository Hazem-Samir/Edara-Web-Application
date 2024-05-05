// ====================== Initialization ======================
const express = require('express');
const router = express.Router();
const { supervisorAuthorize } = require('../Middleware/authorize');
const { SuperVisorConnection, RequestConnection, ProductConnection } = require('../../DB/Connection');
const { performJoin } = require('../../Utils/CustomJoin');

// ====================== Requests ======================
router.get("/:Token", supervisorAuthorize, (req, res) => {
    // const query2 = `SELECT requests.ID,requests.SID,requests.PID,requests.Quantity,requests.State, products.Name, products.Description, products.Photo, products.Stock FROM 'requests' JOIN  products ON requests.PID= products.ID WHERE requests.SID=" + result[0].ID + ";`
try{
   const userQuery = "SELECT ID as CID1 FROM `user` WHERE Token = '" + req.user.token + "';"
    SuperVisorConnection.query(userQuery, (err, userResult) => {
        if (err) {
            console.error('Error executing userQuery:', err);
            return res.json("Error");
        }

        // Assuming userQuery returns some result, you can extract the relevant data and use it in query2
        const requestQuery=`select requests.ID,requests.SID as CID2,requests.PID as CID3 ,requests.Quantity,requests.State from requests`
        RequestConnection.query(requestQuery, (err, requestResult) => {
            if (err) {
                console.error('Error executing userQuery:', err);
                return res.json("Error");
            }
         
        const productQuery=`select products.ID as CID4 ,products.Name, products.Description, products.Photo, products.Stock  from products`

            ProductConnection.query(productQuery, (err, productResult) => {
                if (err) {
                    console.error('Error executing userQuery:', err);
                    return res.json("Error");
                }
                const joinedResults = performJoin(userResult,requestResult, productResult);

              res.status(200).json(joinedResults)
             
    
            })

        })

       
    });
}
catch(err){
    console.log(err)
}

})

// ====================== Export ======================
module.exports = router;