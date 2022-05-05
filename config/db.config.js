  module.exports = {
      HOST: 'mysql',
      USER: 'userHXU',
      PASSWORD: 'oOQRyFonBdj3w0eD',
      DB: 'sampledb',
      dialect: 'mysql',
      pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
      }
  };