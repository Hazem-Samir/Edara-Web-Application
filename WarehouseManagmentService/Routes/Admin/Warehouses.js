// ====================== Initialization ======================
const express = require('express');
const router = express.Router();
const {SuperVisorConnection, WarehouseConnection} = require('../../DB/Connection')
const { body, validationResult, param } = require('express-validator');
const util = require("util");
const { adminAuthorize } = require('../Middleware/authorize');
// ====================== Requests ======================



router.get("/", adminAuthorize, (req, res) => {
    const query = "SELECT warehouses.ID,warehouses.Name AS WHName,warehouses.Location,warehouses.Status,warehouses.SID,user.Name FROM warehouses JOIN user ON warehouses.SID = user.ID;";
    conn.query(query, (err, data) => {
        if (err) return (res.json("Erorr"));
        return res.json(data);
    });
})

// ==============================================================================


router.get("/", adminAuthorize, (req, res) => {
    const userQuery = "SELECT ID as CID1 FROM `user` ;"
    SuperVisorConnection.query(userQuery, (err, userResult) => {
        if (err) {
            console.error('Error executing userQuery:', err);
            return res.json("Error");
        }
        console.log(userResult)
        // Assuming userQuery returns some result, you can extract the relevant data and use it in query2
        const warehouseQuery=`SELECT warehouses.ID,warehouses.Name AS WHName,warehouses.Location,warehouses.Status,warehouses.SID,user.Name FROM warehouses`
        
        WarehouseConnection.query(warehouseQuery, (err, warehouseResult) => {
            if (err) {
                console.error('Error executing userQuery:', err);
                return res.json("Error");
            }
            console.log(warehouseResult)
         
        const productQuery=`select products.ID as PID , products.Name , products.Description ,products.Photo ,products.Stock,WID as CID4    from products`

            
                const joinedResults = performJoin(userResult,warehouseResult,[]);

              res.status(200).json(joinedResults)
             
    
            

        })

       
    });
});





// =================================================================================


router.get("/:WID", adminAuthorize, (req, res) => {
    const userQuery = "SELECT ID as CID1 FROM `user` ;"
    SuperVisorConnection.query(userQuery, (err, userResult) => {
        if (err) {
            console.error('Error executing userQuery:', err);
            return res.json("Error");
        }
        console.log(userResult)
        // Assuming userQuery returns some result, you can extract the relevant data and use it in query2
        const warehouseQuery=`SELECT warehouses.ID,warehouses.Name AS WHName,warehouses.Location,warehouses.Status,warehouses.SID,user.Name FROM warehouses`
        
        WarehouseConnection.query(warehouseQuery, (err, warehouseResult) => {
            if (err) {
                console.error('Error executing userQuery:', err);
                return res.json("Error");
            }
            console.log(warehouseResult)
       

            
                const joinedResults = performJoin(userResult,warehouseResult,[]);

              res.status(200).json(joinedResults)
             
    
            

        })

       
    });
});
// =================================================================================

router.delete("/", adminAuthorize, (req, res) => {
    const query = "DELETE FROM `warehouses`;";
    const con = conn.query(query, (error, data) => {
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
    const con = conn.query(query, (error, data) => {
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
        conn.query(query, (error, data) => {
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

            const query = util.promisify(conn.query).bind(conn);

            const checkWarehouseExists = await query("select * from warehouses where Name ='" + req.body.warehouseName + "'");
            if (checkWarehouseExists.length > 0) {
                res.status(400).json("Warehouse Already Exists");
            }
            else {

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
            // res.status(500).json(err)
        }
    })

// ====================== Export ======================
module.exports = router;