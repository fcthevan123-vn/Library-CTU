import axios from "../axios";
import React, { useRef, useState } from "react";
import {
  Navbar,
  Button,
  Nav,
  NavDropdown,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout, resetNotifications } from "../features/userSlice";
import { UilBookOpen } from "@iconscout/react-unicons";
import { UilBook } from "@iconscout/react-unicons";
import "./Navigation.css";

function Navigation() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const bellRef = useRef(null);
  const notificationRef = useRef(null);
  const [bellPos, setBellPos] = useState({});

  function handleLogout() {
    dispatch(logout());
  }
  const unreadNotifications = user?.notifications?.reduce((acc, current) => {
    if (current.status === "unread") return acc + 1;
    return acc;
  }, 0);

  function handleToggleNotifications() {
    const position = bellRef.current.getBoundingClientRect();
    setBellPos(position);
    notificationRef.current.style.display =
      notificationRef.current.style.display === "block" ? "none" : "block";
    dispatch(resetNotifications());
    if (unreadNotifications > 0)
      axios.post(`/users/${user._id}/updateNotifications`);
  }

  return (
    <Navbar
      bg="light"
      className="shadow-sm  bg-body-tertiary rounded"
      expand="lg"
    >
      <Container style={{ display: "block" }}>
        <Row>
          <Col
            md={3}
            className="d-flex justify-content-center align-items-center home-group"
          >
            <UilBookOpen className="me-2"></UilBookOpen>
            <>
              <LinkContainer to="/">
                <Navbar.Brand className="">CTU's Library</Navbar.Brand>
              </LinkContainer>
            </>
          </Col>
          <Col
            md={6}
            className="d-flex justify-content-center align-items-center list-button"
          >
            <>
              <LinkContainer to="/all-book" className="btn-hover">
                <Nav.Link className="">Thư viện sách</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/all-book" className="btn-hover">
                <Nav.Link className="">Thư viện sách</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/all-book" className="btn-hover">
                <Nav.Link className="">Thư viện sách</Nav.Link>
              </LinkContainer>
            </>
          </Col>
          <Col
            md={3}
            className="d-flex justify-content-center align-items-center "
          >
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto d-flex justify-content-center align-items-center">
                {/* if no user */}
                {!user && (
                  <>
                    <LinkContainer to="/login">
                      <Button
                        size="sm"
                        variant="primary"
                        className="login-btn rounded-pill me-2"
                      >
                        Đăng nhập
                      </Button>
                    </LinkContainer>
                    <LinkContainer to="/signup">
                      <Button
                        size="sm"
                        variant="primary"
                        className="login-btn rounded-pill"
                      >
                        Đăng ký
                      </Button>
                    </LinkContainer>
                  </>
                )}
                {user && !user.isAdmin && (
                  <LinkContainer to="/cart">
                    <Nav.Link>
                      <UilBook style={{ opacity: "0.6" }}></UilBook>
                      {user?.cart.count > 0 && (
                        <span className="badge badge-warning" id="cartcount">
                          {user.cart.count}
                        </span>
                      )}
                    </Nav.Link>
                  </LinkContainer>
                )}

                {/* if user */}
                {user && (
                  <>
                    <NavDropdown
                      title={`${user.email}`}
                      id="basic-nav-dropdown"
                    >
                      {user.isAdmin && (
                        <>
                          <LinkContainer to="/admin">
                            <NavDropdown.Item>Bảng điểu khiển</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to="/new-product">
                            <NavDropdown.Item>Tạo sách mới</NavDropdown.Item>
                          </LinkContainer>
                        </>
                      )}
                      {!user.isAdmin && (
                        <>
                          <LinkContainer to="/cart">
                            <NavDropdown.Item>Cặp Sách</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to="/orders">
                            <NavDropdown.Item>Orders</NavDropdown.Item>
                          </LinkContainer>
                        </>
                      )}

                      <NavDropdown.Divider />
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={handleLogout}
                        className="logout-btn"
                      >
                        Đăng xuất
                      </Button>
                    </NavDropdown>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default Navigation;
