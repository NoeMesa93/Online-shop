const User = require('../models/users_models');
const bcrypt = require('bcryptjs');
const { createToken } = require('../routes/utils/helpers');

// Hash encripta, compare compara las password normal y la encriptada

const registrerUser = async (req, res, next) => {
    try {
        // Encriptamos la password
        req.body.password = await bcrypt.hash(req.body.password, 10); // Hay que pasarle si o si el numero para la seguridad de la encriptacion
        // Insertamos el documento
        const user = await User.create(req.body);
        res.json(user);

    } catch (error) {
        next(error)
    }
}


const loginUser = async (req, res, next) => {
    // En el body tenemos email y password
    // Preguntamos si está el email en la BD
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(401).json({ message: 'No existe el email y/o contraseña' })
    }
    // Coinciden las password? 
    const samePasswords = await bcrypt.compare(password, user.password); // Comparamos la contraseña que nos viene del body con la contraseña que obtenemos del ususario (arriba)
    if (!samePasswords) {
        return res.status(401).json({ message: 'No existe el email y/o contraseña' })
    }
    res.json({
        message: '👌',
        token: createToken(user)
    })
}

const addProductCart = async (req, res, next) => {
    const { productId } = req.params;
    req.user.cart.push(productId); // Añadimos el producto que recibimos por parámetros(elId) modificando el usuario
    await req.user.save(); // Los cambios que hayamos hecho sobre ese objeto los guardamos en la base de datos.
    res.json(req.user)
}


const getProfile = (req, res, next) => {
    res.json(req.user);
}

module.exports = {
    registrerUser,
    loginUser,
    addProductCart,
    getProfile
}