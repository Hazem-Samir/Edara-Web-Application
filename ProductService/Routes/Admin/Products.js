// ====================== Initialization ======================
const express = require('express');
const router = express.Router();
const {ProductConnection, WarehouseConnection} = require('../../DB/Connection')
const upload = require("../Middleware/Upload")
const { body, validationResult, param } = require("express-validator");
const util = require("util"); // helper
const fs = require("fs"); // file system
const { adminAuthorize } = require('../Middleware/authorize');

// ====================== Requests ======================
router.get("/:wid", adminAuthorize, (req, res) => {
   

    // const query = " JOIN warehouses ON products.WID = warehouses.ID WHERE warehouses.ID = " + req.params.wid + ";";


try {
    const warehouseQuery = `select ID from warehouses  `

    WarehouseConnection.query(warehouseQuery, (err, warehouseResult) =>{
        if (err) {
            console.error('Error executing userQuery:', err);
          console.log(warehouseResult);
        }


        const productQuery=`select products.ID as PID , products.Name , products.Description ,products.Photo ,products.Stock,WID as CID4    from products`

        ProductConnection.query(query, (err, productResult) => {
            if (err) {
                
                console.error('Error executing userQuery:', err);
             console.log(productResult);
            
            }
                 
            const joinedResults = performJoin(warehouseResult, productResult,[]);

            res.status(200).json(joinedResults)
        
        });


    });

}
catch (err) {
    console.log(err); 
}

   
   
})

    

router.delete("/", adminAuthorize, (req, res) => {
    const query = "DELETE FROM `products`;";
    const con = ProductConnection.query(query, (error, data) => {
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


    async (req, res) => {


        try {
          
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
            res.status(500).json(err);
        }
    }
);




router.post("/", adminAuthorize,
    upload.single("Photo"),
    body("Name").isString().withMessage("Please Enter Valid Name").isLength({ min: 4, max: 25 }).withMessage("Name sholud be bewteen 4 to 25 charcters"),
    body("Description").isString().withMessage("Please Enter Valid Name").isLength({ min: 4, max: 300 }).withMessage("Description sholud be bewteen 4 to 300 charcters"),

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

            const query = util.promisify(ProductConnection.query).bind(ProductConnection);
            await query(insert);
            await query(update);
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