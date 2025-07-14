const express = require("express")
const Reservation = require("../models/Reservation")
const Copy = require("../models/Copy")
const { auth, authorize } = require("../middleware/auth")
const { validateReservation } = require("../middleware/validation")

const router = express.Router()

// Create reservation
router.post("/", auth, authorize("etudiant"), validateReservation, async (req, res) => {
  try {
    const { exemplaire } = req.body

    // Check if copy exists and is not available
    const copy = await Copy.findById(exemplaire)
    if (!copy) {
      return res.status(404).json({ message: "Copy not found" })
    }

    if (copy.statutExemplaire === "disponible") {
      return res.status(400).json({
        message: "Copy is available, no need to reserve",
      })
    }

    // Check if user already has a reservation for this copy
    const existingReservation = await Reservation.findOne({
      utilisateur: req.user._id,
      exemplaire,
      statutReservation: { $in: ["en attente", "confirmée"] },
    })

    if (existingReservation) {
      return res.status(400).json({
        message: "You already have a reservation for this copy",
      })
    }

    const reservation = new Reservation({
      utilisateur: req.user._id,
      exemplaire,
    })

    await reservation.save()
    await reservation.populate(["utilisateur", "exemplaire"])

    res.status(201).json({
      message: "Reservation created successfully",
      reservation,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Get user reservations
router.get("/my-reservations", auth, async (req, res) => {
  try {
    const reservations = await Reservation.find({
      utilisateur: req.user._id,
    })
      .populate(["exemplaire"])
      .populate({
        path: "exemplaire",
        populate: {
          path: "livre",
          model: "Book",
        },
      })
      .sort({ dateReservation: -1 })

    res.json(reservations)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Cancel reservation
router.put("/:id/cancel", auth, async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id)

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" })
    }

    // Check if user owns the reservation or is an employee
    if (reservation.utilisateur.toString() !== req.user._id.toString() && req.user.userType !== "employe") {
      return res.status(403).json({ message: "Access denied" })
    }

    reservation.statutReservation = "annulée"
    await reservation.save()

    res.json({
      message: "Reservation cancelled successfully",
      reservation,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
