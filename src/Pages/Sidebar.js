import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { HiOutlineLogout, HiHome } from "react-icons/hi";
import "../Styles/Sidebar.css";

export const Sidebar = () => {
  const [isToggle, setIsToggle] = useState(false);

  const logoutFn = () => {
    localStorage.clear();
    window.location.assign("/");
  };

  const toggle = () => (!isToggle ? setIsToggle(true) : setIsToggle(false));

  return (
    <div className="sidebar_main">
      <div
        style={{ width: isToggle ? "50px" : "210px" }}
        className="main_section"
      >
        <div className="sidebar_head" onClick={toggle}>
          <h3 style={{display: !isToggle ? "block" : "none"}}>THETREX</h3>
          <FaBars className="sidebr_icons" />
        </div>
        <div className="sidebar_head">
          <HiHome className="sidebr_icons" />
          <h3 style={{display: !isToggle ? "block" : "none"}}>Home</h3>
        </div>
        <div
          className="sidebar_head"
          onClick={() => logoutFn()}
        >
          <HiOutlineLogout className="sidebr_icons" />
          <h3 style={{display: !isToggle ? "block" : "none"}}>Logout</h3>
        </div>
      </div>
    </div>
  );
};
