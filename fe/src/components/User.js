import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import styles from "styles/user.module.css"

const User = ({ onSubmit, submitText, secondBtnText, onSecondBtnClick }) => {
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (username && password) {
      onSubmit({ username, password })
    }
  }

  return (
    <div className="d-flex justify-content-center">
      <Form className={styles.form} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Username</Form.Label>
          <Form.Control
            isInvalid={username === ""}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a Username
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            isInvalid={password === ""}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a Password
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" className="me-3">
          {submitText}
        </Button>
        {secondBtnText && (
          <Button variant="success" onClick={onSecondBtnClick}>{secondBtnText}</Button>
        )}
      </Form>
    </div>
  )
}

export default User
