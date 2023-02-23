import React, { useEffect, useState } from "react";
import { Badge, Container, Table, Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "../axios";
import Loading from "../components/Loading";
import { UilRocket, UilHome } from "@iconscout/react-unicons";
import "./OrdersPage.css";

function OrdersPage() {
  const user = useSelector((state) => state.user);
  const productstoShow = useSelector((state) => state.products);
  console.log(productstoShow);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productShow, setProductShow] = useState("");

  // useEffect(() => {
  //   setLoading(true);
  //   axios
  //     .get(`/users/${user._id}/orders`)
  //     .then(({ data }) => {
  //       setLoading(false);
  //       setOrders(data);
  //     })
  //     .catch((e) => {
  //       setLoading(false);
  //       console.log(e);
  //     });
  // }, []);

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

  console.log(orders);

  if (loading) {
    return <Loading />;
  }

  if (orders.length === 0) {
    return <h1 className="text-center pt-3">Không có order nào ở đây</h1>;
  }

  return (
    <Container>
      <h1 className="text-center my-4">Danh sách mượn sách của {user.name}</h1>
      <Table responsive striped bordered hover style={{ cursor: "pointer" }}>
        <thead>
          <tr>
            <th>ID mượn sách</th>
            <th>Trạng thái</th>
            <th>Ngày mượn</th>
            <th>Ngày dự kiến trả</th>
            <th>Phương thức nhận sách</th>
            <th>Xem chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr>
              <td>{order._id}</td>
              <td>
                <Badge
                  bg={`${
                    order.status === "Đang xử lý" ? "warning" : "success"
                  }`}
                  text="white"
                >
                  {order.status}
                </Badge>
              </td>
              <td>{order.date}</td>
              <td>{order.returnDate}</td>

              <td>
                {order.ship ? (
                  <Badge bg="info">
                    Giao sách <UilRocket style={{ height: "20px" }}></UilRocket>
                  </Badge>
                ) : (
                  <Badge bg="info">
                    Nhận trực tiếp{" "}
                    <UilHome style={{ height: "20px" }}></UilHome>
                  </Badge>
                )}
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default OrdersPage;
