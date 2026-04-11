import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import ProductCard from "../Route/ProductCard/ProductCard";
import { useSelector } from "react-redux";

const SuggestedProducts = ({ data }) => {
  const { allUserProducts } = useSelector((state) => state.product);
  const [product, setProduct] = useState();

  useEffect(() => {
    const d =
      allUserProducts &&
      allUserProducts.filter((i) => i.category === data.category);

    setProduct(d);
  }, []);
  return (
    <div>
      {data && (
        <div className={` p-4 ${styles.section}`}>
          <h2
            className={`${styles.heading} text-[25px] font-medium border-b mb-5`}
          >
            Related Products
          </h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6.25 lg:grid-cols-4 lg:gap-6.25 xl:grid-cols-5 xl:gap-7.5 mb-12">
            {product &&
              product.map((i, index) => <ProductCard data={i} key={index} />)}
          </div>
        </div>
      )}
    </div>
  );
};

export default SuggestedProducts;
