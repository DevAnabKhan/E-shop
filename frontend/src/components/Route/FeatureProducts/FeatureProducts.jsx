import React from "react";
import styles from "../../../styles/styles";
import { productData } from "../../../static/data";
import ProductCard from "../ProductCard/ProductCard";
import { useSelector } from "react-redux";

const FeatureProducts = () => {
  const { allUserProducts } = useSelector((state) => state.product);

  return (
    <div className={`${styles.section}`}>
      <div className={`${styles.heading}`}>
        <h1>Featured Products</h1>
      </div>
      <div className="grid grid-cols-1 gap-5 md:gap-6.25 lg:grid-cols-4 lg:gap-6.25 xl:grid-cols-5 xl:gap-7.5 mb-12 border-0">
        {allUserProducts && allUserProducts.length !== 0 && (
          <>
            {allUserProducts &&
              allUserProducts.map((i, index) => (
                <ProductCard data={i} key={index} />
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default FeatureProducts;
