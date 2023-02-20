import React, { useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDeleteProductMutation } from "../services/appApi";
import "./DashboardProducts.css";
import Pagination from "./Pagination";

function DashboardProducts() {
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);
  // removing the product
  const [deletProduct, { isLoading, isSuccess }] = useDeleteProductMutation();
  function handleDeleteProduct(id) {
    // logic here
    if (window.confirm("Bạn có chắc chắn xoá sách này không"))
      deletProduct({ product_id: id, user_id: user._id });
  }

  //  Row
  function TableRow({ pictures, _id, name, author, quantity }) {
    return (
      <tr>
        <td>
          <img src={pictures[0].url} className="dashboard-product-preview" />
        </td>
        <td>{_id}</td>
        <td>{name}</td>
        <td>{author}</td>
        <td>{quantity}</td>
        <td>
          <div className="edit-wrapper d-flex flex-column justify-content-center ">
            <Button
              size="sm"
              variant="danger"
              onClick={() => handleDeleteProduct(_id, user._id)}
              disabled={isLoading}
            >
              Xoá sách khỏi thư viện
            </Button>

            <Link
              to={`/product/${_id}/edit`}
              className="btn btn-sm btn-warning mt-2"
            >
              Chỉnh sửa sách
            </Link>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Sách</th>
          <th>ID sách</th>
          <th>Tên sách</th>
          <th>Tác giả</th>
          <th>Số lượng</th>
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
  );
}

export default DashboardProducts;
