import React, { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import "./ToastMessage.css";

function ToastMessage({ bg, title, body, space }) {
  const [show, setShow] = useState(true);
  return (
    <ToastContainer
      position="bottom-right"
      className={`toast-container ${space ? space : ""}`}
    >
      <Toast
        bg={bg}
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">{title}</strong>
          <small>now</small>
        </Toast.Header>
        <Toast.Body>{body}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default ToastMessage;
