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
      .then(({ data }) => {
        const dataClone = data;
        setLoading(false);
        const sortedData = dataClone.reverse();
        setOrders(sortedData);
      })
      .catch((e) => console.log(e));
  }

  function markReturnBook(orderId, ownerId) {
    axios
      .patch(`/orders/${orderId}/mark-return-book`, { ownerId })
      .then(({ data }) => {
        const dataClone = data;
        setLoading(false);
        const sortedData = dataClone.reverse();
        setOrders(sortedData);
      })
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
        const dataClone = data;
        setLoading(false);
        const sortedData = dataClone.reverse();
        setOrders(sortedData);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, []);

  console.log(orders[0]);

  if (loading) {
    return <Loading />;
  }

  if (orders.length === 0) {
    return <h1 className="text-center pt-4">Không có yêu cầu nào ở đây</h1>;
  }

  function MarkStatus({ status, _id, owner }) {
    if (status === "Đang xử lý") {
      return (
        <Button
          style={{ fontSize: "13px" }}
          size="sm"
          className=" text-white"
          onClick={() => markShipped(_id, owner?._id)}
        >
          Đánh dấu đã nhận sách
        </Button>
      );
    } else if (status === "Đã nhận") {
      return (
        <Button
          style={{ fontSize: "13px" }}
          size="sm"
          className=" text-white  "
          onClick={() => markReturnBook(_id, owner?._id)}
        >
          Đánh dấu đã trả sách
        </Button>
      );
    } else {
      return <Badge bg="success">Đã trả sách</Badge>;
    }
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
            <Badge bg="secondary">{address}</Badge>
          ) : (
            <Badge bg="warning">Nhận trực tiếp tại thư viện</Badge>
          )}
        </td>
        <td>
          {/* {status === "Đang xử lý" ? (
            address ? (
              <Button
                style={{ fontSize: "13px" }}
                size="sm"
                className=" text-white"
                onClick={() => markShipped(_id, owner?._id)}
              >
                Đánh dấu đã được gửi
              </Button>
            ) : (
              <Button
                style={{ fontSize: "13px" }}
                size="sm"
                className="text-white "
                onClick={() => markShipped(_id, owner?._id)}
              >
                Đánh dấu đã nhận sách
              </Button>
            )
          ) : address ? (
            <Badge bg="success">Đã gửi</Badge>
          ) : (
            <Badge bg="success">Đã nhận</Badge>
          )} */}
          {status === "Đã trả" ? (
            <Badge bg="success">Đã trả</Badge>
          ) : (
            <MarkStatus status={status} _id={_id} owner={owner}></MarkStatus>
          )}
        </td>
        <td>
          <span
            style={{ cursor: "pointer", fontSize: "13px" }}
            onClick={() => showOrder(products)}
            className="bg-primary rounded p-1 px-2 text-white"
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
        <tbody className="fs-14">
          <Pagination
            data={orders}
            RenderComponent={TableRow}
            pageLimit={1}
            dataLimit={11}
            tablePagination={true}
          />
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose} className="pt-5">
        <Modal.Header closeButton>
          <Modal.Title className="fs-18">Chi tiết mượn sách:</Modal.Title>
        </Modal.Header>
        {orderToShow.map((order) => (
          <div>
            <div className="order-details__container d-flex justify-content-around  py-2">
              <img
                className="rounded shadow"
                src={order.pictures[0].url}
                style={{
                  maxWidth: 100,
                  height: 100,
                  objectFit: "cover",
                }}
                alt="picture0"
              />
              <p style={{ width: "200px" }} className="text-center">
                {order.name}
              </p>
              <p style={{ width: "120px" }} className="text-center">
                {order.author}
              </p>
            </div>
            <hr style={{ backgroundColor: "#dee2e6", opacity: "1" }}></hr>
          </div>
        ))}
        <Modal.Footer style={{ borderTop: "0px" }}>
          <Button
            variant="primary"
            className="fs-14 text-white"
            onClick={handleClose}
          >
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default OrdersAdminPage;
