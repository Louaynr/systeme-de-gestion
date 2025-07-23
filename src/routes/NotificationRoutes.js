const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { auth, authorize } = require('../middlewares/auth');   

router.post('/', auth, authorize(['employe', 'admin']), notificationController.createNotification);

router.get('/', auth, authorize(['employe', 'admin']), notificationController.getAllNotifications);

router.get('/:id', auth, authorize(['employe', 'admin']), notificationController.getNotificationById);

router.put('/:id', auth, authorize(['employe', 'admin']), notificationController.updateNotification);

router.delete('/:id', auth, authorize(['employe', 'admin']), notificationController.deleteNotification);

module.exports = router;