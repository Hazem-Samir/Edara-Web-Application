// ====================== Initialization ======================
const express = require('express');
const router = express.Router();

const { body, validationResult, param } = require('express-validator');
const util = require("util");
const { adminAuthorize } = require('../Middleware/authorize');
const { SuperVisorConnection, WarehouseConnection } = require('../../DB/Connection');
const { performJoin } = require('../../Utils/CustomJoin');
// ====================== Requests ======================
router.get("/", adminAuthorize, (req, res) => {
    try{
    const userQuery = "SELECT ID as CID1 ,Name  FROM `user` WHERE Type != 'Admin';"
         SuperVisorConnection.query(userQuery, (err, userResult) => {
             if (err) {
                 console.error('Error executing userQuery:', err);
                 return res.json("Error");
             }
     
             const warehouseQuery=`select warehouses.ID,warehouses.Name AS WHName,warehouses.Location,warehouses.Status,warehouses.SID as CID2 from warehouses`
             WarehouseConnection.query(warehouseQuery, (err, warehouseResult) => {
                 if (err) {
                     console.error('Error executing userQuery:', err);
                     return res.json("Error");
                 }
              
      
     
                 WarehouseConnection.query(warehouseQuery, (err, warehouseResult) => {
                     if (err) {
                         console.error('Error executing userQuery:', err);
                         return res.json("Error");
                     }
                     const joinedResults = performJoin(userResult,warehouseResult,[],[]);
                     res.status(200).json(joinedResults)
                 console.log(userResult)
                 console.log(warehouseResult)
                 console.log(joinedResults)
         
                 })
     
             })
     
            
         });
     }
     catch(err){
         console.log(err)
     }
    // const query = "SELECT warehouses.ID,warehouses.Name AS WHName,warehouses.Location,warehouses.Status,warehouses.SID,user.Name FROM warehouses JOIN user ON warehouses.SID = user.ID;";
    // conn.query(query, (err, data) => {
    //     if (err) return (res.json("Erorr"));
    //     return res.json(data);
    // });
})

router.get("/:WID", adminAuthorize, (req, res) => {
    try{
        const userQuery = "SELECT ID as CID1 ,Name  FROM `user` WHERE Type != 'Admin';"
             SuperVisorConnection.query(userQuery, (err, userResult) => {
                 if (err) {
                     console.error('Error executing userQuery:', err);
                     return res.json("Error");
                 }
         
                 const warehouseQuery=`select warehouses.ID,warehouses.Name AS WHName,warehouses.Location,warehouses.Status,warehouses.SID as CID2 from warehouses WHERE warehouses.ID = ${req.params.WID}`
                 WarehouseConnection.query(warehouseQuery, (err, warehouseResult) => {
                     if (err) {
                         console.error('Error executing userQuery:', err);
                         return res.json("Error");
                     }
                  
          
         
                     WarehouseConnection.query(warehouseQuery, (err, warehouseResult) => {
                         if (err) {
                             console.error('Error executing userQuery:', err);
                             return res.json("Error");
                         }
                         const joinedResults = performJoin(userResult,warehouseResult,[],[]);
                         res.status(200).json(joinedResults)
                     
             
                     })
         
                 })
         
                
             });
         }
         catch(err){
             console.log(err)
         }
    // const query = "SELECT warehouses.ID,warehouses.Name AS WHName,warehouses.Location,warehouses.Status,warehouses.SID,user.Name FROM warehouses JOIN user ON warehouses.SID = user.ID WHERE warehouses.ID = " + req.params.WID + ";";
    // conn.query(query, (err, data) => {
    //     if (err) return (res.json("Erorr"));
    //     return res.json(data);
    // });
})

router.delete("/", adminAuthorize, (req, res) => {
    const query = "DELETE FROM `warehouses`;";
   WarehouseConnection.query(query, (error, data) => {
        if (error) {
            res.statusCode = 500;
            return (res.json(error));
        }
        else {
            res.statusCode = 200;
            return (res.json("All Warehouses Deleted Successfully"));
        }
    });
})

router.delete("/:WID", adminAuthorize, (req, res) => {
    const query = "DELETE FROM `warehouses` WHERE `ID` = " + req.params.WID + ";";
   WarehouseConnection.query(query, (error, data) => {
        if (error) {
            res.statusCode = 500;
            return (res.json(error));
        }
        else {
            res.statusCode = 200;
            return (res.json("Warehouse Deleted Successfully"));
        }
    });
})

router.put("/", adminAuthorize, body("Name").isString().withMessage("Please Enter Valid Name").isLength({ min: 4, max: 25 }).withMessage("Name sholud be bewteen 4 to 25 charcters"),
    body("Location").isString().withMessage("Please Enter Valid Name").isLength({ min: 4, max: 25 }).withMessage("Name sholud be bewteen 4 to 25 charcters"),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const query = "UPDATE `warehouses` SET `Name`='" + req.body.Name + "',`Location`='" + req.body.Location + "',`SID`='" + req.body.SID + "' WHERE warehouses.ID = " + req.body.WID + " ;";
        WarehouseConnection.query(query, (error, data) => {
            if (error) {
                res.statusCode = 500;
                return (res.json(error));
            }
            else {
                res.statusCode = 200;
                return (res.json("Warehouse Updated Successfully"));

            }
        });
    })


router.post("/", adminAuthorize,
    body("warehouseName").isString().withMessage("Please Enter Valid Name").isLength({ min: 4, max: 25 }).withMessage("Name sholud be bewteen 4 to 25 charcters"),
    body("Location").isString().withMessage("Please Enter Valid Name").isLength({ min: 4, max: 25 }).withMessage("Name sholud be bewteen 4 to 25 charcters"),

    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const query = util.promisify(WarehouseConnection.query).bind(WarehouseConnection);

            const checkWarehouseExists = await query("select * from warehouses where Name ='" + req.body.warehouseName + "'");
            if (checkWarehouseExists.length > 0) {
                res.status(400).json("Warehouse Already Exists");
            }
            else {
                console.log("aaaaaaaaa")
                const warehouse = {
                    Name: req.body.warehouseName,
                    Location: req.body.Location,
                    SID: req.body.SID
                }
                const insert = "INSERT INTO warehouses VALUES (NULL,'" + warehouse.Name + "','" + warehouse.Location + "',0,'" + warehouse.SID + "')";
                await query(insert);
                res.status(200).json("Warehouse Created Successfully")
            }
        }
        catch (err) {
            console.log(err)
        }
    })

// ====================== Export ======================
module.exports = router;