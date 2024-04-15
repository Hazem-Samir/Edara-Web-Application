// ====================== Initialization ======================
const express = require('express');
const router = express.Router();
const conn = require('../../DB/Connection')
const upload = require("../Middleware/Upload")
const isAdmin = require("../Middleware/Admin")
const { body, validationResult, param } = require("express-validator");
const util = require("util"); // helper
const fs = require("fs"); // file system

// ====================== Requests ======================
router.get("/:wid", isAdmin, (req, res) => {
    const query = "SELECT products.ID,products.Name AS PName,products.Description,products.Photo,products.Stock,warehouses.Name,warehouses.Status FROM products JOIN warehouses ON products.WID = warehouses.ID WHERE warehouses.ID = " + req.params.wid + ";";
    conn.query(query, (err, data) => {
        if (err) return (res.json("Erorr"));
        return res.json(data);
    });
})



router.delete("/", isAdmin, (req, res) => {
    const query = "DELETE FROM `products`;";
    const con = conn.query(query, (error, data) => {
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

router.delete("/:PID", isAdmin, (req, res) => {
    const query = "DELETE FROM `products` WHERE `ID` = " + req.params.PID + ";";
    conn.query(query, (error, data) => {
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

router.put("/", isAdmin,
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



            const query = util.promisify(conn.query).bind(conn);
            await query(update);
            res.status(200).json({
                msg: "Product Updated Successfully !",
            });
        } catch (err) {
            res.status(500).json(err);
        }
    }
);




router.post("/", isAdmin,
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

            const query = util.promisify(conn.query).bind(conn);
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