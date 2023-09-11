const mysql = require('mysql');
const dbConfig = require("../config/db.config");
//Create a connecttion to DB
const connecttion = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    paaword: dbConfig.PASSWORD,
    database:dbConfig.DB
});

//Open Mysql
connecttion.connect(
    (error)=>{
        if(error) throw error;
        console.log("Seccessfully");
    }
);

module.exports = connecttion;