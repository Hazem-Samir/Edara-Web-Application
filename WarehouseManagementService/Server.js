// ====================== Initialization ======================
const express = require('express');
const cors = require('cors');
const server = express();
const cookieParser = require('cookie-parser');
const PORT = 4000;

// ====================== Global Middleware ======================
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

server.use(cors(corsOptions));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static('Uploads'));


// ====================== Modules ======================
const warehouses = require('./Routes/Admin/Warehouses');

server.use(cookieParser());

// ====================== Routes ======================
server.use("/warehouses", warehouses);


// ====================== Start Server ======================
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
