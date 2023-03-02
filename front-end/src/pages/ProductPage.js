import axios from "../axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import {
  Container,
  Row,
  Col,
  Badge,
  ButtonGroup,
  Form,
  Button,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import SimilarProduct from "../components/SimilarProduct";
import "./ProductPage.css";
import { LinkContainer } from "react-router-bootstrap";
import { useAddToCartMutation } from "../services/appApi";
import ToastMessage from "../components/ToastMessage";

function ProductPage() {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState(null);
  const [addToCart, { isSuccess }] = useAddToCartMutation();

  const handleDragStart = (e) => e.preventDefault();
  useEffect(() => {
    axios.get(`/products/${id}`).then(({ data }) => {
      setProduct(data.product);
      setSimilar(data.similar);
    });
  }, [id]);

  if (!product) {
    return <Loading />;
  }
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
  };

  const images = product.pictures.map((picture) => (
    <img
      className="product__carousel--image"
      src={picture.url}
      onDragStart={handleDragStart}
    />
  ));

  let similarProducts = [];
  if (similar) {
    similarProducts = similar.map((product, idx) => (
      <div className="item" data-value={idx}>
        <SimilarProduct {...product} />
      </div>
    ));
  }

  return (
    <Container className="pt-4" style={{ position: "relative" }}>
      <Row>
        <Col lg={6}>
          <AliceCarousel
            mouseTracking
            items={images}
            controlsStrategy="alternate"
          />
        </Col>
        <Col lg={6} className="pt-4">
          <h1>{product.name}</h1>
          <p>
            <Badge bg="primary">{product.category}</Badge>
          </p>
          <p className="product__price">
            <strong>Tác giả: </strong> {product.author}
          </p>
          <p style={{ textAlign: "justify" }} className="py-2">
            <strong>Tóm tắt về sách: </strong> {product.description}
          </p>
          <p style={{ textAlign: "justify" }} className="py-2">
            <strong>Số trang: </strong> {product.totalPage}
          </p>
          <p style={{ textAlign: "justify" }} className="py-2">
            <strong>Nhà xuất bản: </strong> {product.publisher}
          </p>
          <p style={{ textAlign: "justify" }} className="py-2">
            <strong>Số lượng còn lại: </strong> {product.quantity}
          </p>
          {/* if user */}
          {user && !user.isAdmin && product.quantity > 0 ? (
            <ButtonGroup style={{ width: "90%" }}>
              <Button
                variant="warning"
                className="w-25"
                size="md"
                onClick={() =>
                  addToCart({
                    userId: user._id,
                    productId: id,
                    author: product.author,
                    image: product.pictures[0].url,
                  })
                }
              >
                Thêm vào cặp sách
              </Button>
            </ButtonGroup>
          ) : product.quantity === "0" ? (
            <ButtonGroup style={{ width: "90%" }}>
              <ButtonGroup style={{ width: "90%" }}>
                <Button variant="danger" className="w-25" size="md" disabled>
                  Sách này đã hết
                </Button>
              </ButtonGroup>
            </ButtonGroup>
          ) : (
            ""
          )}

          {/* if not user */}
          {!user && (
            <Badge pill bg="warning" className="not_user-badge">
              Hãy đăng nhập để mượn sách ngay
            </Badge>
          )}

          {/* if admin */}
          {user && user.isAdmin && (
            <LinkContainer to={`/product/${product._id}/edit`}>
              <Button variant="warning" size="lg">
                Sửa thông tin về sách
              </Button>
            </LinkContainer>
          )}
          {isSuccess && (
            <ToastMessage
              bg="info"
              title="Đã thêm vào cặp"
              body={`${product.name} đã được thêm vào cặp sách của bạn`}
            />
          )}
        </Col>
      </Row>
      <div className="my-4">
        <h2>Các sách tương tự</h2>
        <div className="d-flex justify-content-center align-items-center flex-wrap">
          <AliceCarousel
            mouseTracking
            items={similarProducts}
            responsive={responsive}
            controlsStrategy="alternate"
          />
        </div>
      </div>
    </Container>
  );
}

export default ProductPage;
