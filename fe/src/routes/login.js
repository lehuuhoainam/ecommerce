/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"

import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import User from "components/User"
import { useSelector, useDispatch } from "react-redux"
import { loginThunk } from "store/homeSlice"

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.home.user)

  const regsiter = () => {
    navigate("/register")
  }

  useEffect(() => {
    if (user) {
      if (user.status === 400 || user.status === 500) {
        Swal.fire({
          icon: "error",
          text: "Wrong username or password",
        })
      } else {
        Swal.fire({
          icon: "success",
          text: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/")
          }
        })
      }
    }
  }, [user])

  const onSubmit = (data) => {
    const { username, password } = data
    dispatch(loginThunk({ username, password }))
  }

  return (
    <>
      <h2 className="text-center">Login</h2>
      <User
        submitText="Login"
        secondBtnText="Register"
        onSubmit={onSubmit}
        onSecondBtnClick={regsiter}
      />
    </>
  )
}

export default Login
