//this is the database and it helps the pernttodo database to connect with index.js
// connect db to server
const {Pool}=require('pg');

const pool =new Pool({
    user:'postgres',
    password:'Diamond@14',
    host:'localhost',
    port:5432,
    database:'perntodo'
})
module.exports = pool;