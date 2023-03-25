import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import "./Footer.css";
function Footer() {
  return (
    <Container fluid className="bg-primary text-white py-3 footer-container">
      <Container>
        <Row>
          <Col className="info-col ">
            <p className="fs-14">
              <i class="fa-solid fa-book-open me-1"></i> Thư viện Trường Đại Học
              Cần Thơ
            </p>
            <p className="fs-14">
              <i class="fa-solid fa-phone me-1"></i> 0292-383-1565
            </p>
            <p className="fs-14">
              <i class="fa-solid fa-envelope me-1"></i> tthl@ctu.edu.vn
            </p>
            <p className="fs-14">
              <i class="fa-solid fa-location-dot me-1"></i> Khu II - Đường 3/2 -
              Q.Ninh Kiều - TP.Cần Thơ
            </p>
          </Col>
          <Col className="social-media-col">
            <p className="fs-14">
              <i class="fa-solid fa-hashtag"></i> Social Media
            </p>
            <p>
              <a
                href="https://www.facebook.com/trungtamhoclieuctu"
                className="fs-14 text-white"
              >
                <i class="fa-brands fa-facebook me-1"></i> Facebook
              </a>
            </p>
            <p>
              <a
                href="https://twitter.com/cantholrc"
                className="text-white fs-14"
              >
                <i class="fa-brands fa-twitter me-1"></i> Twitter
              </a>
            </p>
            <p>
              <a
                href="https://twitter.com/cantholrc"
                className="text-white fs-14"
              >
                <i class="fa-brands fa-youtube me-1"></i> Youtube
              </a>
            </p>
          </Col>
          <Col className="aboutme-col">
            <p className="fs-14">
              About me <i class="fa-solid fa-circle-question ms-1"></i>
            </p>
            <p className="fs-14">
              Lại Thế Văn <i class="fa-solid fa-signature ms-1"></i>
            </p>
            <p className="fs-14">
              B2014805 <i class="fa-solid fa-id-card ms-1"></i>
            </p>
            <p className="fs-14">
              fcthevan123@gmail.com <i class="fa-solid fa-envelope ms-1"></i>
            </p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Footer;
