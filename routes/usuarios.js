var express = require('express');
var router = express.Router();
var usuariosController = require('../controllers/usuariosController');

/* GET LISTADO DE USUARIO*/
router.get('/', usuariosController.listadoUsuarios);

/* Datos del ususario logueado*/
router.get('/:usuario_id', usuariosController.detalleUsuario);

module.exports = router;
