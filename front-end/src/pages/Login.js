import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../services/appApi";
import ToastMessage from "../components/ToastMessage";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isError, isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();
  function handleLogin(e) {
    e.preventDefault();
    login({ email, password });
    setTimeout(() => {
      navigate("/all-book");
    }, 3000);
  }
  return (
    <Container>
      <Row>
        <Col md={6} className="login__form--container">
          <Form style={{ width: "100%" }} onSubmit={handleLogin}>
            <h1>Đăng nhập vào tài khoản của bạn</h1>
            {isError && <Alert variant="danger">{error.data}</Alert>}
            {!isError && (
              <ToastMessage
                space="mt-5 me-2"
                bg="light"
                title="Đăng xuất"
                body="Bạn đã đăng xuất thành công"
              ></ToastMessage>
            )}

            <Form.Group className="my-3">
              <Form.Label className="d-flex fs-5">Email:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Nhập email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-3">
              <Form.Label className="d-flex fs-5">Mật khẩu: </Form.Label>
              <Form.Control
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Button type="submit" disabled={isLoading} className="w-25 my-3">
                Đăng nhập
              </Button>
            </Form.Group>
            <p>
              Bạn không có tài khoản? <Link to="/signup">Đăng ký ngay</Link>
            </p>
          </Form>
        </Col>
        <Col md={6} className="login__image--container"></Col>
      </Row>
    </Container>
  );
}

export default Login;
