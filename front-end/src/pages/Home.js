import axios from "../axios";
import React, { useEffect, useState } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../features/productSlice";
import IntroHome from "../components/IntroHome";
import Features from "../components/Features";
import Footer from "../components/Footer";
function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    axios.get("/products").then(({ data }) => dispatch(updateProducts(data)));
  }, []);
  return (
    <div>
      <IntroHome></IntroHome>
      <Features></Features>
      <Footer></Footer>
    </div>
  );
}

export default Home;
