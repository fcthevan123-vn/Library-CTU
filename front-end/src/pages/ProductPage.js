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
import Footer from "../components/Footer";
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
    <div className="product-page-wrapper">
      <Container
        className="product-page-container"
        style={{ position: "relative" }}
      >
        <Row>
          <Col lg={5} className="col-carousel">
            <AliceCarousel
              mouseTracking
              items={images}
              controlsStrategy="alternate"
            />
          </Col>
          <Col></Col>
          <Col lg={6} className="pt-4">
            <h4 className="fs-30">{product.name}</h4>
            <p>
              <Badge bg="warning">{product.category}</Badge>
            </p>
            <p className="product__price fs-14 text-description">
              <strong className="fs-16">Tác giả: </strong> {product.author}
            </p>
            <p style={{ textAlign: "justify" }} className="py-2 fs-14">
              <strong className="fs-16">Tóm tắt về sách: </strong>{" "}
              {product.description}
            </p>
            <p style={{ textAlign: "justify" }} className="py-2 fs-14">
              <strong className="fs-16">Số trang: </strong> {product.totalPage}
            </p>
            <p style={{ textAlign: "justify" }} className="py-2 fs-14">
              <strong className="fs-16">Nhà xuất bản: </strong>{" "}
              {product.publisher}
            </p>
            <p style={{ textAlign: "justify" }} className="py-2 fs-14">
              <strong className="fs-16">Số lượng còn lại: </strong>{" "}
              {product.quantity}
            </p>
            {/* if user */}
            {user && !user.isAdmin && product.quantity > 0 ? (
              <ButtonGroup>
                <Button
                  variant="primary"
                  className="fs-16 text-white-custom "
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
              <ButtonGroup>
                <ButtonGroup>
                  <Button
                    variant="danger"
                    className="fs-16 text-white-custom"
                    size="md"
                    disabled
                  >
                    Sách này đã hết
                  </Button>
                </ButtonGroup>
              </ButtonGroup>
            ) : (
              ""
            )}

            {/* if not user */}
            {!user && (
              <LinkContainer to={`/login`}>
                <Badge className="fs-16 btn-productpage" size="md" bg="primary">
                  Đăng nhập ngay để mượn sách ngay{" "}
                  <i class="fa-solid fa-right-to-bracket fa-shake ms-2"></i>
                </Badge>
              </LinkContainer>
            )}

            {/* if admin */}
            {user && user.isAdmin && (
              <LinkContainer to={`/product/${product._id}/edit`}>
                <Button
                  variant="primary"
                  size="md"
                  className="fs-16 text-white"
                >
                  Sửa thông tin về sách
                </Button>
              </LinkContainer>
            )}
            {isSuccess && (
              <ToastMessage
                bg="secondary"
                title="Đã thêm vào cặp"
                body={`${product.name} đã được thêm vào cặp sách của bạn`}
              />
            )}
          </Col>
        </Row>
        <div className="my-5">
          <h2 className="fs-22">Các sách tương tự</h2>
          <div className="d-flex justify-content-center align-items-center flex-wrap fs-14">
            <AliceCarousel
              mouseTracking
              items={similarProducts}
              responsive={responsive}
              controlsStrategy="alternate"
            />
          </div>
        </div>
      </Container>
      <Footer></Footer>
    </div>
  );
}

export default ProductPage;
