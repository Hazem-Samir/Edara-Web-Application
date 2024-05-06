
// ====================== Initialization ======================
const mysql = require('mysql2');




const SuperVisorConnection = mysql.createConnection({
    host: process.env.MYSQL_HOST_SUPERVISOR|| 'localhost',
    user     : process.env.MYSQL_USER||'root',
    password : process.env.MYSQL_PASS || '',
    database : process.env.MYSQL_DB_SUPERVISOR||'edara',
    port: process.env.MYSQL_PORT || '3306'
})
// ====================== Connect To SQL Server ======================
setTimeout(()=>{
SuperVisorConnection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + SuperVisorConnection.threadId);
});},14000)

const WarehouseConnection = mysql.createConnection({
    host: process.env.MYSQL_HOST_WAREHOUSE|| 'localhost',
    user     : process.env.MYSQL_USER||'root',
    password : process.env.MYSQL_PASS || '',
    database : process.env.MYSQL_DB_WAREHOUSE||'edara',
    port: process.env.MYSQL_PORT || '3306'
})
// ====================== Connect To SQL Server ======================
setTimeout(()=>{
WarehouseConnection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + WarehouseConnection.threadId);
});},14000)

