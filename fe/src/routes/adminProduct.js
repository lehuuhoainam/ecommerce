import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import styles from "styles/admin.module.css"
import axios from "common/axios"
import Swal from "sweetalert2"
import API from "common/api"

// not yet author
const AdminProduct = () => {
  const [name, setName] = useState(null)
  const [description, setDescription] = useState(null)
  const [price, setPrice] = useState(null)
  const [img, setImg] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()
    axios
      .post(API.product, {
        name,
        description,
        img,
        price,
      })
      .then((response) => {
        Swal.fire({
          icon: "success",
          text: "success",
        })
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          text: JSON.stringify(error.response.data),
        })
      })
  }

  return (
    <div className="p-5">
      <h2>Add product</h2>
      <Form className={styles.form} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Name</Form.Label>
          <Form.Control
            isInvalid={name === ""}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a Name
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            isInvalid={description === ""}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a Description
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Image Url</Form.Label>
          <Form.Control
            isInvalid={img === ""}
            onChange={(e) => setImg(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a Img Url
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            isInvalid={price === ""}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a Price
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit">{"Submit"}</Button>
      </Form>
    </div>
  )
}
export default AdminProduct
