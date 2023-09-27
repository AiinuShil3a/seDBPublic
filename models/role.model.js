module.exports =(sequelize,Sequelize) => {
    const Role = sequelize.define("roles" , {
        id: {
            type: Sequelize.STRING, // string ควรพิมพ์ตัวฬหญ่
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
        },
    });
    return Role;
}