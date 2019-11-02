const maysql = require('mysql');
let pool = maysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'bookstore',
    connectionLimit: 15
});
module.exports=pool;