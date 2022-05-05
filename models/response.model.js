module.exports = (sequelize, Sequelize) => {
    const Response = sequelize.define("response", {
      idproc: {
        type: Sequelize.STRING
      },
      codigo: {
        type: Sequelize.STRING
      },
      level: {
        type: Sequelize.STRING
      },
      sublevel: {
        type: Sequelize.STRING
      },
      codpre: {
        type: Sequelize.STRING
      },
      puntuacion: {
        type: Sequelize.STRING
      },
      fortaleza: {
        type: Sequelize.STRING
      },
      oportunidad: {
        type: Sequelize.STRING
      },
      deficiencia: {
        type: Sequelize.STRING
      },
      amenaza: {
        type: Sequelize.STRING
      },
      create_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: new Date()
      }
    });
    return Response;
  };