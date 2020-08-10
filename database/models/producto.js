module.exports = function (sequelize, dataTypes){

    let alias = "productos";

    let cols = {
        producto_id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: dataTypes.STRING,
            allowNull: false
        },
        descripcion: {
            type: dataTypes.STRING,
            allowNull: false
        },
        modelo: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        precio: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        tamano:{
            type: dataTypes.INTEGER
        },
        descuento:{
            type: dataTypes.INTEGER
        },
        categoria:{
            type: dataTypes.STRING
        },
        seccion_id:{
            type: dataTypes.INTEGER
        },
        usuario_id:{
            type: dataTypes.INTEGER
        },
        imagen:{
            type: dataTypes.INTEGER
        },
        marca:{
            type: dataTypes.INTEGER
        }
    }

    let config = {
        tableName: "productos",
        timestamps: false
    };

    const Producto = sequelize.define(alias, cols, config);

    Producto.associate = function(models){
        Producto.belongsToMany(models.carritos, {
            as: 'carritos',
            through: "producto_carrito",
            foreignKey: "producto_id",
            otherKey: "carrito_id",
            timestamps: false
        });

        Producto.belongsTo(models.secciones, {
            as: "secciones",
            foreignKey: "seccion_id",
            timestamps: false,
        })
    }

    return Producto;
}