import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  UilBookOpen,
  UilFacebook,
  UilYoutube,
  UilTwitter,
} from "@iconscout/react-unicons";

import "./Footer.css";
function Footer() {
  return (
    <Container
      fluid
      className="bg-primary text-white py-3 footer-container"
      style={{
        fontSize: "13px",
      }}
    >
      <Row>
        <Col>
          <UilBookOpen className="me-2"></UilBookOpen> Thư viện Trường Đại Học
          Cần Thơ
        </Col>
        <Col xs={4}></Col>
        <Col>
          <a
            href="https://www.facebook.com/trungtamhoclieuctu"
            className="text-white"
            target="_blank"
          >
            <UilFacebook></UilFacebook>
          </a>
          <a
            href="https://twitter.com/cantholrc"
            className="text-white mx-3"
            target="_blank"
          >
            <UilYoutube></UilYoutube>
          </a>
          <a
            href="https://www.youtube.com/channel/UCYB49UASSpMfLe89NLeAvlQ?view_as=subscriber"
            className="text-white"
            target="_blank"
          >
            <UilTwitter></UilTwitter>
          </a>
        </Col>
      </Row>
      <Row>
        <Col>Khu II - Đường 3/2 - Q.Ninh Kiều - TP.Cần Thơ </Col>
        <Col xs={4}></Col>
        <Col>Make by Lai The Van - B2014805</Col>
      </Row>
    </Container>
  );
}

export default Footer;
