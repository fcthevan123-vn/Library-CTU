import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "../axios";
import Loading from "./Loading";
function ClientsAdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/users")
      .then(({ data }) => {
        setLoading(false);
        setUsers(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, []);

  if (loading) return <Loading />;
  if (users?.length === 0)
    return <h2 className="py-2 text-center">No users yet</h2>;

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
      <tbody>
        {users.map((user) => (
          <tr>
            <td>{user._id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.studentID}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ClientsAdminPage;
