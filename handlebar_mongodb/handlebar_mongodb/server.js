const express=require("express");
const PORT=3000;
const app=express();
const handlebars=require("express-handlebars");

var mysql = require('mysql');
//connection
const connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'',
});

connection.connect((err)=>{
    if(err) throw err;
    console.log("Connected successfully to MySql server")
});

//create database
const dbquery="CREATE DATABASE IF NOT EXISTS Subject";

    connection.query(dbquery,(err,result)=>{
        if(err) throw err;
        console.log("Database created successfully",result)
    })
//create table 
    const dbtable=`CREATE TABLE IF NOT EXISTS subject(
        subjectCode varchar(10) NOT NULL,
        subjectName varchar(50) NOT NULL,
        instituteName varchar(50) NOT NULL,
        departmentName varchar(50) NOT NULL,
        semester varchar(1) NOT NULL,
        PRIMARY KEY (subjectCode))`

        // SHOW DATABASES => List the available DB from MySql server
        
    connection.query("USE Subject",(err,result)=>{ // "Select Database"
        if(err) throw err;
        connection.query(dbtable,(err,result)=>{
            if(err) throw err;
            console.log("Table created successfully",result)
        });
    });

    //middleware
app.use(express.static("public"));
app.use(express.urlencoded({extended:false}));



app.set('view engine', 'hbs');

app.engine("hbs",handlebars({
    layoutsDir:`${__dirname}/views/layouts`,
    extname:"hbs",
    defaultLayout:"index",
    partialsDir:`${__dirname}/views/partials`
}))


app.get("/",(req,res)=>{
    res.render("main");
});

app.get("/subject-form",(req,res)=>{
    res.render("form");


});

app.post("subject-form",(req,res)=>{

    res.redirect("/show-data")

});
app.post("/show-data",(req,res)=>{
    // console.log(req.body);

    var subjectCode = req.body.scode;
    var subjectName = req.body.sname;
    var instituteName = req.body.iname;
    var departmentName = req.body.dname;
    var semester=req.body.sem;
    
    var sql = `INSERT INTO subject (subjectCode, subjectName, instituteName, departmentName, semester) VALUES ("${subjectCode}", "${subjectName}", "${instituteName}", "${departmentName}","${semester}")`;
    connection.query(sql, function(err, result) {
        if (err) throw err;
        console.log('record inserted');
        
        res.render("showdata",{data:req.body});
    });

})

app.get("/stored-data",(req,res)=>{

    const dbInsert=`SELECT * from subject`;

    connection.query("USE Subject",(err,result)=>{
        if(err) throw err;
    connection.query(dbInsert,(err,result)=>{
        if(err) throw err;
        
        console.log("Inserted Data is");
        console.log(result);
        res.send(result);
    })
})
})

app.use( (req,res,next)=>{
    res.render("404");
})


app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`);
})