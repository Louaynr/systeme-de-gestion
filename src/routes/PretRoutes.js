const express = require("express")
const { createLoan, returnLoan, extendLoan, getUserLoans, getOverdueLoans } = require("../controllers/loanController")
const { auth, authorize } = require("../middleware/auth")
const { validateLoan } = require("../middleware/validation")

const router = express.Router()

router.post("/", auth, authorize("employe"), validateLoan, createLoan)
router.put("/:id/return", auth, authorize("employe"), returnLoan)
router.put("/:id/extend", auth, extendLoan)
router.get("/user/:userId?", auth, getUserLoans)
router.get("/overdue", auth, authorize("employe"), getOverdueLoans)

module.exports = router
