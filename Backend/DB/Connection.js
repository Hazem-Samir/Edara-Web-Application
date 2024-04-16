
// ====================== Initialization ======================
const mysql = require('mysql2');




process.env.MYSQL_DB
const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST|| '172.23.0.1"',
    user     : process.env.MYSQL_USER||'root',
    password : process.env.MYSQL_PASS || 'root',
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
});},14000)

module.exports = connection;