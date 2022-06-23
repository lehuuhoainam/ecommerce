import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from "App"
import Login from "./login"
import Register from "./register"
import Home from "./home"
import AdminProduct from "./adminProduct"

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="" element={<Home />} />
        <Route path="/admin/product" element={<AdminProduct />} />
      </Route>
    </Routes>
  </BrowserRouter>
)

export default Router
