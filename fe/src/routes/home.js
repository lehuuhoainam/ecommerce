/* eslint-disable no-restricted-globals */
import axios from "common/axios"
import Swal from "sweetalert2"
import { useState, useEffect, useMemo } from "react"
import {
  Card,
  Button,
  Badge,
  Row,
  Col,
  OverlayTrigger,
  Popover,
} from "react-bootstrap"
import API from "common/api"
import { useSelector, useDispatch } from "react-redux"
import { addToCart, setCart } from "store/homeSlice"
import Cart from "components/Cart"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const user = useSelector((state) => state.home.user)
  const cart = useSelector((state) => state.home.cart)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [data, setData] = useState([])
  const [isShowCart, setIsShowCart] = useState(false)

  useEffect(() => {
    axios
      .get(API.product)
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          text: JSON.stringify(error.response.data),
        })
      })
  }, [])

  useEffect(() => {
    if (user) {
      axios
        .get(API.cart, { params: { userId: user.id } })
        .then((response) => {
          dispatch(setCart(response.data))
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            text: JSON.stringify(error.response.data),
          })
        })
    }
  }, [user])

  const memoizedValue = useMemo(
    () =>
      cart?.reduce((total, item) => {
        return total + item.quantity
      }, 0),
    [cart]
  )

  const onAddToCart = (productId) => {
    axios
      .post(API.cart, { userId: user.id, productId })
      .then((response) => {
        Swal.fire({
          icon: "success",
          text: "Added to cart",
        })
        dispatch(addToCart(response.data))
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          text: JSON.stringify(error.response.data),
        })
      })
  }

  const onCloseCart = () => {
    setIsShowCart(false)
  }

  const Logout = () => {
    document.cookie = "access_token = ''"
    location.reload()
  }

  return (
    <>
      <div className="d-flex justify-content-end">
        <i
          className="bi bi-cart"
          style={{ fontSize: "2rem" }}
          onClick={() => setIsShowCart(true)}
        ></i>
        <Badge pill bg="danger" style={{ height: "20px", marginRight: "20px" }}>
          {memoizedValue}
        </Badge>

        <OverlayTrigger
          trigger={["click"]}
          key={"bottom"}
          placement={"bottom"}
          overlay={
            <Popover id={`popover-positioned-${"bottom"}`}>
              <Popover.Header as="h3">{user?.user_name}</Popover.Header>
              <Popover.Body>
                {/* not yet author */}
                <Button
                  className="mb-2"
                  onClick={() => navigate("/admin/product")}
                >
                  Add product (admin)
                </Button>
                <Button onClick={() => Logout()}>Logout</Button>
              </Popover.Body>
            </Popover>
          }
        >
          <i className="bi bi-person-circle" style={{ fontSize: "2rem" }}></i>
        </OverlayTrigger>
      </div>
      <Row md={3}>
        {data.map((item, index) => (
          <Col key={index} className="my-2">
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" height={"299px"} src={item.img} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {item.description}
                </Card.Subtitle>
                <Card.Text>
                  <Badge bg="success">{`$${item.price}`}</Badge>
                </Card.Text>
                <div className="d-flex justify-content-end">
                  <Button
                    variant="primary"
                    onClick={() => onAddToCart(item.idproduct)}
                  >
                    Add to cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Cart show={isShowCart} onClose={onCloseCart} />
    </>
  )
}

export default Home
