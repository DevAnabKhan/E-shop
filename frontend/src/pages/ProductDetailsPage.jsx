import React, { useEffect, useState } from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import { useParams } from "react-router-dom";
import { productData } from "../static/data";
import ProductsDetails from "../components/Products/ProductsDetails";
import SuggestedProducts from "../components/Products/SuggestedProducts";

const ProductDetailsPage = () => {
  const { name } = useParams();
  const [data, setData] = useState(null);
  const productName = name.replace(/-/g, " ");
  useEffect(() => {
    const data = productData.find((item) => item.name === productName);
    setData(data);
  }, []);
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
