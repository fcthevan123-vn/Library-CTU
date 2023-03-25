import axios from "../axios";
import React, { useRef, useState } from "react";
import ToastMessage from "./ToastMessage";
import Login from "../pages/Login";
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
        bg="primary"
        className="bg-body-tertiary navbar navbar-wrapper"
        expand="lg"
      >
        {/* {user &&
          (user.isAdmin ? (
            <ToastMessage
              space="mt-5 me-2"
              bg="warning"
              title="Đăng nhập"
              body="Bạn đã đăng nhập với tư cách là admin, hãy cẩn thận với các thao tác của mình!"
            ></ToastMessage>
          ) : (
            <ToastMessage
              space="mt-5 me-2"
              bg="light"
              title="Đăng nhập"
              body="Bạn đã đăng nhập thành công, hãy mượn sách ngay!"
            ></ToastMessage>
          ))} */}
        <Container style={{ display: "block" }}>
          <Row>
            <Col
              md={3}
              className="d-flex justify-content-center align-items-center "
            >
              <div className="home-group">
                <UilBookOpen className="me-2 mb-1 text-white"></UilBookOpen>
                <LinkContainer to="/">
                  <Navbar.Brand className="fs-14 text-white-custom">
                    Trang chủ
                  </Navbar.Brand>
                </LinkContainer>
              </div>
              <LinkContainer to="/all-book" className="btn-hover">
                <Nav.Link className="fs-14 text-white-custom">
                  Thư viện sách
                </Nav.Link>
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
                          className="login-btn rounded-pill me-2 fs-14 text-white-custom"
                        >
                          Đăng nhập
                        </Button>
                      </LinkContainer>
                      <LinkContainer to="/signup">
                        <Button
                          size="sm"
                          variant="primary"
                          className="login-btn rounded-pill fs-14 text-white-custom"
                        >
                          Đăng ký
                        </Button>
                      </LinkContainer>
                    </>
                  )}
                  {user && !user.isAdmin && (
                    <LinkContainer to="/cart">
                      <Nav.Link>
                        <UilBook className="text-white icon-bag"></UilBook>
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
                        class="fs-14 text-white"
                      >
                        {user.isAdmin && (
                          <>
                            <LinkContainer to="/admin">
                              <NavDropdown.Item className="fs-14">
                                Bảng điểu khiển
                              </NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/new-product">
                              <NavDropdown.Item className="fs-14">
                                Tạo sách mới
                              </NavDropdown.Item>
                            </LinkContainer>
                          </>
                        )}
                        {!user.isAdmin && (
                          <>
                            <LinkContainer to="/cart">
                              <NavDropdown.Item className="fs-14">
                                Cặp Sách
                              </NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/orders">
                              <NavDropdown.Item className="fs-14">
                                Danh sách mượn sách
                              </NavDropdown.Item>
                            </LinkContainer>
                          </>
                        )}

                        <NavDropdown.Divider />
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={handleLogout}
                          className="logout-btn fs-14"
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
