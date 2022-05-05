const db = require("../models");
const Asocia = db.asocia;
const Op = db.Sequelize.Op;
// Crear y guardar un usuario
exports.create = (asocia) => {
    // Valida el requerimiento
    if (!asocia.nombre) {
        return {
          message: "El contenido no puede estar vacio!"
        };
      }
      // Crear un usuario
      const asociado = {
        nombre: asocia.nombre,
        apellido: asocia.login,
        password: asocia.password,
        tipo: asocia.tipo
      };
      // Guardar usuario en la bese de datos
      Asocia.create(asociado)
        .then(data => {
          return data;
        })
        .catch(err => {
          return {
            message: "Algunos errores acurrieron mientras se creaba el libro."
          };
         
        });
};
// Retrieve all Tutorials from the database.
exports.findAll = () => {
  //var condition = tipo ? { tipo: { [Op.like]: `%${tipo}%` } } : null;
  Asocia.findAll()
    .then(data => {
     // console.log(data);
     asociados = [];
      for (var i=0;i< data.length; i++)
      {
         asociados.push(data[i].dataValues);
       //  users[i].id = data[i].id;
       //  users[i].nombre = data[i].nombre;
       //  users[i].login = data[i].login;
       //  users[i].password = data[i].password;
       //  users[i].tipo = data[i].tipo;
      }
      console.log("MMs MMs Este es el valor de DATA ");
      console.log(asociados);

      console.log("FFs FFs Este es el valor de DATA ");
     //  return users;
      // res.send(data);
    })
     .catch(err => {
    //     return {
    //        message:
    //          err.message || "Algunos errores se presentaron tratando de recuperar la lista de usuarios."
    //      };
      res.status(500).send({
         message:
          err.message || "Algunos errores se presentaron tratando de recuperar la lista de usuarios."
       });
     });
  
};
// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.nombre;
  User.findByPk(nombre)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No se pudo encontrar el usuario nombre=${nombre}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error recuperando al usuario con nombre=" + nombre
      });
    });
  
};
// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  
};
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  
};
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};
// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  
};