const router = require('express').Router();



router.use('/products', require('./api/products_routes'))
router.use('/users', require('./api/users_routes'))

module.exports = router;