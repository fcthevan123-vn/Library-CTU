import React from "react";
import { Badge, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./ProductPreview.css";
function ProductPreview({ _id, category, name, pictures, author }) {
  return (
    <LinkContainer
      to={`/product/${_id}`}
      style={{ cursor: "pointer", width: "13rem", margin: "10px" }}
      className="m-4 item-book"
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
          <Card.Title className="fs-16 text-long">{name}</Card.Title>
          <Card.Title className="fs-14 text-description">
            Tác giả :{author}
          </Card.Title>

          <Badge bg="warning">{category}</Badge>
        </Card.Body>
        {/* <hr style={{ margin: "none" }}></hr> */}
        <div className=" mb-3 view-more-product">
          <button type="button" class="btn-preview-product">
            Xem chi tiết
          </button>
        </div>
      </Card>
    </LinkContainer>
  );
}

export default ProductPreview;
