import React from "react";
import styles from "../styles/styles";
import ShopInfo from "../components/Shop/ShopInfo";
import ShopProfileData from "../components/Shop/ShopProfileData";

const ShopPreviewPage = () => {
  return (
    <div className={`${styles.section} bg-[#f5f5f5]`}>
      <div className="w-full 800:flex py-10 justify-between">
        <div className="800:w-[25%] bg-white rounded-sm shadow-sm 800:overflow-y-scroll 800:h-[90vh] 800:sticky top-2 left-0 z-10">
          <ShopInfo isOwner={false} />
        </div>
        <div className="800:w-[72%] mt-5 800:mt-['unset'] rounded-sm ">
          <ShopProfileData isOwner={false} />
        </div>
      </div>
    </div>
  );
};

export default ShopPreviewPage;
