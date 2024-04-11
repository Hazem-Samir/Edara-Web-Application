// ====================== Initialization ======================
const conn = require('../../DB/Connection')
const util = require("util");
const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');

router.use(cookieParser());




router.post("/", async (req, res, next) => {
    const query = util.promisify(conn.query).bind(conn);
    const Token = req.cookies.Token;
    const user = await query("select * from user where Token = '" + Token + "'");
    if (user[0] && user[0].Type==="Supervisor") {
        next();
    }
    else {
        res.status(401).json("Unauthorized");
    }
})

router.post("/:id", async (req, res, next) => {
    const query = util.promisify(conn.query).bind(conn);
    const Token = req.cookies.Token;
    const user = await query("select * from user where Token = '" + Token + "'");
    if (user[0] && user[0].Type === "Supervisor") {
        next();
    }
    else {
        res.status(401).json("Unauthorized");
    }
})


router.get("/", async (req, res, next) => {
    const query = util.promisify(conn.query).bind(conn);
    const Token = req.cookies.Token;
    const user = await query("select * from user where Token = '" + Token + "'");
    if (user[0] && user[0].Type === "Supervisor") {
        next();
    }
    else {
        res.status(401).json("Unauthorized");
    }
})

router.get("/:id", async (req, res, next) => {
    const query = util.promisify(conn.query).bind(conn);
    const Token = req.cookies.Token;
    const user = await query("select * from user where Token = '" + Token + "'");
    if (user[0] && user[0].Type === "Supervisor") {
        next();
    }
    else {
        res.status(401).json("Unauthorized");
    }
})


router.put("/", async (req, res, next) => {
    const query = util.promisify(conn.query).bind(conn);
    const Token = req.cookies.Token;
    const user = await query("select * from user where Token = '" + Token + "'");
    if (user[0] && user[0].Type == "Supervisor") {
        next();
    }
    else {
        res.status(401).json("Unauthorized");
    }
})

router.put("/:id", async (req, res, next) => {
    const query = util.promisify(conn.query).bind(conn);
    const Token = req.cookies.Token;
    const user = await query("select * from user where Token = '" + Token + "'");
    if (user[0] && user[0].Type == "Supervisor") {
        next();
    }
    else {
        res.status(401).json("Unauthorized");
    }
})


router.delete("/", async (req, res, next) => {
    const query = util.promisify(conn.query).bind(conn);
    const Token = req.cookies.Token;
    const user = await query("select * from user where Token = '" + Token + "'");
    if (user[0] && user[0].Type == "Supervisor") {
        next();
    }
    else {
        res.status(401).json("Unauthorized");
    }
})

router.delete("/:id", async (req, res, next) => {
    const query = util.promisify(conn.query).bind(conn);
    const Token = req.cookies.Token;
    const user = await query("select * from user where Token = '" + Token + "'");
    if (user[0] && user[0].Type == "Supervisor") {
        next();
    }
    else {
        res.status(401).json("Unauthorized");
    }
})



module.exports =router;