const Product = require('../models/products_models')

const getAll = async (req, res, next) => {
    try {
        const products = await Product.find().populate('owner', 'username email');
        res.json(products);
    } catch (error) {
        next(error);
    }
}
// populate() especificamos que campo queremos desplegar a partir de un id, en este caso owner. Como segundo parametro nos deja especficar los campos que queremos visualizar.

const getById = async (req, res, next) => {
    const { productId } = req.params;
    try {
        const product = await Product.findById(productId);
        res.json(product)
    } catch (error) {
        next(error)
    }
}


const getByDepartment = async (req, res, next) => {
    const { department } = req.params;
    try {
        const productsDepartment = await Product.find({ department: department })
        // Para filtrar le pasamos un objeto con el campo del documento/tabla sobre el cual quiero hacer el filtro y después le pasamos el valor que queremos buscar.
        res.json(productsDepartment)
    } catch (error) {
        next(error)
    }
}


const getAvailable = async (req, res, next) => {
    try {
        const productos = await Product.find({ available: true, stock: { $gte: 10 } })
        // Devuelveme todos los productos que estén disponibles y a la clave a la que quiero aplicar el filtro, lo metemos en otro objeto y le ponemos: $gte (esto es mayor que)
        res.json(productos)
    } catch (error) {
        next(error);
    }
}


const getByPriceRange = async (req, res, next) => {
    try {
        const { min, max } = req.query;
        const products = await Product.find({ price: { $gte: min, $lte: max } })
        res.json(products)
    } catch (error) {
        next(error)
    }
}


const createProduct = async (req, res, next) => {
    // Antes de hacer la insercción, al body le digo que me de los datos de la persona autenticada.
    try {
        req.body.owner = req.user._id;
        const product = await Product.create(req.body); //Con create ejecutado sobre el modelo a trabajar creamos un documento. 
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
}

const updateProduct = async (req, res, next) => {
    const { productId } = req.params
    try {
        const product = await Product.findByIdAndUpdate(productId, req.body, { new: true });
        res.json(product)
    } catch (error) {
        next(error);
    }
}

const deleteProduct = async (req, res, next) => {
    const { productId } = req.params;
    try {
        const product = await Product.findByIdAndDelete(productId);
        res.json(product)
    } catch (error) {
        next(error);
    }
}


module.exports = {
    getAll,
    getById,
    getByDepartment,
    getAvailable,
    getByPriceRange,
    createProduct,
    updateProduct,
    deleteProduct
}