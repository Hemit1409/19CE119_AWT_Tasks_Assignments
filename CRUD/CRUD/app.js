const express =require('express');
const connection=require('./Database/DBconfig.js');//exported from seperate file.
require('dotenv').config();

const app=express();
const PORT=process.env.PORT || 3000;

//Home Route
app.get("/",(req,res)=>{
    res.send("<h1>Hello There! </h1>")
})

// Route to create db.
app.get("/db-create", (req,res)=>{
    const dbquery="CREATE DATABASE IF NOT EXISTS dbUniversity";

    connection.query(dbquery,(err,result)=>{
        if(err) throw err;
        console.log("Database created successfully",result)
    })
    res.send("<h1>Route to create db.</h1>")
});


//Route to create Table.
app.get("/db-create-table", (req,res)=>{


    //studentinfo table
    const studentinfo=`CREATE TABLE IF NOT EXISTS tblStudentInfo(
        studentID varchar(10) NOT NULL,
        fname varchar(50) NOT NULL,
        lname varchar(50) NOT NULL,
        mobileNo varchar(15) NOT NULL,
        PRIMARY KEY (studentID))`

        const facultyinfo=`CREATE TABLE IF NOT EXISTS tblFacultyInfo(
            facultyID varchar(10) NOT NULL,
            fname varchar(50) NOT NULL,
            lname varchar(50) NOT NULL,
            mobileNo varchar(15) NOT NULL,
            PRIMARY KEY (facultyID))`

        // SHOW DATABASES => List the available DB from MySql server
        
    connection.query("USE dbUniversity",(err,result)=>{ // "Select Database"
        if(err) throw err;
        connection.query(studentinfo,(err,result)=>{
            if(err) throw err;
            console.log("Student Table created successfully",result)
        });

        connection.query(facultyinfo,(err,result)=>{
            if(err) throw err;
            console.log("Faculty Table created successfully",result)
        });
    });
    res.send("<h1>Route to create Table. </h1>")
});

//Route to insert data

app.get("/db-insert", (req,res)=>{
    const dbInsert1=`INSERT INTO tblStudentInfo
    (studentID,fname,lname,mobileNo)
    VALUES ('102','Hemit','Rana','123456789'),
    ('103','Khushi','Rana','123456789'),
    ('104','Himani','patel','123456789'),
    ('105','Bhavya','Amin','123456789')`;

    const dbInsert2=`INSERT INTO tblFacultyInfo
    (facultyID,fname,lname,mobileNo)
    VALUES ('201','Mrugendra','Rahevar','123456789'),
    ('202','Martin','Parmar','123456789')`;

    connection.query("USE dbUniversity",(err,result)=>{
        if(err) throw err;

        connection.query(dbInsert1,(err,result)=>{
            if(err) throw err;
            console.log(`Total affected ROWS in tblStudentInfo: ${result['affectedRows']}`)
            })

        connection.query(dbInsert2,(err,result)=>{
            if(err) throw err;
            console.log(`Total affected ROWS in tblFacultyInfo: ${result['affectedRows']}`)
            })
    });
    res.send("<h1>Route to insert data </h1>")
});

//Route to update Data.
app.get("/db-update",(req,res)=>{
    const db1=`UPDATE tblStudentInfo SET fname = 'Dipen' WHERE studentID = '102'`;
    const db2=`UPDATE tblFacultyInfo SET mobileNo = '987654321' WHERE facultyID = '201'`;

    connection.query("USE dbUniversity",(err,result)=>{
        if(err) throw err;
            connection.query(db1,(err,result)=>{
                if(err) throw err;
                
                console.log(`Total affected ROWS in tblStudentInfo: ${result['affectedRows']}`)
                console.log(result);
            })

            connection.query(db2,(err,result)=>{
                if(err) throw err;
                
                console.log(`Total affected ROWS in tblFacultyInfo: ${result['affectedRows']}`)
                console.log(result);
            })
    })
    res.send("<h1>Route to update Data. </h1>")
})

//Route to display data
app.get("/db-display", (req,res)=>{
    const db1=`SELECT * from tblStudentInfo`;
    const db2=`SELECT * from tblFacultyInfo`;

    connection.query("USE dbUniversity",(err,result)=>{
        if(err) throw err;
            connection.query(db1,(err,result)=>{
                if(err) throw err;
                
                console.log("Inserted Data in tblStudentInfo is:\n");
                console.log(result);
            })

            connection.query(db2,(err,result)=>{
                if(err) throw err;
                
                console.log("Inserted Data in tblFacultyInfo is:\n");
                console.log(result);
            })
    })
    res.send("<h1>Route to display data </h1>")
});

//Route to Delete Data
app.get("/db-delete",(req,res)=>{
    const db1=`DELETE FROM tblStudentInfo WHERE studentID = '102'`;
    const db2=`DELETE FROM tblFacultyInfo WHERE facultyID = '201'`;

    connection.query("USE dbUniversity",(err,result)=>{
        if(err) throw err;
            connection.query(db1,(err,result)=>{
                if(err) throw err;
                
                console.log(`Total affected ROWS in tblStudentInfo: ${result['affectedRows']}`)
                console.log(result);
            })

            connection.query(db2,(err,result)=>{
                if(err) throw err;
                
                console.log(`Total affected ROWS in tblFacultyInfo: ${result['affectedRows']}`)
                console.log(result);
            })
    })
    res.send("<h1>Route to Delete Data </h1>")
})

app.listen(PORT,()=>{
    console.log(`Server is running on port number ${PORT}`)
})