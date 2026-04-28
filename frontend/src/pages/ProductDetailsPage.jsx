import React, { useEffect, useState } from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import { useParams, useSearchParams } from "react-router-dom";
import ProductsDetails from "../components/Products/ProductsDetails";
import SuggestedProducts from "../components/Products/SuggestedProducts";
import { useSelector } from "react-redux";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const { allUserProducts } = useSelector((state) => state.product);
  const { allUserEvents } = useSelector((state) => state.event);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");
  useEffect(() => {
    if (eventData !== null) {
      const foundData = allUserEvents.find((item) => item._id === id);
      setData(foundData);
    } else {
      const foundData = allUserProducts.find((item) => item._id === id);
      setData(foundData);
    }
  }, [allUserProducts, allUserEvents, id, eventData]);
  // useEffect(() => {
  //   const data = allUserProducts.find((item) => item._id === id);
  //   setData(data);
  //   console.log("data in product detail page", data);
  // }, [data, allUserProducts]);
  return (
    <div>
      <Header />
      <ProductsDetails data={data} />
      {!eventData && <>{data && <SuggestedProducts data={data} />}</>}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
