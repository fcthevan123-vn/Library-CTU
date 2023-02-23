import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { Alert, Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import CheckoutForm from "../components/CheckoutForm";
import { UilTimesCircle } from "@iconscout/react-unicons";
import { useRemoveFromCartMutation } from "../services/appApi";
import "./CartPage.css";
import TableCheckOut from "../components/TableCheckOut";

function CartPage() {
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const userCartObj = user.cart;
  let cart = products.filter((product) => userCartObj[product._id] != null);
  const [removeFromCart, { isLoading }] = useRemoveFromCartMutation();
  Object.keys(userCartObj).map((product) => console.log(product));
  return (
    <Container
      fluid
      style={{ minHeight: "95vh" }}
      className="cart-container mt-3 px-5"
    >
      <Row>
        <Col>
          <h1 className="py-4 h3">Cặp sách của {user.name}</h1>
          {cart.length == 0 ? (
            <Alert variant="info" style={{ margin: "0 350px" }}>
              Cặp sách đang trống, hãy thêm sách ngay!
            </Alert>
          ) : (
            <TableCheckOut></TableCheckOut>
          )}
        </Col>
        {cart.length > 0 && (
          <Col md={6} className="shadow-sm  pt-4 bg-body-tertiary rounded ms-3">
            <>
              <Table responsive="sm" className="cart-table">
                <thead>
                  <tr>
                    <th>&nbsp;</th>
                    <th>Sách</th>
                    <th>Tác giả</th>
                    <th>Số lượng</th>
                    <th>Nhà xuất bản</th>
                  </tr>
                </thead>
                <tbody>
                  {/* loop through cart products */}
                  {cart.map((item) => (
                    <tr>
                      <td>
                        {!isLoading && (
                          <UilTimesCircle
                            className="btn-remove"
                            style={{
                              margin: "35px 0 0 10px",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              removeFromCart({
                                productId: item._id,
                                userId: user._id,
                              })
                            }
                          ></UilTimesCircle>
                        )}
                      </td>
                      <td>
                        <img
                          src={item.pictures[0].url}
                          style={{
                            width: 100,
                            height: 100,
                            objectFit: "cover",
                          }}
                        />
                      </td>
                      <td>{item.author}</td>
                      <td>
                        <span className="quantity-indicator">
                          <span>{user.cart[item._id]}</span>
                        </span>
                      </td>
                      <td>{item.publisher}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div>
                <h3 className="h4 py-3">Tổng: {cart.length} sách</h3>
              </div>
            </>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default CartPage;
