const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes CRUD
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/register', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
