import axios from "../axios";
import React, { useRef, useState } from "react";
import ToastMessage from "./ToastMessage";
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
import { logout } from "../features/userSlice";
import { UilBookOpen } from "@iconscout/react-unicons";
import { UilBook } from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleLogout() {
    dispatch(logout());
    setTimeout(() => {
      navigate("/login");
    });
  }

  return (
    <>
      <Navbar
        bg="light"
        className="shadow-sm  bg-body-tertiary rounded"
        expand="lg"
      >
        {user && (
          <ToastMessage
            space="mt-5 me-2"
            bg="light"
            title="Đăng nhập"
            body="Bạn đã đăng nhập thành công, hãy mượn sách ngay!"
          ></ToastMessage>
        )}
        <Container style={{ display: "block" }}>
          <Row>
            <Col
              md={3}
              className="d-flex justify-content-center align-items-center "
            >
              <div className="home-group">
                <UilBookOpen className="me-2"></UilBookOpen>
                <LinkContainer to="/">
                  <Navbar.Brand className="">CTU's Library</Navbar.Brand>
                </LinkContainer>
              </div>
              <LinkContainer to="/all-book" className="btn-hover">
                <Nav.Link className="">Thư viện sách</Nav.Link>
              </LinkContainer>
            </Col>
            <Col md={6} className=""></Col>
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
                              <NavDropdown.Item>
                                Bảng điểu khiển
                              </NavDropdown.Item>
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
    </>
  );
}

export default Navigation;
