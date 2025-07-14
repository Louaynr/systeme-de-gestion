const express = require("express")
const Notification = require("../models/Notification")
const { auth } = require("../middleware/auth")

const router = express.Router()

// Get user notifications
router.get("/", auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, unreadOnly } = req.query
    const query = { utilisateur: req.user._id }

    if (unreadOnly === "true") {
      query.statutNotification = "envoyée"
    }

    const notifications = await Notification.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ dateEnvoi: -1 })

    const total = await Notification.countDocuments(query)

    res.json({
      notifications,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Mark notification as read
router.put("/:id/read", auth, async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id)

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" })
    }

    if (notification.utilisateur.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" })
    }

    notification.statutNotification = "lue"
    await notification.save()

    res.json({
      message: "Notification marked as read",
      notification,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Mark all notifications as read
router.put("/mark-all-read", auth, async (req, res) => {
  try {
    await Notification.updateMany(
      {
        utilisateur: req.user._id,
        statutNotification: "envoyée",
      },
      { statutNotification: "lue" },
    )

    res.json({ message: "All notifications marked as read" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
