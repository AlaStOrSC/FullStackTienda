const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/login', userController.loginUser);
router.get('/verify-token', verifyToken);
router.post('/logout', userController.logoutUser);

router.get('/', verifyToken(['admin', 'superadmin']), userController.getUserController); 
router.get('/:id', verifyToken(['superadmin']), userController.getUserById);
router.post('/', verifyToken(['superadmin']), userController.createUser); 
router.put('/:id', verifyToken(['superadmin']), userController.updateUser); 
router.delete('/:id', verifyToken(['superadmin']), userController.deleteUser); 



module.exports = router;