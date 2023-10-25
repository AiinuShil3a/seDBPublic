const {Sequelize} = require("sequelize");
const dbConfig = require("../config/db.config.js");

//Create sequelize instanct ต้นแบบพิมพ์เขียว
const sequelize = new Sequelize(dbConfig.DB , dbConfig.USER , dbConfig.PASSWORD,{
    host: dbConfig.HOST,
    dialect:"postgres",
    dialectOptions: {
        ssl: {
            require : true,
            rejectUnauthorized: false
        }
    }
})

//Test Connect DB
async function testConnection(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
 testConnection();
 module.exports = sequelize;
