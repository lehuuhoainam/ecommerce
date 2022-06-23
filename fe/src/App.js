/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from "react-router-dom"
import { Container } from "react-bootstrap"
import { useEffect } from "react"
import API from "common/api"
import axios from "common/axios"
import { useSelector, useDispatch } from "react-redux"
import { setUser } from "store/homeSlice"
import "bootstrap-icons/font/bootstrap-icons.css"

function App() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.home.user)

  useEffect(() => {
    if (!user) {
      axios.get(API.userByToken).then((response) => {
        dispatch(setUser(response.data))
      })
    }
  }, [])

  return (
    <div className="App">
      <Container>
        <Outlet />
      </Container>
    </div>
  )
}

export default App
