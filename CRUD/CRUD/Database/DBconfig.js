const mysql=require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    
});

connection.connect((err)=>{
    if(err) throw err;
    console.log("Connected successfully to MySql server")
});

module.exports=connection;