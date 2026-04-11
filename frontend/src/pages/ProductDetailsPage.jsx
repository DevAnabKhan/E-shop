import React, { useEffect, useState } from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import { useParams } from "react-router-dom";
import ProductsDetails from "../components/Products/ProductsDetails";
import SuggestedProducts from "../components/Products/SuggestedProducts";
import { useSelector } from "react-redux";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const { allUserProducts } = useSelector((state) => state.product);

  useEffect(() => {
    const foundData = allUserProducts.find((item) => item._id === id);
    setData(foundData);
  }, [allUserProducts, id]);
  // useEffect(() => {
  //   const data = allUserProducts.find((item) => item._id === id);
  //   setData(data);
  //   console.log("data in product detail page", data);
  // }, [data, allUserProducts]);
  return (
    <div>
      <Header />
      <ProductsDetails data={data} />
      {data && <SuggestedProducts data={data} />}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
