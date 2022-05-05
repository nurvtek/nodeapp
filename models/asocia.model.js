module.exports = (sequelize, Sequelize) => {
    const Asocia = sequelize.define("asocia", {
      nombre: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      empresa: {
        type: Sequelize.STRING
      },
      telefono: {
        type: Sequelize.STRING
      },
      sector: {
        type: Sequelize.STRING
      },
      create_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: new Date()
      }
    });
    return Asocia;
  };