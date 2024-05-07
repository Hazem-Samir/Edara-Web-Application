// ====================== Initialization ======================
const express = require('express');
const router = express.Router();
const upload = require("../Middleware/Upload")
const { body, validationResult, param } = require("express-validator");
const util = require("util"); // helper
const fs = require("fs"); // file system
const { adminAuthorize } = require('../Middleware/authorize');
const { ProductConnection, WarehouseConnection } = require('../../DB/Connection');
const { performJoin } = require('../../Utils/CustomJoin');

// ====================== Requests ======================
router.get("/:wid", adminAuthorize, (req, res) => {
    try{
             const warehouseQuery=`select ID as CID1 ,warehouses.Name,warehouses.Status  from warehouses where ID=${req.params.wid}`
     
                 WarehouseConnection.query(warehouseQuery, (err, warehouseResult) => {
                     if (err) {
                         console.error('Error executing userQuery:', err);
                         return res.json("Error");
                     }
                   
                   const productQuery=`select products.ID,products.Name AS PName,products.Description,products.Photo,products.Stock,products.WID as CID2  from products`
     
                 ProductConnection.query(productQuery, (err, productResult) => {
                     if (err) {
                         console.error('Error executing userQuery:', err);
                         return res.json("Error");
                     }
                     const joinedResults = performJoin(warehouseResult,productResult,[],[]);

                   res.status(200).json(joinedResults)
                  
         
                 })
         
             
     
            
         });
     }
     catch(err){
         console.log(err)
     }
    // const query = "SELECT products.ID,products.Name AS PName,products.Description,products.Photo,products.Stock,warehouses.Name,warehouses.Status FROM products JOIN warehouses ON products.WID = warehouses.ID WHERE warehouses.ID = " + req.params.wid + ";";
    // ProductConnection.query(query, (err, data) => {
    //     if (err) return (res.json("Erorr"));
    //     return res.json(data);
    // });
})



router.delete("/", adminAuthorize, (req, res) => {
    const query = "DELETE FROM `products`;";
    ProductConnection.query(query, (error, data) => {
        if (error) {
            res.statusCode = 500;
            return (res.json(error));
        }
        else {
            res.statusCode = 200;
            return (res.json("All Products Deleted Successfully"));

        }
    });
})

router.delete("/:PID", adminAuthorize, (req, res) => {
    const query = "DELETE FROM `products` WHERE `ID` = " + req.params.PID + ";";
    ProductConnection.query(query, (error, data) => {
        if (error) {
            res.statusCode = 500;
            return (res.json(error));
        }
        else {
            res.statusCode = 200;
            return (res.json("Product Deleted Successfully"));

        }
    });
})

router.put("/", adminAuthorize,
    upload.single("Photo"),
    body("Name").isString().withMessage("Please Enter Valid Name").isLength({ min: 4, max: 25 }).withMessage("Name sholud be bewteen 4 to 25 charcters"),
    body("Description").isString().withMessage("Please Enter Valid Name").isLength({ min: 4, max: 300 }).withMessage("Description sholud be bewteen 4 to 300 charcters"),
    body("Stock").isInt({ min: 1 }).withMessage("The Srock Should be specified in number"),


    async (req, res) => {


        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            if (!req.file) {
                return res.status(400).json({
                    errors: [
                        {
                            msg: "Image is Required",
                        },
                    ],
                });
            }

            
            const product = {
                Name: req.body.Name,
                Description: req.body.Description,
                Stock: req.body.Stock,
                WID: req.body.WID,
                PID: req.body.PID,
                Photo: req.file.filename,
            };
  
          
            const update = "UPDATE `products` SET `Name`='" + product.Name + "',`Description`='" + product.Description + "',`Photo`='" + product.Photo + "',`Stock`='" + product.Stock + "',`WID`='" + product.WID + "' where ID = '" + product.PID + "';";



            const query = util.promisify(ProductConnection.query).bind(ProductConnection);
            await query(update);
            res.status(200).json({
                msg: "Product Updated Successfully !",
            });
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    }
);




router.post("/", adminAuthorize,
    upload.single("Photo"),
    body("Name").isString().withMessage("Please Enter Valid Name").isLength({ min: 4, max: 25 }).withMessage("Name sholud be bewteen 4 to 25 charcters"),
    body("Description").isString().withMessage("Please Enter Valid Name").isLength({ min: 4, max: 300 }).withMessage("Description sholud be bewteen 4 to 300 charcters"),
    body("Stock").isInt({ min: 1 }).withMessage("The Srock Should be specified in number"),
    async (req, res) => {

        try {
            // 1- VALIDATION REQUEST [manual, express validation]
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

    
            if (!req.file) {
                return res.status(400).json({
                    errors: [
                        {
                            msg: "Image is Required",
                        },
                    ],
                });
            }

      
            const product = {
                Name: req.body.Name,
                Description: req.body.Description,
                Stock: req.body.Stock,
                WID: req.body.WID,
                Photo: req.file.filename,
            };

            // 4 - INSERT MOVIE INTO DB
            const insert = "INSERT INTO products VALUES (NULL,'" + product.Name + "','" + product.Description + "','" + product.Photo + "', " + product.Stock + "," + product.WID + ")";
            const update = "UPDATE `warehouses` SET `Status`=1 WHERE ID = " + product.WID + "; ";
            //    const insert = "select * from products";

            const Pquery = util.promisify(ProductConnection.query).bind(ProductConnection);
            const Wquery = util.promisify(WarehouseConnection.query).bind(WarehouseConnection);
            await Pquery(insert);
            await Wquery(update);
            res.status(200).json({
                msg: "Product Created Successfully !",
            });
        } catch (err) {
            res.status(500).json(err);
        }
    }
);






// ====================== Export ======================
module.exports = router;