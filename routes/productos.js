var express = require('express');
var router = express.Router();
var productosController = require('../controllers/productosController');

/* GET LISTADO DE PRODUCTOS */
router.get('/', productosController.listadoProductos);

/* GET LISTADO DE PRODUCTOS POR CATEGORIA */
router.get('/seccion', productosController.seccion);

/* GET detalle del producto*/
router.get('/:producto_id', productosController.detalleProducto);

module.exports = router;
