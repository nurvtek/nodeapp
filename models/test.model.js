module.exports = (sequelize, Sequelize) => {
    const Test = sequelize.define("test", {
      identifica: {
        type: Sequelize.STRING
      },
      tipo: {
        type: Sequelize.STRING
      },
      titulo: {
        type: Sequelize.STRING
      },
      file: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.STRING
      },
      create_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: new Date()
      }
    });
    return Test;
  };