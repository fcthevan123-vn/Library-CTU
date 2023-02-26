import React, { useEffect, useState } from "react";
import { Alert, Col, Container, Form, Row, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateProductMutation } from "../services/appApi";
import axios from "../axios";
import "./NewProduct.css";

function EditProductPage() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [totalPage, setTotalPage] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imgToRemove, setImgToRemove] = useState(null);
  const navigate = useNavigate();
  const [updateProduct, { isError, error, isLoading, isSuccess }] =
    useUpdateProductMutation();

  useEffect(() => {
    axios
      .get("/products/" + id)
      .then(({ data }) => {
        const product = data.product;
        setName(product.name);
        setAuthor(product.author);
        setDescription(product.description);
        setQuantity(product.quantity);
        setCategory(product.category);
        setImages(product.pictures);
        setPublisher(product.publisher);
        setTotalPage(product.totalPage);
      })
      .catch((e) => console.log(e));
  }, [id]);

  function handleRemoveImg(imgObj) {
    setImgToRemove(imgObj.public_id);
    axios
      .delete(`/images/${imgObj.public_id}/`)
      .then((res) => {
        setImgToRemove(null);
        setImages((prev) =>
          prev.filter((img) => img.public_id !== imgObj.public_id)
        );
      })
      .catch((e) => console.log(e));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !name ||
      !description ||
      !totalPage ||
      !publisher ||
      !author ||
      !quantity ||
      !category ||
      !images.length
    ) {
      return alert("Hãy nhập đầy đủ các trường");
    }
    updateProduct({
      id,
      name,
      description,
      totalPage,
      publisher,
      author,
      quantity,
      category,
      images,
    }).then(({ data }) => {
      if (data.length > 0) {
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    });
  }

  function showWidget() {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "your-cloudname",
        uploadPreset: "your-preset",
      },
      (error, result) => {
        if (!error && result.event === "success") {
          setImages((prev) => [
            ...prev,
            { url: result.info.url, public_id: result.info.public_id },
          ]);
        }
      }
    );
    widget.open();
  }

  return (
    <Container>
      <Row>
        <Col md={6} className="new-product__form--container">
          <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <h1 className="mt-4">Sửa thông tin về sách</h1>
            {isSuccess && <Alert variant="success">Cập nhật thành công</Alert>}
            {isError && <Alert variant="danger">{error.data}</Alert>}
            <Form.Group className="mb-3">
              <Form.Label>Tên sách</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên sách muốn sửa"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tên tác giả</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Tên tác giả muốn sửa"
                value={author}
                required
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mô tả về sách</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Mô tả về sách"
                style={{ height: "100px" }}
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nhà xuất bản</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Nhập tên nhà xuất bản muốn sửa"
                value={publisher}
                required
                onChange={(e) => setPublisher(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Số trang</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Nhập số trang muốn sửa"
                value={totalPage}
                required
                onChange={(e) => setTotalPage(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Số lượng còn lại</Form.Label>
              <Form.Control
                type="number"
                placeholder="Số lượng"
                value={quantity}
                required
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              onChange={(e) => setCategory(e.target.value)}
            >
              <Form.Label>Sửa danh mục</Form.Label>
              <Form.Select value={category}>
                <option disabled selected>
                  -- Chọn danh mục sách --
                </option>
                <option value="văn học">Văn học</option>
                <option value="kinh tế">Kinh tế</option>
                <option value="thiếu nhi">Thiếu nhi</option>
                <option value="ngoại ngữ">Ngoại ngữ</option>
                <option value="lịch sử">Lịch sử</option>
                <option value="khác">Khác</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Button type="button" onClick={showWidget}>
                Thêm hình ảnh
              </Button>
              <div className="images-preview-container">
                {images.map((image) => (
                  <div className="image-preview">
                    <img src={image.url} />
                    {imgToRemove != image.public_id && (
                      <i
                        className="fa fa-times-circle"
                        onClick={() => handleRemoveImg(image)}
                      ></i>
                    )}
                  </div>
                ))}
              </div>
            </Form.Group>

            <Form.Group>
              <Button
                type="submit"
                disabled={isLoading || isSuccess}
                className="mb-5"
              >
                Chỉnh sửa sách ngay
              </Button>
            </Form.Group>
          </Form>
        </Col>
        <Col md={6} className="edit-product__image--container"></Col>
      </Row>
    </Container>
  );
}

export default EditProductPage;
