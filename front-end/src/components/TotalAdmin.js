import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../axios";

import "./TotalAdmin.css";
import Loading from "./Loading";
function TotalAdmin() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const products = useSelector((state) => state.products);
  const [loading, setLoading] = useState(false);

  //   get all orders
  useEffect(() => {
    setLoading(true);
    axios
      .get("/orders")
      .then(({ data }) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  //  get all users
  useEffect(() => {
    setLoading(true);
    axios
      .get("/users")
      .then(({ data }) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  //   count
  let totalBookOrdered = 0;
  let totalOrderedInday = 0;
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Add 1 to the month, since January is 0
  const year = currentDate.getFullYear();
  const formattedDate = `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year}`;
  console.log(formattedDate);
  function countInformation() {
    orders.map((order) => {
      const dateArr = order.date.slice(0, 10).split("/");
      const date = `${dateArr[2]}/${dateArr[1]}/${dateArr[0]}`;
      if (date === formattedDate) {
        totalOrderedInday += 1;
      }
      totalBookOrdered += Object.keys(order.products).length;
      return null;
    });
  }

  countInformation();
  console.log(orders[0]);

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="total-wrapper">
      <div className="container total-container">
        <div className="row row-total">
          <div className="col-4 col-total">
            <div className="card-total-wrapper">
              <div className="img-total">
                <i class="fa-solid fa-book fa-beat text-white"></i>
              </div>
              <div className="info-total text-white">
                <p className="fs-16 ">
                  <strong>{products.length}</strong>
                </p>
                <p className="fs-14 ">Đầu sách</p>
              </div>
            </div>
          </div>
          <div className="col-4 col-total">
            <div className="card-total-wrapper">
              <div className="img-total">
                <i class="fa-solid fa-arrow-up-from-bracket fa-beat text-white"></i>
              </div>
              <div className="info-total text-white">
                <p className="fs-16 ">
                  <strong>{orders.length}</strong>
                </p>
                <p className="fs-14 ">Lượt mượn sách</p>
              </div>
            </div>
          </div>
          <div className="col-4 col-total">
            <div className="card-total-wrapper">
              <div className="img-total">
                <i class="fa-solid fa-users fa-beat text-white"></i>
              </div>
              <div className="info-total text-white">
                <p className="fs-16 ">
                  <strong>{users.length}</strong>
                </p>
                <p className="fs-14 ">Người dùng đã đăng ký</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row row-total">
          <div className="col-4 col-total">
            <div className="card-total-wrapper">
              <div className="img-total">
                <i class="fa-solid fa-book-bookmark fa-beat text-white"></i>
              </div>
              <div className="info-total text-white">
                <p className="fs-16 ">
                  <strong>{totalBookOrdered}</strong>
                </p>
                <p className="fs-14 ">Sách đã được mượn</p>
              </div>
            </div>
          </div>
          <div className="col-4 col-total">
            <div className="card-total-wrapper">
              <div className="img-total">
                <i class="fa-solid fa-calendar-days fa-beat text-white"></i>
              </div>
              <div className="info-total text-white">
                <p className="fs-16 ">
                  <strong>{totalOrderedInday}</strong>
                </p>
                <p className="fs-14 ">Lượt mượn sách trong ngày</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TotalAdmin;
