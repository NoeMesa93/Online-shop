const router = require('express').Router();
const { registrerUser, loginUser, addProductCart, getProfile } = require('../../controllers/users_controllers');
const { checkToken } = require('../../routes/utils/middleware')

router.get('/profile', checkToken, getProfile)
router.post('/register', registrerUser);
router.post('/login', loginUser)
router.put('/add/:productId', checkToken, addProductCart)


module.exports = router;