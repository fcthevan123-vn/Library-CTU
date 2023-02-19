import React from "react";
import { Container, Nav, Tab, Col, Row } from "react-bootstrap";
import ClientsAdminPage from "../components/ClientsAdminPage";
import DashboardProducts from "../components/DashboardProducts";
import OrdersAdminPage from "../components/OrdersAdminPage";
function AdminDashboard() {
  return (
    <Container className="mt-5">
      <Tab.Container defaultActiveKey="products">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item style={{ cursor: "pointer" }}>
                <Nav.Link eventKey="products">Tất cả sách</Nav.Link>
              </Nav.Item>
              <Nav.Item style={{ cursor: "pointer" }}>
                <Nav.Link eventKey="orders">Danh sách mượn sách</Nav.Link>
              </Nav.Item>
              <Nav.Item style={{ cursor: "pointer" }}>
                <Nav.Link eventKey="clients">Tất cả tài khoản</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="products">
                <DashboardProducts />
              </Tab.Pane>
              <Tab.Pane eventKey="orders">
                <OrdersAdminPage />
              </Tab.Pane>
              <Tab.Pane eventKey="clients">
                <ClientsAdminPage />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}

export default AdminDashboard;
