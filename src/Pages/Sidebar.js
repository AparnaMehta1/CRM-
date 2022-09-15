import {
  CSidebar,
  CNavItem,
  CNavTitle,
  CSidebarNav,
  CSidebarToggler,
} from "@coreui/react";
import {
  HiOutlineLogout,
  HiHome,
  HiArchive
} from "react-icons/hi";
import "../Styles/Sidebar.css";

export const Sidebar = () => {
  const logoutFn = () => {
    localStorage.clear();
    window.location.assign("/");
  };

  return (
    <div>
      <CSidebar unfoldable className="bg-black vh-100 text-light">
        <CSidebarNav>
          <CNavItem className="bg-dark text-center d-flex">
            <HiArchive className="sidebar_icon mx-2 my-1" />
            <h5 className="mx-5 my-1 fw-bolder">INSTACART</h5>
          </CNavItem>
          <CNavTitle className="">A CRM App for all your needs...</CNavTitle>
          <CNavItem className="d-flex">
            <HiHome className="sidebar_icon mx-2 my-1" />
            <div className="mx-5 my-1 fw-bold">Home</div>
          </CNavItem>
          <CNavItem className="d-flex">
            <HiOutlineLogout className="sidebar_icon mx-2 my-1" />
            <div
              className="logout mx-5 my-1 fw-bold"
              onClick={() => logoutFn()}
            >
              Logout
            </div>
          </CNavItem>
        </CSidebarNav>
        <CSidebarToggler />
      </CSidebar>
    </div>
  );
};
