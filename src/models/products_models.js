// Crear un esquema de mongoose. Me traigo las herramientas para generar el sqema

const { Schema, model } = require('mongoose')

const productSchema = new Schema({
    //Definición de los ddiferentes campos que van a formar parte de nuestro modelo.
    //Todos los documentos que insertemos en la colección products tendrá este esquema
    name: String, // Como valor le pones el tipo.
    description: String,
    price: Number,
    department: String,
    stock: Number,
    available: Boolean,
    owner: { // Podremos almacenar el id del usuario que ha creado el producto. Relación 1:N
        type: Schema.Types.ObjectId, ref: 'user'
    }
}, { // Segundo un objeto con propiedades/opciones
    timestamps: true,
    versionKey: false
} // Versionkey: Para poder hacer un versionado de nuestros documentos. Suele salir true.
);

// No hay que exportar el schema para importarlo luego, hay que exportar el modelo.
// Las variables que se guardan clases o modelos se las guarda en mayúscula.
const Product = model('product', productSchema) // Estamos creando el modelo, la asociación entre el esquema que hemos generado y la colección en la base de datos (product)
module.exports = Product;