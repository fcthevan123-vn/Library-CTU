import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import ProductPreview from "../components/ProductPreview";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ListCategory from "../components/ListCategory";
import "./ListBook.css";
import { UilSearch } from "@iconscout/react-unicons";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination";

function ListBook() {
  const [key, setKey] = useState("all book");
  const [searchTerm, setSearchTerm] = useState("");

  const products = useSelector((state) => state.products);

  const productsSearch = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  localStorage.removeItem("toastShowed");

  function rowPage({ _id, category, name, pictures, author }) {
    return (
      <ProductPreview
        _id={_id}
        category={category}
        name={name}
        pictures={pictures}
        author={author}
      />
    );
  }

  return (
    <div>
      <div className="listbook-wrapper">
        <Container className="mt-4 container-listbook">
          <span className="listbook-title fs-30 fa-bounce">
            {" "}
            Chào mừng đến với thư viện CTU{" "}
          </span>
          <div className=" d-flex justify-content-center pt-4 pb-4 ">
            <div className="search-box">
              <input
                type="search"
                placeholder="Nhập tên sách ở đây"
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar fs-16"
              />
              <UilSearch className="search-btn"></UilSearch>
            </div>
          </div>
          <div className="filters-container">
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-3"
            >
              <Tab eventKey="all book" title="Tất cả sách" className="fs-16">
                <div className="d-flex justify-content-center flex-wrap book-rendered-wrapper">
                  {productsSearch.length > 0 ? (
                    <Pagination
                      data={productsSearch}
                      RenderComponent={rowPage}
                      pageLimit={1}
                      dataLimit={8}
                    ></Pagination>
                  ) : (
                    <h4>Không có sách nào có chứa "{searchTerm}"</h4>
                  )}

                  {/* {productsSearch.length > 0 ? (
                    productsSearch.map((product) =>
                      product.quantity > 0 ? (
                        <ProductPreview {...product} />
                      ) : (
                        <ProductPreview {...product} disable={true} />
                      )
                    )
                  ) : (
                    <h4>Không có sách nào có chứa "{searchTerm}"</h4>
                  )} */}
                </div>
              </Tab>
              <Tab eventKey="category" title="Danh mục sách">
                <ListCategory></ListCategory>
              </Tab>
            </Tabs>
          </div>
        </Container>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default ListBook;
