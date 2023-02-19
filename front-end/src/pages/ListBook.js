import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import ProductPreview from "../components/ProductPreview";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ListCategory from "../components/ListCategory";

function ListBook() {
  const [key, setKey] = useState("all book");

  const products = useSelector((state) => state.products);
  const allProducts = products.slice();

  return (
    <Container className="mt-4">
      <h2>Chào mừng đến với thư viện CTU</h2>

      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="all book" title="Tất cả sách">
          <div className="d-flex justify-content-center flex-wrap">
            {allProducts.map((product) => (
              <ProductPreview {...product} />
            ))}
          </div>
        </Tab>
        <Tab eventKey="category" title="Danh mục sách">
          <ListCategory></ListCategory>
        </Tab>
      </Tabs>
    </Container>
  );
}

export default ListBook;
