module.exports = (Sequelize, DataTypes) => {
    const User = Sequelize.define("users", {
        name : DataTypes.STRING,
        email : DataTypes.STRING,
        password : DataTypes.STRING
        
    },{
        timestamps : false
    });
    return User;
};