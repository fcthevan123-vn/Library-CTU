import React from "react";
import { Badge, Card } from "react-bootstrap";
import LinkContainer from "react-router-bootstrap/LinkContainer";

function SimilarProduct({ _id, name, category, pictures }) {
  return (
    <LinkContainer
      to={`/product/${_id}`}
      style={{
        cursor: "pointer",
        width: "13rem",
        margin: "10px",
      }}
    >
      <Card style={{ width: "20rem", margin: "10px" }}>
        <Card.Img
          variant="top"
          className="product-preview-img"
          src={pictures[0].url}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title className="fs-16 text-long">{name}</Card.Title>
          <Badge bg="warning">{category}</Badge>
        </Card.Body>
      </Card>
    </LinkContainer>
  );
}

export default SimilarProduct;
