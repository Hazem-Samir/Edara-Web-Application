// ====================== Initialization ======================
const express = require('express');
const cors = require('cors');
const server = express();
const PORT = 4000;
const session = require('express-session');
const key = 'Network-Security-Project-Senior';
// ====================== Global Middleware ======================
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
server.use(session({
    secret: key,
    saveUninitialized: false,        //doesn't create new session when moving among web pages.
    resave: false,                  //doesn't increament old session payload to the new session payload.
    cookie: {maxAge: 60*60*10000}  //expire date : 1hour 
}));
//
server.use(cors(corsOptions));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static('Uploads'));


// ====================== Modules ======================
const supervisors = require('./Routes/Admin/Supervisors');
const warehouses = require('./Routes/Admin/Warehouses');
const AdminrequestsHistory = require('./Routes/Admin/Requests History');
const SupervisorrequestsHistory = require('./Routes/Supervisor/Requests History');
const ProductRequest = require('./Routes/Supervisor/My Products');
const products = require('./Routes/Admin/Products');
const requests = require('./Routes/Admin/Requests');
const Authentication = require('./Routes/Authentication/Authentication')
const cookieParser = require('cookie-parser');
server.use(cookieParser());
// ====================== Routes ======================
server.use("/Authentication", Authentication);
server.use("/supervisors", supervisors);
server.use("/warehouses", warehouses);
server.use("/products", products);
server.use("/requests-history", AdminrequestsHistory);
server.use("/my-requests-history", SupervisorrequestsHistory);
server.use("/my-products", ProductRequest);
server.use("/requests", requests);

// ====================== Start Server ======================
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
