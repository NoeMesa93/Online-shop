const router = require('express').Router();

const { getAll, createProduct, updateProduct, deleteProduct, getById, getByDepartment, getAvailable, getByPriceRange } = require("../../controllers/products_controllers");
const { checkToken } = require('../utils/middleware');


router.get('/', getAll)
router.get('/dpt/:department', getByDepartment)
router.get('/available', getAvailable)
router.get('/price', getByPriceRange)
router.get('/:productId', getById)

router.post('/', checkToken, createProduct)
router.put('/:productId', checkToken, updateProduct)
router.delete('/:productId', checkToken, deleteProduct)

module.exports = router;