import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Signup.css";
import { useSignupMutation } from "../services/appApi";

function Signup() {
  const [email, setEmail] = useState("");
  const [studentID, setStudentID] = useState("");

  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [signup, { error, isLoading, isError }] = useSignupMutation();

  function handleSignup(e) {
    e.preventDefault();
    signup({ name, email, password, studentID });
  }

  return (
    <Container>
      <Row>
        <Col md={6} className="signup__form--container">
          <Form style={{ width: "100%" }} onSubmit={handleSignup}>
            <h1>Đăng ký tài khoản ngay</h1>
            {isError && <Alert variant="danger">{error.data}</Alert>}
            <Form.Group>
              <Form.Label className="d-flex fs-5">Họ và tên: </Form.Label>
              <Form.Control
                type="text"
                placeholder="Họ và tên của bạn"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="d-flex fs-5 my-3">
                Mã số sinh viên:{" "}
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Mã số sinh viên của bạn"
                value={studentID}
                required
                onChange={(e) => setStudentID(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="my-3">
              <Form.Label className="d-flex fs-5">Địa chỉ email: </Form.Label>
              <Form.Control
                type="email"
                placeholder="Nhập email của bạn"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="my-3">
              <Form.Label className="d-flex fs-5">Nhập mật khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-25 rounded-pill"
              >
                Đăng ký ngay
              </Button>
            </Form.Group>
            <p className="mt-3 text-center">
              Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>{" "}
            </p>
          </Form>
        </Col>
        <Col md={6} className="signup__image--container"></Col>
      </Row>
    </Container>
  );
}

export default Signup;
