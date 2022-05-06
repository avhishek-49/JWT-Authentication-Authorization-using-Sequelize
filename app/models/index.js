const {Sequelize, DataTypes} = require("sequelize");
const dbSequelize = new Sequelize(
    'jwt','root','1234',{
    host : 'localhost',
    dialect : 'mysql',
    
});

dbSequelize.authenticate()
.then(()=>{
    console.log("Connected");
})
.catch((err)=>{
    console.log('error :' +err);
});


const db = {};
db.Sequelize = Sequelize;
db.dbSequelize = dbSequelize;


db.dbSequelize.sync({force : false})
.then(() => {
    console.log("Sync");
});
db.User = require("./user.model")(dbSequelize, DataTypes);

module.exports = db;