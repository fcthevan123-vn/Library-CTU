import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import ProductPreview from "../components/ProductPreview";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ListCategory from "../components/ListCategory";
import "./ListBook.css";
import { UilSearch } from "@iconscout/react-unicons";
function ListBook() {
  const [key, setKey] = useState("all book");
  const [searchTerm, setSearchTerm] = useState("");

  const products = useSelector((state) => state.products);

  const productsSearch = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(productsSearch);
  return (
    <Container className="mt-4 container-listbook">
      <span className="listbook-title"> Chào mừng đến với thư viện CTU </span>
      <div className="filters-container d-flex justify-content-center pt-4 pb-4 ">
        <div className="search-box">
          <input
            type="search"
            placeholder="Nhập tên sách ở đây"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
          <UilSearch className="search-btn"></UilSearch>
        </div>
      </div>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="all book" title="Tất cả sách">
          <div className="d-flex justify-content-center flex-wrap">
            {productsSearch.length > 0 ? (
              productsSearch.map((product) => <ProductPreview {...product} />)
            ) : (
              <h4>Không có sách nào có chứa "{searchTerm}"</h4>
            )}
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
