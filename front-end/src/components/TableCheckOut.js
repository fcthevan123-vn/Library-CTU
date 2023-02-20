import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import CheckoutForm from "./CheckoutForm";
import TakeBookDirect from "./TakeBookDirect";
function TableCheckOut() {
  return (
    <Tabs defaultActiveKey="home" id="fill-tab-example" className="mb-3" fill>
      <Tab eventKey="home" title="Giao sách">
        <CheckoutForm></CheckoutForm>
      </Tab>
      <Tab eventKey="profile" title="Nhận trực tiếp tại thư viện">
        <TakeBookDirect></TakeBookDirect>
      </Tab>
    </Tabs>
  );
}

export default TableCheckOut;
