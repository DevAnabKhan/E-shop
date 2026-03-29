import React, { useState } from "react";
import Header from "../components/Layout/Header";
import ProfileSidebar from "../components/Profile/ProfileSidebar";
import ProfileContent from "../components/Profile/ProfileContent";
import styles from "../styles/styles";

const ProfilePage = () => {
  const [active, setActive] = useState(1);
  return (
    <div>
      <Header />
      <div className={`${styles.section} py-10 flex bg-[#f5f5f5]`}>
        <div className=" w-12.5 800:w-83.75 800:mt-0 mt-[20%]">
          <ProfileSidebar active={active} setActive={setActive} />
        </div>
        <ProfileContent active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default ProfilePage;
