import axios from "common/axios"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import User from "components/User"
import API from "common/api"

const Register = () => {
  const navigate = useNavigate()

  const login = () => {
    navigate("/login")
  }

  const onSubmit = (data) => {
    const { username, password } = data
    axios
      .post(API.user, {
        username,
        password,
      })
      .then((response) => {
        Swal.fire({
          icon: "success",
          text: "success",
        })
      })
      .catch((error) => {
        if (error.response.status === 400) {
          Swal.fire({
            icon: "error",
            text: "user already exists",
          })
        }
      })
  }

  return (
    <>
      <h2 className="text-center">Register</h2>
      <User
        submitText="Register"
        secondBtnText="Login"
        onSubmit={onSubmit}
        onSecondBtnClick={login}
      />
    </>
  )
}

export default Register
