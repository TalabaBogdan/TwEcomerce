var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '996yq339',
    database: 'nokia'
});
conn.connect(function(err) {
    if (err) throw err;
});
module.exports = conn;