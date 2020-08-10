const fs =require('fs');
var path = require('path');
let db = require("../database/models");
const item_category = "Usuarios";

const usuariosController = {
    listadoUsuarios: function (req,res){
            db.usuarios.findAll({attributes: ['usuario_id','nombre', 'email']})
               .then(function(usuarios){
               for(let i = 0; i < usuarios.length; i++){
                   usuarios[i].setDataValue("detalle", "http://localhost:3030/api/usuarios/" + usuarios[i].usuario_id)
               }
   
               let respuesta = {
                   meta: {
                       link: 'http://localhost:3030/api/usuarios',
                       estado: "OK",
                       item_category: item_category,
                       item_count: usuarios.length
                   },
                   data: {
                       usuarios
                   }
               }
   
               res.status(200).json(respuesta)
           })
           .catch(function(e){
               console.log(e)
           })
    },
    detalleUsuario: function(req,res){
        db.usuarios.findByPk(req.params.usuario_id, {attributes: ['usuario_id','nombre', 'apellido', 'email', 'avatar']})
            .then(function(usuario){

                let respuesta = {
                    meta: {
                        link: 'http://localhost:3030/api/usuario/'+usuario.usuario_id,
                        imagen: 'http://localhost:3030/api/usuario/'+usuario.usuario_id+ '/' +usuario.avatar,
                        estado: "OK",
                        item_category: item_category,
                        item_id: usuario.usuario_id
                    },
                    data: {
                        usuario
                    }
                }

            res.status(200).json({respuesta})
            })
    }
}

module.exports = usuariosController;