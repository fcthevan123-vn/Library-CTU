import React, { useState, useEffect } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import "./ToastMessage.css";

function ToastMessage({ bg, title, body, autohide }) {
  const [show, setShow] = useState(true);
  return (
    <ToastContainer
      position="bottom-right"
      className="toast-container position-fixed"
    >
      <Toast
        bg={bg}
        onClose={() => setShow(false)}
        show={show}
        delay={2000}
        autohide={autohide}
      >
        <Toast.Header className="bg-primary text-white-custom">
          <strong className="me-auto ">{title}</strong>
          <small>now</small>
        </Toast.Header>
        <Toast.Body>{body}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default ToastMessage;
