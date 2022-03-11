import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { register, reset } from "../features/auth/authSlice"

import { toast } from "react-toastify"
import { FaUser } from "react-icons/fa"
import Spinner from "../components/Spinner"

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  })

  const { email, name, password, passwordConfirm } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    //redirect when logged in
    if (isSuccess || user) {
      navigate("/")
    }

    dispatch(reset())
  }, [isError, isSuccess, user, message, navigate, dispatch])

  const handleOnChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (password !== passwordConfirm) {
      toast.error("Passwords not match")
    } else {
      const userData = {
        name,
        email,
        password,
      }

      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={handleOnChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={handleOnChange}
              placeholder="Enter your e-mail"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="passwordConfirm"
              name="passwordConfirm"
              value={passwordConfirm}
              onChange={handleOnChange}
              placeholder="Confirm your password"
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}
