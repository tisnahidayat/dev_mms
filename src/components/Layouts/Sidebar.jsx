import React, { useState, useEffect, forwardRef } from "react";
import {
  FaAlignLeft,
  FaUserCircle,
  FaSignOutAlt,
  FaPlusSquare,
  FaClipboardList,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../services/authAPI";
import Cookies from "js-cookie";

const menuItems = [
  { icon: FaPlusSquare, label: "Biller", path: "/biller" },
  { icon: FaClipboardList, label: "Maintenance", path: "/maintenance" },
];

const Sidebar = forwardRef(
  ({ activeItem, isMobile, isSidebarOpen, toggleSidebar }, ref) => {
    const [open, setOpen] = useState(true);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleToggleSidebar = () => {
      if (isMobile) {
        toggleSidebar();
      } else {
        setOpen(!open);
      }
    };

    const handleLogout = async () => {
      const accessToken = Cookies.get("token");

      try {
        await logout(accessToken);
        Cookies.remove("token");
      } catch (error) {
        console.error("Logout failed:", error);
      }

      if (isMobile) {
        toggleSidebar(); // Close the sidebar on mobile after logout
      }
      navigate("/login"); // Navigate to login page after logout
    };

    useEffect(() => {
      if (isMobile) {
        setOpen(true);
      }
    }, [isMobile]);

    return (
      <nav
        ref={ref}
        className={`shadow-md h-screen p-2 flex flex-col duration-500 bg-[#00a78e] text-white 
        ${
          isMobile
            ? isSidebarOpen
              ? "w-60 translate-x-0 absolute z-50 left-0 top-0 transition-transform duration-500"
              : "w-60 -translate-x-full absolute z-50 left-0 top-0 transition-transform duration-500"
            : open
            ? "w-60"
            : "w-16"
        }`}
      >
        <Header
          open={open}
          toggleSidebar={handleToggleSidebar}
          isMobile={isMobile}
        />
        <MenuItems
          open={open}
          activeItem={activeItem}
          isMobile={isMobile}
          toggleSidebar={toggleSidebar}
        />
        <Footer open={open} user={user} />
        <Logout open={open} onLogout={handleLogout} />{" "}
        {/* Pass the handleLogout function */}
      </nav>
    );
  }
);

const Header = ({ open, toggleSidebar }) => (
  <div className="px-3 py-2 h-20 flex justify-between items-center border-b-2">
    <img
      src="/images/logo-bsi-white.png"
      alt="logo-bsi"
      className={`${open ? "w-[60%]" : "w-0"} rounded-md`}
    />
    <FaAlignLeft
      size={20}
      className={`duration-500 cursor-pointer ${!open && "rotate-90"} $`}
      onClick={toggleSidebar}
    />
  </div>
);

const MenuItems = ({ open, activeItem, isMobile, toggleSidebar }) => (
  <ul className="flex-1 overflow-x-hidden">
    {menuItems.map((item, index) => {
      const Icon = item.icon;
      const isActive = activeItem === item.label;

      return (
        <li
          key={index}
          className={`flex items-center gap-2 p-3 my-2 rounded-md cursor-pointer transition-transform duration-300 ease-in-out transform ${
            isActive
              ? "bg-white text-[#00a78e] transition-colors duration-300 ease-in-out"
              : "hover:bg-[#46BCB0] hover:translate-x-0.5 transition-colors duration-300 ease-in-out"
          }`}
          onClick={() => {
            if (isMobile) toggleSidebar();
          }}
        >
          <Link to={item.path} className="flex items-center w-full">
            <Icon size={20} className="flex-shrink-0 mr-2" />
            <span
              className={`duration-500 overflow-hidden ${
                !open ? "w-0 hidden" : "translate-x-0"
              } text-xs md:text-sm lg:text-md`}
            >
              {item.label}
            </span>
          </Link>
        </li>
      );
    })}
  </ul>
);

const Footer = ({ open }) => (
  <div
    className={`flex items-center border-t-2 ${
      open ? "pt-5 mb-2 px-3 py-2 gap-2" : "px-3 py-1 pt-3 mb-1"
    }`}
  >
    <FaUserCircle size={20} className="duration-500" />
    <div
      className={`leading-3 ${
        !open ? "w-0" : "translate-x-0"
      } duration-500 overflow-hidden text-xs md:text-sm`}
    >
      <p className="font-semibold">{localStorage.getItem("fullName")}</p>
      <span className="font-semibold">
        {localStorage.getItem("role")?.slice(-5)}
      </span>
    </div>
  </div>
);

const Logout = ({ open, onLogout }) => (
  <div
    className={`flex items-center gap-2 px-3 py-2 bg-[#E36F50] rounded-md cursor-pointer hover:bg-[#ea8164] transition-transform duration-300 ease-in-out transform hover:translate-x-0.5 ${
      !open ? "justify-center" : ""
    }`}
    onClick={onLogout}
  >
    <FaSignOutAlt size={20} className="duration-500" />
    <div
      className={`leading-3 ${
        !open ? "w-0 hidden" : ""
      } duration-500 overflow-hidden text-xs md:text-sm`}
    >
      <p className="font-semibold">Logout</p>
    </div>
  </div>
);

export default Sidebar;
