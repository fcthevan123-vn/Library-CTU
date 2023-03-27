import React from "react";
import "./InformationBox.css";

function InformationBox({ name, email, studentID, orders }) {
  let count = 0;
  const countProduct = () => {
    orders.map((order) => {
      count += Object.keys(order.products).length;
    });
  };
  countProduct();

  return (
    <div>
      <div className="card card-info">
        <div className="card-body text-center">
          <img
            // src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
            src="./assets/img/avatar.png"
            alt="avatar"
            className="rounded-circle img-fluid"
            style={{ width: "150px" }}
          />
          <h5 className="my-3">{name}</h5>
          <p className="text-muted mb-1">
            <i class="fa-regular fa-id-card"></i> {studentID}
          </p>
          <p className="text-muted mb-4">
            <i class="fa-regular fa-envelope"></i> {email}
          </p>
          <div className="d-flex justify-content-center align-items-center mb-2">
            <span className="badge bg-primary text-center py-2 me-1">
              Đã mượn {count} sách
            </span>
            <span className="badge bg-primary text-center py-2 ms-1">
              Đã mượn {orders.length} lần
            </span>
            {/* <button type="button" className="btn btn-primary">
              Follow
            </button> */}
            {/* <button type="button" className="btn btn-outline-primary ms-1">
              Message
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InformationBox;
