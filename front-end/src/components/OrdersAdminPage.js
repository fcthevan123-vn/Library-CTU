import React, { useEffect, useState } from "react";
import { Badge, Button, Modal, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "../axios";
import Loading from "./Loading";
import Pagination from "./Pagination";
import { UilEye } from "@iconscout/react-unicons";

function OrdersAdminPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const products = useSelector((state) => state.products);
  const [orderToShow, setOrderToShow] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  function markShipped(orderId, ownerId) {
    axios
      .patch(`/orders/${orderId}/mark-shipped`, { ownerId })
      .then(({ data }) => setOrders(data))
      .catch((e) => console.log(e));
  }

  function showOrder(productsObj) {
    let productsToShow = products.filter((product) => productsObj[product._id]);
    productsToShow = productsToShow.map((product) => {
      const productCopy = { ...product };
      productCopy.count = productsObj[product._id];
      delete productCopy.description;
      return productCopy;
    });
    setShow(true);
    setOrderToShow(productsToShow);
  }

  useEffect(() => {
    setLoading(true);
    axios
      .get("/orders")
      .then(({ data }) => {
        setLoading(false);
        setOrders(data);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (orders.length === 0) {
    return <h1 className="text-center pt-4">Không có yêu cầu nào ở đây</h1>;
  }

  function TableRow({
    _id,
    owner,
    status,
    products,
    address,
    returnDate,
    takeBookDate,
    ship,
    date,
  }) {
    // Format date
    const arrReturnDate = returnDate.split("-");
    const arrTakeBookDate = takeBookDate.split("-");
    arrReturnDate.reverse();
    arrTakeBookDate.reverse();
    const newReturnDate = arrReturnDate.join("-");
    const newTakeBookDate = arrTakeBookDate.join("-");

    // increase date

    return (
      <tr>
        <td>{_id}</td>
        <td>{owner?.name}</td>
        <td>{owner.studentID}</td>
        <td>{ship ? "" : newTakeBookDate}</td>
        <td>{newReturnDate}</td>
        <td>
          {address ? (
            <Badge bg="info">{address}</Badge>
          ) : (
            <Badge bg="warning">Nhận trực tiếp tại thư viện</Badge>
          )}
        </td>
        <td>
          {status === "Đang xử lý" ? (
            address ? (
              <Button size="sm" onClick={() => markShipped(_id, owner?._id)}>
                Đánh dấu đã được gửi
              </Button>
            ) : (
              <Button size="sm" onClick={() => markShipped(_id, owner?._id)}>
                Đánh dấu đã nhận sách
              </Button>
            )
          ) : address ? (
            <Badge bg="success">Đã gửi</Badge>
          ) : (
            <Badge bg="success">Đã nhận</Badge>
          )}
        </td>
        <td>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => showOrder(products)}
          >
            Xem chi tiết <UilEye></UilEye>
          </span>
        </td>
      </tr>
    );
  }

  return (
    <>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>ID mượn sách</th>
            <th>Họ và tên</th>
            <th>MSSV</th>
            <th>Ngày lấy sách</th>
            <th>Ngày trả sách</th>
            <th>Địa chỉ</th>
            <th>Xác nhận</th>
          </tr>
        </thead>
        <tbody>
          <Pagination
            data={orders}
            RenderComponent={TableRow}
            pageLimit={1}
            dataLimit={10}
            tablePagination={true}
          />
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết mượn sách:</Modal.Title>
        </Modal.Header>
        {orderToShow.map((order) => (
          <div>
            <div className="order-details__container d-flex justify-content-around py-2">
              <img
                src={order.pictures[0].url}
                style={{ maxWidth: 100, height: 100, objectFit: "cover" }}
              />
              <p>{order.name}</p>
              <p>{order.author}</p>
            </div>
            <hr style={{ backgroundColor: "#dee2e6", opacity: "1" }}></hr>
          </div>
        ))}
        <Modal.Footer style={{ borderTop: "0px" }}>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default OrdersAdminPage;
