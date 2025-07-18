const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const { auth, authorize } = require('../middlewares/auth');


// Public routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Protected routes (only admin can access)
router.post('/', auth, authorize('admin'), userController.createUser);
router.get('/', auth, authorize('admin'), userController.getAllUsers);
router.get('/:id', auth, authorize('admin'), userController.getUserById);
router.put('/:id', auth, authorize('admin'), userController.updateUser);
router.delete('/:id', auth, authorize('admin'), userController.deleteUser);

module.exports = router;
