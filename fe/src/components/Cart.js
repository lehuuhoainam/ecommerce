import { Modal, Button, Table } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import API from "common/api"
import axios from "common/axios"
import Swal from "sweetalert2"
import { setCart } from "store/homeSlice"

const Cart = ({ show, onClose }) => {
  const cart = useSelector((state) => state.home.cart)
  const user = useSelector((state) => state.home.user)
  const dispatch = useDispatch()

  const handleClose = () => {
    onClose()
  }

  const handleOrder = () => {
    handleClear()
  }

  const handleClear = () => {
    axios
      .delete(API.cart, {
        params: {
          userId: user.id,
        },
      })
      .then((response) => {
        dispatch(setCart(response.data))
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
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {cart?.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClear}>
          Clear
        </Button>
        <Button variant="primary" onClick={handleOrder}>
          Order
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Cart
