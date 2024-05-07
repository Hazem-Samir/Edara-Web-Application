
// ====================== Initialization ======================
const mysql = require('mysql2');




const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST|| 'localhost',
    user     : process.env.MYSQL_USER||'admin',
    password : process.env.MYSQL_PASS || 'admin',
    database : process.env.MYSQL_DB||'edara',
    port: process.env.MYSQL_PORT || '3306'
})
// ====================== Connect To SQL Server ======================
setTimeout(()=>{
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});},30000)

module.exports = connection;