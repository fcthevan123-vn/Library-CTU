import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDeleteProductMutation } from "../services/appApi";
import "./DashboardProducts.css";
import Pagination from "./Pagination";
import ToastMessage from "./ToastMessage";

function DashboardProducts() {
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);

  const [deletProduct, { isLoading, isSuccess }] = useDeleteProductMutation();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [productShow, setProductShow] = useState([]);
  const [showToast, setShowToast] = useState(false);

  function handleShow(_id, userId) {
    setShow(true);
    setShowToast(false);
    for (let i = 0; i < products.length; i++) {
      if (products[i]._id === _id) {
        setProductShow(products[i]);
      }
    }
  }

  function handleDeleteProduct(id) {
    deletProduct({ product_id: id, user_id: user._id });
    setShow(false);
    setShowToast(true);
  }

  function emptyArray(arr) {
    if (arr.length === 0) {
      return true;
    }
    return false;
  }

  console.log(productShow);

  //  Row
  function TableRow({ pictures, _id, name, author, quantity }) {
    return (
      <tr className="fs-14">
        <td>
          <img
            src={pictures[0].url}
            className="dashboard-product-preview rounded shadow"
            alt="pictures 0"
          />
        </td>
        <td>{_id}</td>
        <td>{name}</td>
        <td>{author}</td>
        <td>{quantity}</td>
        <td>
          <div className="edit-wrapper d-flex flex-column justify-content-center ">
            <Button
              className="fs-14"
              size="sm"
              variant="danger"
              // onClick={() => handleDeleteProduct(_id, user._id)}
              onClick={() => handleShow(_id, user._id)}
              disabled={isLoading}
            >
              Xoá sách khỏi thư viện
            </Button>

            <Link
              to={`/product/${_id}/edit`}
              a
              className="btn btn-sm btn-primary mt-2 fs-14"
            >
              Chỉnh sửa sách
            </Link>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <>
      <Table striped bordered hover responsive>
        <thead className="fs-16">
          <tr>
            <th>Sách</th>
            <th>ID sách</th>
            <th>Tên sách</th>
            <th>Tác giả</th>
            <th>Số lượng còn lại</th>
            <th>Chỉnh sửa</th>
          </tr>
        </thead>
        <tbody>
          <Pagination
            data={products}
            RenderComponent={TableRow}
            pageLimit={1}
            dataLimit={5}
            tablePagination={true}
          />
        </tbody>
      </Table>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} className="pt-5">
        <Modal.Header closeButton>
          <Modal.Title className="fs-18">
            Bạn có chắc chắn xoá sách này ?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="fs-14">
          <div>
            {!emptyArray(productShow) && (
              <div className="order-details__container d-flex justify-content-around py-2">
                <img
                  src={productShow.pictures[0].url}
                  style={{
                    maxWidth: 100,
                    height: 100,
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                  alt="picture0"
                />
                <p style={{ width: "200px" }} className="text-center">
                  {productShow.name}
                </p>
                <p style={{ width: "120px" }} className="text-center">
                  {productShow.author}
                </p>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            className="fs-14"
            onClick={() => handleDeleteProduct(productShow._id)}
          >
            Xoá sách
          </Button>
          <Button
            variant="primary"
            className="fs-14 text-white"
            onClick={handleClose}
          >
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast */}
      {showToast && (
        <ToastMessage
          bg="info"
          title="Xoá sách thành công"
          body={`Bạn đã xoá thành công sách ${productShow.name}`}
          autohide={true}
        />
      )}
    </>
  );
}

export default DashboardProducts;
