// ====================== Initialization ======================
const conn = require('../../DB/Connection')
const util = require("util");
const jwt = require('jsonwebtoken');
const key = 'Network-Security-Project-Senior';
// router.use(cookieParser());



//Authguard
//authentication guarding for admin routes and supervisor routes

exports.adminAuthorize = async (req, res, next) => {
    const Token = req.cookies.Token;
    if (req.session.user && Token) {
        const query = util.promisify(conn.query).bind(conn);
        console.log(req.cookies);

        //verify jwt , verify(token, key, data if exists or error if unauthorize)
        req.user = jwt.verify(Token, key, (err, decoded) => {
            if (err) {
                // Handle invalid token
                console.log(err);
                res.status(401).json("Unauthorized");
            } else {
                // data returned(decoded-decrypted)
                return decoded;
            }
        });
        const user = await query("select * from user where Token = '" + req.user.token + "'");
        if (user[0] && user[0].Type === "Admin") {
            next();
        }
        else {
            res.status(401).json("Unauthorized");
        }
    } else {
        res.status(401).json("Unauthorized");
    }
}

exports.supervisorAuthorize = async (req, res, next) => {
    const Token = req.cookies.Token;
    if (req.session.user && Token) {
        const query = util.promisify(conn.query).bind(conn);
        // console.log(req.session);
        req.user = jwt.verify(Token, key, (err, decoded) => {
            if (err) {
                // Handle invalid token
                console.log(err);
                res.status(401).json("Unauthorized");
            } else {
                return decoded;
            }
        });
        const user = await query("select * from user where Token = '" + req.user.token + "'");
        if (user[0] && user[0].Type === "Supervisor") {
            next();
        }
        else {
            res.status(401).json("Unauthorized");
        }
    } else {
        res.status(401).json("Unauthorized");
    }
}
