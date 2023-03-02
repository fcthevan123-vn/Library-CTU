import React, { useState } from "react";
import { Alert, Button, Col, Form, Row, Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../services/appApi";
import "./CheckOutForm.css";
function CheckoutForm() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [createOrder, { isLoading, isError, isSuccess }] =
    useCreateOrderMutation();
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [returnDate, setReturnDate] = useState("");

  function handlePay(e) {
    e.preventDefault();
    createOrder({
      userId: user._id,
      cart: user.cart,
      address,
      phone,
      returnDate,
      ship: true,
    }).then(({ data }) => {
      console.log(data);
      setTimeout(() => {
        // navigate("/orders");
      }, 1000);
    });
  }

  return (
    <Col className="cart-payment-container">
      <Form onSubmit={handlePay}>
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
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
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
          <Form.Group className="mb-3">
            <Form.Label>Địa chỉ</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập địa chỉ"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
        </Row>
        <Row>
          <Badge pill bg="warning" text="dark" className="badge-ship">
            Bạn sẽ phải trả 20.000VND cho phí vận chuyển.
          </Badge>
        </Row>
        <Button className="mt-3 rounded-pill" type="submit">
          Mượn sách ngay
        </Button>
      </Form>
    </Col>
  );
}

export default CheckoutForm;
