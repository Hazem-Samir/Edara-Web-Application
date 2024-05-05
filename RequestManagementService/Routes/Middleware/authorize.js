// ====================== Initialization ======================
const util = require("util");
const jwt = require('jsonwebtoken');
const { SuperVisorConnection } = require("../../DB/Connection");
const key = 'Network-Security-Project-Senior';
// router.use(cookieParser());






exports.adminAuthorize = async (req, res, next) => {
    const Token = req.cookies.Token;

    if ( Token)
        {
        const query = util.promisify(SuperVisorConnection.query).bind(SuperVisorConnection);
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
