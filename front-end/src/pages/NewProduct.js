import React, { useState } from "react";
import { Alert, Col, Container, Form, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../services/appApi";
import axios from "../axios";
import "./NewProduct.css";
import Footer from "../components/Footer";
import ToastMessage from "../components/ToastMessage";

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
  localStorage.removeItem("toastShowed");

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
        }, 2000);
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
    <div>
      <div className="editProductPage-wrapper pb-4">
        <Container>
          <Row>
            <Col md={6} className="new-product__form--container">
              <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
                <h1 className="mt-4 fs-30">Thêm sách mới ngay</h1>
                {isSuccess && (
                  <ToastMessage
                    bg="info"
                    title="Thêm sách mới thành công"
                    body={`Sách đã được thêm vào thư viện`}
                    autohide={true}
                  />
                )}

                {isError && <Alert variant="danger">{error.data}</Alert>}
                <Form.Group className="mb-3">
                  <Form.Label className="float-start fs-16">
                    Tên sách:{" "}
                  </Form.Label>
                  <Form.Control
                    className="fs-14"
                    type="text"
                    placeholder="Nhập tên sách ở đây"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="float-start fs-16">
                    Tên tác giả:
                  </Form.Label>
                  <Form.Control
                    className="fs-14"
                    type="text"
                    placeholder="Nhập tên tác giả"
                    value={author}
                    required
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="float-start fs-16">
                    Mô tả về sách:
                  </Form.Label>
                  <Form.Control
                    className="fs-14"
                    as="textarea"
                    placeholder="Mô tả"
                    style={{ height: "100px" }}
                    value={description}
                    required
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="float-start fs-16">
                    Nhà xuất bản:
                  </Form.Label>
                  <Form.Control
                    className="fs-14"
                    type="text"
                    placeholder="Nhập nhà xuất bản"
                    value={publisher}
                    required
                    onChange={(e) => setPublisher(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="float-start fs-16">
                    Số trang:
                  </Form.Label>
                  <Form.Control
                    className="fs-14"
                    type="text"
                    placeholder="Nhập số trang"
                    value={totalPage}
                    required
                    onChange={(e) => setTotalPage(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="float-start fs-16">
                    Số lượng sách đang có:
                  </Form.Label>
                  <Form.Control
                    className="fs-14"
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
                  <Form.Label className="float-start fs-16">
                    Danh mục:
                  </Form.Label>
                  <Form.Select className="fs-14">
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
                  <Button
                    type="button"
                    onClick={showWidget}
                    className="text-white fs-16"
                  >
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
                  <Button
                    type="submit"
                    disabled={isLoading || isSuccess}
                    className="text-white fs-16"
                  >
                    Thêm sách
                  </Button>
                </Form.Group>
              </Form>
            </Col>
            <Col md={1}></Col>
            <Col md={5} className="col-img">
              <div className="new-product__image--container"></div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default NewProduct;
