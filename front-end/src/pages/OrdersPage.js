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
import { useSelector } from "react-redux";
import axios from "../axios";
import Loading from "../components/Loading";
import { UilRocket, UilHome, UilEye } from "@iconscout/react-unicons";
import "./OrdersPage.css";
import Footer from "../components/Footer";
import InformationBox from "../components/InformationBox";

function OrdersPage() {
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productShow, setProductShow] = useState("");
  const [show, setShow] = useState(false);
  const [orderToShow, setOrderToShow] = useState([]);
  const handleClose = () => setShow(false);
  useEffect(() => {
    setLoading(true);
    async function getData() {
      await axios
        .get(`/users/${user._id}/orders`)
        .then(({ data }) => {
          setLoading(false);
          setOrders(data);
        })
        .catch((e) => {
          setLoading(false);
          console.log(e);
        });
    }
    getData();
  }, []);

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

  // view more
  function ViewMore({ products }) {
    return (
      <span style={{ cursor: "pointer" }} onClick={() => showOrder(products)}>
        Xem chi tiết <UilEye></UilEye>
      </span>
    );
  }

  if (loading) {
    return <Loading />;
  }

  if (orders.length === 0) {
    return <h1 className="text-center pt-3 fs-30">Không có order nào ở đây</h1>;
  }

  return (
    <div>
      <div className="orderPage-wrapper">
        <Container>
          <Row>
            <Col
              md={3}
              className="d-flex justify-content-center align-items-center"
            >
              <InformationBox
                name={user.name}
                email={user.email}
                studentID={user.studentID}
              ></InformationBox>
            </Col>
            <Col md={9}>
              <h1 className="text-center my-4 fs-22">
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
                      <th>Ngày dự kiến trả</th>
                      <th>Phương thức nhận sách</th>
                      <th>Xem chi tiết</th>
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
                        <td>{formatDate(order.returnDate)}</td>
                        <td>
                          {order.ship ? (
                            <Badge bg="success">
                              Giao sách{" "}
                              <UilRocket style={{ height: "20px" }}></UilRocket>
                            </Badge>
                          ) : (
                            <Badge bg="success">
                              Nhận trực tiếp{" "}
                              <UilHome style={{ height: "20px" }}></UilHome>
                            </Badge>
                          )}
                        </td>
                        <td>
                          <ViewMore products={order.products}></ViewMore>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                  <Modal show={show} onHide={handleClose} className="mt-5 ">
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
                        variant="secondary"
                        className="text-white"
                        onClick={handleClose}
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
      </div>
      <Footer></Footer>
    </div>
  );
}

export default OrdersPage;
