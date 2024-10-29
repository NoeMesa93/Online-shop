const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    // Me interesa que cuando se cree un nuevo usuario se le asigne un valor por defecto. Primero ponemos el tipo que será, en este caso string, y en default el que entrará por defecto
    role: {
        type: String,
        default: 'regular'
    },
    cart: { // Queremos insertar muchos productos,como si fuera un carro donde un ususario va metiendo los productos.
        type: [{ type: Schema.Types.ObjectId, ref: 'product' }] //Si pongo corchetes podré pasarle muchas referencias a la tabla products(id)
    }
},
    {
        timestamps: true, versionKey: false
    });

const User = model('user', userSchema);

module.exports = User;