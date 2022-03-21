import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getTicket, reset, closeTicket } from "../features/tickets/ticketSlice"

import { useParams, useNavigate } from "react-router-dom"

import BackButton from "../components/BackButton"
import Spinner from "../components/Spinner"
import { toast } from "react-toastify"

export default function TicketDetail() {
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tickets
  )

  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { ticketId } = useParams()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(getTicket(ticketId))
  }, [dispatch, isError, message, ticketId])

  const handleCloseClick = () => {
    dispatch(closeTicket(ticketId))
    toast.success("Ticket closed")
    navigate("/tickets")
  }

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Something went wrong</h3>
  }

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString("pt-PT")}
        </h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>

      {ticket.status !== "closed" && (
        <button className="btn btn-block btn-danger" onClick={handleCloseClick}>
          Close ticket
        </button>
      )}
    </div>
  )
}
