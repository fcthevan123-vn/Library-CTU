import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "../axios";
import Loading from "./Loading";
import Pagination from "./Pagination";

function ClientsAdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/users")
      .then(({ data }) => {
        const dataClone = data;
        setLoading(false);
        const sortedData = dataClone.reverse();
        setUsers(sortedData);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, []);
  if (loading) return <Loading />;
  if (users?.length === 0)
    return (
      <h2 className="py-2 text-center fs-22">
        Chưa có người dùng nào đăng ký ở đây
      </h2>
    );

  function TableRow({ _id, name, email, studentID }) {
    return (
      <tr>
        <td>{_id}</td>
        <td>{name}</td>
        <td>{email}</td>
        <td>{studentID}</td>
      </tr>
    );
  }

  return (
    <Table responsive striped bordered hover>
      <thead>
        <tr>
          <th>Id tài khoản</th>
          <th>Họ và tên</th>
          <th>Email</th>
          <th>MSSV</th>
        </tr>
      </thead>
      <tbody className="fs-14">
        {/* {users.map((user) => (
          <tr>
            <td>{user._id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.studentID}</td>
          </tr>
        ))} */}
        <Pagination
          data={users}
          RenderComponent={TableRow}
          pageLimit={1}
          dataLimit={13}
          tablePagination={true}
        ></Pagination>
      </tbody>
    </Table>
  );
}

export default ClientsAdminPage;
