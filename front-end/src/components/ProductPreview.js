import React from "react";
import { Badge, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./ProductPreview.css";
function ProductPreview({
  _id,
  category,
  name,
  pictures,
  description,
  author,
}) {
  return (
    <LinkContainer
      to={`/product/${_id}`}
      style={{ cursor: "pointer", width: "13rem", margin: "10px" }}
      className="shadow-sm  bg-body-tertiary rounded"
    >
      <Card style={{ width: "20rem", margin: "10px" }}>
        <div className="img-wrapper">
          <Card.Img
            variant="top"
            className="product-preview-img"
            src={pictures[0].url}
            style={{ height: "200px", objectFit: "cover" }}
          />
        </div>

        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Title className="fs-6">Tác giả :{author}</Card.Title>

          <Badge bg="warning" text="dark">
            {category}
          </Badge>
        </Card.Body>
        {/* <hr style={{ margin: "none" }}></hr> */}
        <div className="d-flex justify-content-center align-items-center mb-3">
          <Button variant="primary" className="btn-sm w-50 ">
            Xem chi tiết
          </Button>
        </div>
      </Card>
    </LinkContainer>
  );
}

export default ProductPreview;
