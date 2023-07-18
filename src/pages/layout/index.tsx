import { Outlet, useNavigate } from "react-router-dom";
import SideLeftImg from "../../assets/img/side-menu-icon.png";
import menuIcon from "../../assets/img/menu-Icon.png";
import seachIcon from "../../assets/img/search.png";
import DingIcon from "../../assets/img/02.png";
import UserIcon from "../../assets/img/03.png";
import "./index.css";
import { useEffect } from "react";
function Layout() {
  let userInfo: any = sessionStorage.getItem("userInfo");
  userInfo = userInfo ? JSON.parse(userInfo) : userInfo;
  const navigate = useNavigate();
  console.log(userInfo, "user");
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="layout-page flex  bg-white">
      <div className="layout-left  h-screen flex flex-col bg-black">
        <div className="top-img flex border-b ">
          <div className="img-wrap justify-center self-center items-center flex ">
            <img className="" src={SideLeftImg} alt="" />
          </div>
        </div>
        <div className="flex border-none mt-16 h-screen">
          <div className="flex menu-wrap bg-white w-full ">
            <div className="flex items-center ml-8 ">
              <img className="pr-2.5" src={menuIcon} alt="" />
              Dealflow
            </div>
          </div>
        </div>
      </div>
      <div className="layout-right ">
        <div className="layout-right-top flex justify-between grow mt-8 text-sm">
          <div className="layout-right-top-left">
            <div className="search-box relative ml-16">
              <img className="absolute left-2 top-3" src={seachIcon} alt="" />
              <input
                className="pl-8 border bg-grey rounded"
                type="text"
                placeholder="Search"
              />
            </div>
          </div>
          <div className="layout-right-top-right flex  items-center mr-8">
            <img className="mr-4" src={DingIcon} alt="" />
            <img className="mr-4" src={UserIcon} alt="" />
            <span>
              {userInfo && userInfo.data && userInfo.data.nickname},
              {userInfo && userInfo.data && userInfo.data.last_name}
            </span>
          </div>
        </div>
        <div className="right-container ml-16 ">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}
export default Layout;
