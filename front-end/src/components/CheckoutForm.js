import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../services/appApi";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [createOrder, { isLoading, isError, isSuccess }] =
    useCreateOrderMutation();
  const [classCode, setClassCode] = useState("");
  const [address, setAddress] = useState("");
  const [paying, setPaying] = useState(false);

  //   async function handlePay(e) {
  //     e.preventDefault();
  //     if (!stripe || !elements || user.cart.count <= 0) return;
  //     setPaying(true);
  //     const { client_secret } = await fetch(
  //       "http://localhost:8080/create-payment",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer ",
  //         },
  //         body: JSON.stringify({ amount: user.cart.total }),
  //       }
  //     ).then((res) => res.json());
  //     const { paymentIntent } = await stripe.confirmCardPayment(client_secret, {
  //       payment_method: {
  //         card: elements.getElement(CardElement),
  //       },
  //     });
  //     setPaying(false);

  //     if (paymentIntent) {
  //       createOrder({ userId: user._id, cart: user.cart, address, country }).then(
  //         (res) => {
  //           if (!isLoading && !isError) {
  //             setAlertMessage(`Payment ${paymentIntent.status}`);
  //             setTimeout(() => {
  //               // navigate("/orders");
  //             }, 3000);
  //           }
  //         }
  //       );
  //     }
  //   }

  function handlePay(e) {
    e.preventDefault();
    createOrder({ userId: user._id, cart: user.cart, address, classCode }).then(
      ({ data }) => {
        if (data.length > 0) {
          setTimeout(() => {
            navigate("/orders");
          }, 3000);
        }
      }
    );
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
          <Col md={7}>
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
          </Col>
          <Col md={5}>
            <Form.Group className="mb-3">
              <Form.Label>Mã lớp</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập mã lớp"
                value={classCode}
                onChange={(e) => setClassCode(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Button className="mt-3" type="submit">
          Mượn sách ngay
        </Button>
      </Form>
    </Col>
  );
}

export default CheckoutForm;