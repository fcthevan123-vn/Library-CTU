import React, { useState } from "react";
import { Alert, Col, Container, Form, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../services/appApi";
import axios from "../axios";
import "./NewProduct.css";

function NewProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [publisher, setPublisher] = useState("");
  const [totalPage, setTotalPage] = useState("");
  const [images, setImages] = useState([]);
  const [author, setAuthor] = useState("");
  const [imgToRemove, setImgToRemove] = useState(null);
  const navigate = useNavigate();
  const [createProduct, { isError, error, isLoading, isSuccess }] =
    useCreateProductMutation();

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
      !author ||
      !publisher ||
      !totalPage ||
      !description ||
      !quantity ||
      !category ||
      !images.length
    ) {
      return alert("Hãy nhập hết các trường");
    }
    createProduct({
      name,
      author,
      description,
      publisher,
      totalPage,
      quantity,
      category,
      images,
    }).then(({ data }) => {
      console.log(data);
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
        cloudName: "dvvg4xwoy",
        uploadPreset: "dy26uoe1",
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
            <h1 className="mt-4">Thêm sách mới ngay</h1>
            {isSuccess && <Alert variant="success">Tạo thành công</Alert>}
            {isError && <Alert variant="danger">{error.data}</Alert>}
            <Form.Group className="mb-3">
              <Form.Label>Tên sách</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên sách ở đây"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tên tác giả</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên tác giả"
                value={author}
                required
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mô tả về sách</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Mô tả"
                style={{ height: "100px" }}
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nhà xuất bản</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập nhà xuất bản"
                value={publisher}
                required
                onChange={(e) => setPublisher(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Số trang</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập số trang"
                value={totalPage}
                required
                onChange={(e) => setTotalPage(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Số lượng sách đang có</Form.Label>
              <Form.Control
                type="number"
                placeholder="Nhập số lượng"
                value={quantity}
                required
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              onChange={(e) => setCategory(e.target.value)}
            >
              <Form.Label>Danh mục</Form.Label>
              <Form.Select>
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

            <Form.Group className="mt-5">
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

            <Form.Group className="mb-5">
              <Button type="submit" disabled={isLoading || isSuccess}>
                Thêm sách
              </Button>
            </Form.Group>
          </Form>
        </Col>
        <Col md={6} className="new-product__image--container"></Col>
      </Row>
    </Container>
  );
}

export default NewProduct;
