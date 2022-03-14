const express = require("express")
const router = express.Router()

const { protect } = require("../middleware/authMiddleware")

const {
  createTicket,
  getTickets,
  getTicket,
  deleteTicket,
  updateTicket,
} = require("../controllers/ticketController")

router.route("/").get(protect, getTickets).post(protect, createTicket)

router
  .route("/:id")
  .get(protect, getTicket)
  .delete(protect, deleteTicket)
  .put(protect, updateTicket)

module.exports = router
