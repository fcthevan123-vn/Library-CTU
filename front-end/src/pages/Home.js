import axios from "../axios";
import React, { useEffect, useState } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../features/productSlice";
import IntroHome from "../components/IntroHome";
import Features from "../components/Features";
import Footer from "../components/Footer";
import ToastMessage from "../components/ToastMessage";

function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);
  const showToast = localStorage.getItem("toastShowed");
  console.log(typeof showToast);

  useEffect(() => {
    axios.get("/products").then(({ data }) => dispatch(updateProducts(data)));
  }, []);
  return (
    <>
      <div className="home-wrapper">
        <IntroHome></IntroHome>
        <Features></Features>
      </div>
      {/* toast */}
      {showToast && (
        <ToastMessage
          bg="info"
          title="Đăng nhập thành công"
          body={`Thư viện CTU xin chào ${user.name}`}
          autohide={true}
        />
      )}
      <Footer></Footer>
    </>
  );
}

export default Home;
