const fs =require('fs');
var path = require('path');
let db = require("../database/models");
const seccion = require('../database/models/seccion');
const item_category = "Productos";

const productosController = {
    listadoProductos: function (req,res){

        db.productos.findAll({attributes: ['producto_id','nombre', 'descripcion', 'seccion_id', 'categoria'],  include: [{association: "secciones"}]})
            .then(function(productos){
                for(let i = 0; i < productos.length; i++){
                productos[i].setDataValue("detalle", "http://localhost:3000/api/productos"+ productos[i].producto_id )
            }

                let respuesta = {
                    meta: {
                        link: 'http://localhost:3030/api/productos',
                        estado: "OK",
                        item_category: item_category,
                        item_count: productos.length
                    },
                    data: {
                        productos
                    }
                }
                res.status(200).json(respuesta);
            })
            .catch(function(e){
                console.log(e)
            });
    },
    seccion: function(req, res){
        db.secciones.findAll({attributes: ['seccion_id', 'nombre']})
        .then(function(secciones){
            for(let i = 0; i < secciones.length; i++){
            secciones[i].setDataValue("detalle", "http://localhost:3000/api/productos/seccion" )
        }

            let respuesta = {
                meta: {
                    link: 'http://localhost:3030/api/productos/seccion',
                    estado: "OK",
                    item_category: item_category,
                    item_count: secciones.length
                },
                data: {
                    secciones
                }
            }
            res.status(200).json(respuesta);
        })
        .catch(function(e){
            console.log(e)
        });
    },
    detalleProducto: function(req,res){
        db.productos.findByPk(req.params.producto_id)

            .then(function(producto){
                let respuesta = {
                    meta: {
                        link: 'http://localhost:3030/api/productos/'+producto.producto_id,
                        imagen: 'http://localhost:3030/api/productos/'+producto.producto_id+ '/' +producto.imagen,
                        estado: "OK",
                        item_category: item_category,
                    },
                    data: {
                        producto
                    }
                }
                res.status(200).json(respuesta)
            })
            .catch(function(e){
                console.log(e)
            });
},

}

module.exports = productosController;