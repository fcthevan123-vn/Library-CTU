import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import axios from "../axios";
import Loading from "./Loading";
import Pagination from "./Pagination";
import { useSelector } from "react-redux";
import { useDeleteUserMutation } from "../services/appApi";
import ToastMessage from "../components/ToastMessage";

function ClientsAdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [userToDelete, setUserToDelete] = useState({});
  const handleClose = () => setShow(false);
  const user = useSelector((state) => state.user);
  const [showToast, setShowToast] = useState(false);

  const [deleteUser, { isLoading, isSuccess }] = useDeleteUserMutation();

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

  function handleDeleteUser(userId, name, email) {
    setShow(true);
    setUserToDelete({ userId: userId, name: name, email: email });
  }

  function DeleteUser({ userId, name, email }) {
    return (
      <button
        className="btn btn-danger fs-14 text-white"
        onClick={() => handleDeleteUser(userId, name, email)}
      >
        Xoá tài khoản
      </button>
    );
  }

  function DeleteUserAfterShow(userId) {
    deleteUser({ userId: userId, admin: user });
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));

    setShowToast(true);
    setShow(false);
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }

  function TableRow({ _id, name, email, studentID }) {
    return (
      <tr>
        <td>{_id}</td>
        <td>{name}</td>
        <td>{email}</td>
        <td>{studentID}</td>
        <td>
          <DeleteUser userId={_id} name={name} email={email}></DeleteUser>
        </td>
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
          <th>#</th>
        </tr>
      </thead>
      <tbody className="fs-14">
        <Pagination
          data={users}
          RenderComponent={TableRow}
          pageLimit={1}
          dataLimit={13}
          tablePagination={true}
        ></Pagination>
      </tbody>

      <Modal show={show} onHide={handleClose} className="pt-5">
        <Modal.Header closeButton>
          <Modal.Title className="fs-16">
            Bạn có chắc chắn xoá tài khoản này không?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="fs-14">
            <strong>
              Một khi đã xoá thì không thể khôi phục, hãy cân nhắc.
            </strong>{" "}
            <br></br>
            <strong>Id:</strong> {userToDelete.userId}
            <br></br>
            <strong>Email:</strong> {userToDelete.email}
            <br></br>
            <strong>Họ và tên:</strong> {userToDelete.name}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            className="fs-14 text-white"
            onClick={() => DeleteUserAfterShow(userToDelete.userId)}
          >
            Đồng ý
          </Button>
          <Button
            variant="primary text-white"
            className="fs-14"
            onClick={handleClose}
          >
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
      {showToast && (
        <ToastMessage
          bg="info"
          title="Xoá tài khoản"
          body={`Bạn đã xoá tài khoản thành công`}
          autohide={true}
        />
      )}
    </Table>
  );
}

export default ClientsAdminPage;
