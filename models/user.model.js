module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      nombre: {
        type: Sequelize.STRING
      },
      login: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      tipo: {
        type: Sequelize.STRING
      },
      create_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: new Date()
      }
    });
    return User;
  };