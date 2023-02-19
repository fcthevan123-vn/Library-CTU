import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import categories from "../categories";
import "./ListCategory.css";
function ListCategory() {
  return (
    <Container>
      <Row>
        {categories.map((category) => (
          <LinkContainer to={`/category/${category.name.toLocaleLowerCase()}`}>
            <Col md={4}>
              <div
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.img})`,
                  gap: "10px",
                }}
                className="category-tile img-background"
              >
                {category.name}
              </div>
            </Col>
          </LinkContainer>
        ))}
      </Row>
    </Container>
  );
}

export default ListCategory;
