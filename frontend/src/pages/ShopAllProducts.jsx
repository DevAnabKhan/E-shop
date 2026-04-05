import React from "react";
import DashboardHeader from "../components/Shop/Layout/DashboardHeader";
import DashboardSidebar from "../components/Shop/Layout/DashboardSidebar";
import AllProducts from "../components/Products/AllProducts";
import { useState } from "react";

const ShopAllProducts = () => {
  const [active, setActive] = useState(3);
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex justify-between">
        <div className="w-20 800:w-82.5">
          <DashboardSidebar active={active} setActive={setActive} />
        </div>
        <div className="w-full justify-center flex">
          <AllProducts />
        </div>
      </div>
    </div>
  );
};

export default ShopAllProducts;
