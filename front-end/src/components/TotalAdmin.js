import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../axios";

import "./TotalAdmin.css";
function TotalAdmin() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const products = useSelector((state) => state.products);

  //   get all orders
  useEffect(() => {
    axios
      .get("/orders")
      .then(({ data }) => {
        setOrders(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  //  get all users
  useEffect(() => {
    axios
      .get("/users")
      .then(({ data }) => {
        setUsers(data);
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

  function countInformation() {
    orders.map((order) => {
      const date = order.date.slice(0, 10);
      if (date === formattedDate) {
        totalOrderedInday += 1;
      }
      totalBookOrdered += Object.keys(order.products).length;
    });
  }

  countInformation();
  console.log(totalOrderedInday);
  return (
    <div className="total-wrapper">
      <div className="container total-container">
        <div className="row row-total">
          <div className="col-4 col-total">
            <div className="card-total-wrapper">
              <div className="img-total">
                <i class="fa-solid fa-book fa-beat"></i>
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
                <i class="fa-solid fa-arrow-up-from-bracket fa-beat"></i>
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
                <i class="fa-solid fa-users fa-beat"></i>
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
                <i class="fa-solid fa-book-bookmark fa-beat"></i>
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
                <i class="fa-solid fa-calendar-days fa-beat"></i>
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
