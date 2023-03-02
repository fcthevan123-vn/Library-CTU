import React, { useState, useEffect } from "react";
import { Alert, Button, Col, Form, Row, Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../services/appApi";
import "./CheckOutForm.css";
function TakeBookDirect() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [createOrder, { isLoading, isError, isSuccess }] =
    useCreateOrderMutation();
  const [returnDate, setReturnDate] = useState("");
  const [takeBookDate, setTakeBookDate] = useState("");

  function handleRent() {
    console.log(returnDate, takeBookDate);
    createOrder({
      userId: user._id,
      cart: user.cart,
      returnDate: returnDate,
      takeBookDate: takeBookDate,
      ship: false,
    })
      .then(({ data }) => {
        console.log(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRent();
  };

  return (
    <Col className="cart-payment-container">
      <Form onSubmit={handleSubmit}>
        <Row>
          {alertMessage && <Alert>{alertMessage}</Alert>}
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Họ và tên - MSSV</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                value={`${user.name} - ${user.studentID}`}
                disabled
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email"
                value={user.email}
                disabled
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Ngày đến nhận sách</Form.Label>
              <Form.Control
                type="date"
                required
                onChange={(e) => setTakeBookDate(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Ngày dự kiến trả sách</Form.Label>
              <Form.Control
                type="date"
                required
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Badge pill bg="warning" text="dark" className="badge-ship">
            Lưu ý hãy đến nhận sách đúng với ngày bạn đã chọn.
          </Badge>
        </Row>
        <Button className="mt-3 rounded-pill" type="submit">
          Mượn sách ngay
        </Button>
      </Form>
    </Col>
  );
}

export default TakeBookDirect;
