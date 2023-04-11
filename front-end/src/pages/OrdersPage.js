import React, { useEffect, useState } from "react";
import {
  Badge,
  Container,
  Table,
  Modal,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "../axios";
import Loading from "../components/Loading";
import { UilRocket, UilHome, UilEye } from "@iconscout/react-unicons";
import "./OrdersPage.css";
import Footer from "../components/Footer";
import InformationBox from "../components/InformationBox";
import ToastMessage from "../components/ToastMessage";
import {
  useCancelOrderMutation,
  useEditOrderMutation,
} from "../services/appApi";

import { LinkContainer } from "react-router-bootstrap";

function OrdersPage() {
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productShow, setProductShow] = useState("");
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [orderToEdit, setOrderToEdit] = useState([]);
  const [orderToDelete, setOrderToDelete] = useState([]);
  const [orderToShow, setOrderToShow] = useState([]);
  const [returnDate, setReturnDate] = useState("");
  const [takeBookDate, setTakeBookDate] = useState("");
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleCloseDelete = () => setShowDelete(false);

  const [cancelOrder, { isLoading, isSuccess }] = useCancelOrderMutation();
  const [editOrder] = useEditOrderMutation();

  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function getData() {
      await axios
        .get(`/users/${user._id}/orders`)
        .then(({ data }) => {
          const dataClone = data;
          const dataShorted = dataClone.reverse();
          setOrders(dataShorted);
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
          console.log(e);
        });
    }
    getData();
  }, []);

  localStorage.removeItem("toastShowed");

  // format date
  function formatDate(date) {
    const arrDate = date.split("-");
    arrDate.reverse();
    const newDate = arrDate.join("-");
    return newDate;
  }

  function showOrder(productsObj) {
    console.log(productsObj);
    let productsToShow = products.filter((product) => productsObj[product._id]);
    console.log(productsToShow);
    productsToShow = productsToShow.map((product) => {
      const productCopy = { ...product };
      productCopy.count = productsObj[product._id];
      delete productCopy.description;
      return productCopy;
    });
    setOrderToShow(productsToShow);
    setShow(true);
  }

  function EditOrderHandle(orderObj, returnDate, takeBookDate) {
    setOrderToEdit(orderObj);
    setShowEdit(true);
  }

  function handleEditOrder(orderObj, returnDate, takeBookDate) {
    editOrder({
      orderId: orderObj._id,
      returnDate,
      takeBookDate,
    });
    setShowEdit(false);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  // view more
  function ViewMore({ products }) {
    return (
      <span style={{ cursor: "pointer" }} onClick={() => showOrder(products)}>
        Xem chi tiết <UilEye></UilEye>
      </span>
    );
  }

  // edit order
  function EditOrder({ order, returnDate, takeBookDate }) {
    return (
      <button
        className="btn btn-primary fs-14 mb-1 text-white"
        onClick={() => EditOrderHandle(order, returnDate, takeBookDate)}
      >
        Chỉnh sửa
      </button>
    );
  }

  function handleCancelOrder(order) {
    setOrderToDelete(order);
    setShowDelete(true);
  }

  function DeleteOrderAfterShow(orderId, products) {
    // Chuyển object products thành mảng
    const arrProduct = Object.keys(products).map((key) => key);
    cancelOrder({ orderId: orderId, userId: user._id, products: arrProduct });
    setShowToast(true);
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }

  function DeleteOrder({ order }) {
    return (
      <button
        className="btn btn-danger fs-14"
        onClick={() => handleCancelOrder(order)}
      >
        Huỷ{" "}
      </button>
    );
  }

  if (loading) {
    return <Loading />;
  }

  if (orders.length === 0) {
    return (
      <div className="orderPage-wrapper orderPage-wrapper-null">
        <h2 className="fs-30">Bạn chưa mượn sách lần nào cả.</h2>
        <LinkContainer to="/all-book">
          <button className="btn-order-null">Mượn sách ngay</button>
        </LinkContainer>
      </div>
    );
  }

  console.log(orders.length);

  return (
    <div>
      <div className="orderPage-wrapper">
        <Container fluid>
          <Row>
            <Col
              md={3}
              className="d-flex justify-content-center align-items-center"
            >
              <InformationBox
                name={user.name}
                email={user.email}
                studentID={user.studentID}
                orders={orders}
              ></InformationBox>
            </Col>
            <Col md={9}>
              <h1 className="text-center my-4 fs-22 order-title">
                Danh sách mượn sách của {user.name}
              </h1>
              <div className="table-wrapper">
                <Table
                  responsive
                  striped
                  bordered
                  hover
                  style={{ cursor: "pointer" }}
                >
                  <thead>
                    <tr className="fs-16">
                      <th>ID mượn sách</th>
                      <th>Trạng thái</th>
                      <th>Ngày giờ mượn</th>
                      <th>Ngày lấy sách</th>
                      <th>Ngày trả sách</th>
                      <th>Phương thức nhận sách</th>
                      <th>Xem chi tiết</th>
                      <th>Chỉnh sửa</th>
                    </tr>
                  </thead>
                  <tbody className="fs-14">
                    {orders.map((order) => (
                      <tr>
                        <td>{order._id}</td>
                        <td>
                          <Badge
                            bg={`${
                              order.status === "Đang xử lý"
                                ? "secondary"
                                : "warning"
                            }`}
                            text="white"
                          >
                            {/* {order.status === "Sách đã được gửi đi" } */}
                            {order.status === "Đang xử lý"
                              ? order.status
                              : order.ship
                              ? "Sách đã được gửi đi"
                              : "Đã nhận tại thư viện"}
                          </Badge>
                        </td>
                        <td>{order.date}</td>
                        <td>{formatDate(order.takeBookDate)}</td>
                        <td>{formatDate(order.returnDate)}</td>
                        <td>
                          {order.ship ? (
                            <Badge bg="success">
                              Giao sách{" "}
                              <UilRocket style={{ height: "20px" }}></UilRocket>
                            </Badge>
                          ) : (
                            <Badge bg="success ">
                              Nhận trực tiếp{" "}
                              <UilHome style={{ height: "20px" }}></UilHome>
                            </Badge>
                          )}
                        </td>
                        <td>
                          <ViewMore products={order.products}></ViewMore>
                        </td>
                        <td>
                          {order.status === "Đang xử lý" ? (
                            <div className="d-flex justify-content-center align-items-center flex-column">
                              <EditOrder
                                order={order}
                                returnDate={returnDate}
                                takeBookDate={takeBookDate}
                              ></EditOrder>
                              {/* <button
                                className="btn btn-danger fs-14"
                                onClick={() =>
                                  handleCancelOrder(order._id, order.products)
                                }
                              >
                                Huỷ{" "}
                              </button> */}
                              <DeleteOrder order={order}></DeleteOrder>
                            </div>
                          ) : (
                            <button className="btn btn-danger fs-14" disabled>
                              Huỷ
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>

                  {/* modal xem chi tiết */}
                  <Modal show={show} onHide={handleClose} className="pt-5 ">
                    <Modal.Header closeButton>
                      <Modal.Title className="fs-16">
                        Chi tiết mượn sách:
                      </Modal.Title>
                    </Modal.Header>
                    {orderToShow.map((order) => (
                      <div>
                        <div className="order-details__container d-flex justify-content-around py-2">
                          <img
                            src={order.pictures[0].url}
                            style={{
                              maxWidth: 100,
                              height: 100,
                              objectFit: "cover",
                            }}
                            alt="picture0"
                          />
                          <p className="fs-14">{order.name}</p>
                          <p className="fs-14">{order.author}</p>
                        </div>
                        <hr
                          style={{ backgroundColor: "#dee2e6", opacity: "1" }}
                        ></hr>
                      </div>
                    ))}
                    <Modal.Footer style={{ borderTop: "0px" }}>
                      <Button
                        variant="primary"
                        className="text-white fs-14"
                        onClick={handleClose}
                      >
                        Đóng
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  {/* modal edit order */}
                  <Modal
                    show={showEdit}
                    onHide={handleCloseEdit}
                    className="pt-5"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title className="fs-16">
                        Chỉnh sửa: {orderToEdit._id}
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div class="row g-2">
                        {!orderToEdit.ship && (
                          <div className="col-md">
                            <div className="form-floating">
                              <input
                                type="date"
                                className="form-control"
                                id="floatingInputGrid"
                                value={takeBookDate}
                                onChange={(e) =>
                                  setTakeBookDate(e.target.value)
                                }
                              />
                              <label for="floatingInputGrid">
                                Ngày lấy sách
                              </label>
                            </div>
                          </div>
                        )}
                        <div className="col-md">
                          <div className="form-floating">
                            <input
                              type="date"
                              className="form-control"
                              id="floatingInputGrid2"
                              value={returnDate}
                              onChange={(e) => setReturnDate(e.target.value)}
                            />
                            <label for="floatingInputGrid2">
                              Ngày trả sách
                            </label>
                          </div>
                        </div>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="primary"
                        className="fs-14 text-white"
                        onClick={() => {
                          handleEditOrder(
                            orderToEdit,
                            returnDate,
                            takeBookDate
                          );
                        }}
                      >
                        Lưu thay đổi
                      </Button>
                      <Button
                        variant="primary text-white"
                        className="fs-14"
                        onClick={handleCloseEdit}
                      >
                        Đóng
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  {/* modal delete order */}
                  <Modal
                    show={showDelete}
                    onHide={handleCloseDelete}
                    className="pt-5"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title className="fs-16">
                        Bạn có chắc chắn xoá không?
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p className="fs-14">
                        Một khi đã xoá thì không thể khôi phục, hãy cân nhắc.{" "}
                        <br></br>
                        Id: {orderToDelete._id}
                      </p>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="danger"
                        className="fs-14 text-white"
                        onClick={() => {
                          DeleteOrderAfterShow(
                            orderToDelete._id,
                            orderToDelete.products
                          );
                        }}
                      >
                        Đồng ý
                      </Button>
                      <Button
                        variant="primary text-white"
                        className="fs-14"
                        onClick={handleCloseDelete}
                      >
                        Đóng
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Table>
              </div>
            </Col>
          </Row>
        </Container>
        {/* Toast */}
        {showToast && (
          <ToastMessage
            bg="info"
            title="Huỷ mượn sách thành công"
            body={`Bạn đã huỷ mượn sách`}
            autohide={true}
          />
        )}
      </div>
      <Footer></Footer>
    </div>
  );
}

export default OrdersPage;
