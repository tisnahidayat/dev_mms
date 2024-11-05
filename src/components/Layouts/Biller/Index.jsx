import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "../Sidebar";
import Header from "../Asset/Header";
import Breadcumbs from "../Asset/Breadcumbs";
import Search from "../../Elements/Search/Search";
import Dropdown from "../../Elements/Search/Dropdown";
import SidebarMobile from "../SidebarMobile";
import { FaPlusCircle } from "react-icons/fa";

const Index = () => {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const activeItem = location.pathname === "/biller" ? "Biller" : "";
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null); // Sidebar reference

  const data = [
    {
      no: 1,
      appd: "APPD001",
      billerName: "Universitas Ahmad Dahlan",
      picName: "Customer Service",
      status: "Proposed",
      by: "Cabang Pembantu",
    },
    {
      no: 2,
      appd: "APPD002",
      billerName: "PT Telekomunikasi Indonesia",
      picName: "Support",
      status: "Approved",
      by: "Cabang Utama",
    },
    {
      no: 3,
      appd: "APPD003",
      billerName: "Rumah Sakit Islam",
      picName: "Teller",
      status: "Completed",
      by: "Cabang Utama",
    },
  ];

  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.appd.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.billerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "All" || item.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSortStatus = (status) => {
    setSelectedStatus(status);
  };

  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth < 900;
      setIsMobile(mobileView);
      if (mobileView) {
        setIsSidebarOpen(false); // Close sidebar by default on mobile
      } else {
        setIsSidebarOpen(true); // Open sidebar by default on desktop
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        isSidebarOpen
      ) {
        setIsSidebarOpen(false); // Close sidebar if click is outside sidebar
      }
    };

    if (isMobile && isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobile, isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar Component */}
      <Sidebar
        ref={sidebarRef} // Attach ref to Sidebar
        activeItem={activeItem}
        isMobile={isMobile}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Main Content */}
      <main className="flex-1 p-5 overflow-auto">
        {/* Show SidebarMobile toggle button only in mobile view */}
        {isMobile && (
          <SidebarMobile onClick={toggleSidebar}>Biller</SidebarMobile>
        )}

        {/* Header, Breadcrumbs, and Content */}
        <Header
          title="Biller"
          subTitle="View and manage all registered billers."
        />
        <Breadcumbs
          items={[
            { title: "List Biller", path: "/biller" },
            { title: "Check Detail"},
          ]}
        >
          Biller
        </Breadcumbs>

        <div className="flex flex-col gap-1 p-2 border-2 rounded-md border-[#00a78e] mb-3">
          <h1 className="text-lg font-semibold text-[#00a78e] mx-2">
            List Biller
          </h1>
          <div className="flex flex-col gap-1 p-3 mx-2 border-2 rounded-md border-[#00a78e] shadow-sm shadow-slate-400 bg-[#F3F3F3]">
            <div className="flex flex-col sm:flex-row gap-3 my-3 w-full">
              <Search
                className="sm:w-[50%] w-full"
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
              <Dropdown
                options={[
                  "Approved",
                  "Proposed",
                  "Rejected",
                  "Revision",
                  "Completed",
                ]}
                selectedValue={selectedStatus}
                onSelect={handleSortStatus}
                className="sm:w-[50%] w-full"
              />
              <button className="w-full sm:w-auto font-semibold text-sm text-white py-1 px-2 bg-[#00a78e] rounded-md ml-auto">
                <Link
                  to="/biller/create"
                  className="flex items-center justify-center gap-2"
                >
                  Create Biller <FaPlusCircle />
                </Link>
              </button>
            </div>

            {/* Table Content */}
            <div className="overflow-auto">
              {filteredData.length > 0 ? (
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-white uppercase bg-[#00a78e] border-b border-gray-300">
                    <tr>
                      <th className="px-4 py-3">No</th>
                      <th className="px-4 py-3">No APPD</th>
                      <th className="px-4 py-3">Biller Name</th>
                      <th className="px-4 py-3">PIC Name</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">By</th>
                      <th className="px-4 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((item, index) => (
                      <tr
                        key={item.no}
                        className="bg-white border-b hover:bg-gray-50"
                      >
                        <td className="px-4 py-3">{index + 1}</td>
                        <td className="px-4 py-3">{item.appd}</td>
                        <td className="px-4 py-3">{item.billerName}</td>
                        <td className="px-4 py-3">{item.picName}</td>
                        <td className="px-4 py-3">{item.status}</td>
                        <td className="px-4 py-3">{item.by}</td>
                        <td className="px-4 py-3"><Link to={`/biller/check-detail`}>Check Detail</Link></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-white uppercase bg-[#00a78e] border-b border-gray-300">
                    <tr>
                      <th className="px-4 py-3">No</th>
                      <th className="px-4 py-3">No APPD</th>
                      <th className="px-4 py-3">Biller Name</th>
                      <th className="px-4 py-3">PIC Name</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">By</th>
                      <th className="px-4 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b hover:bg-gray-50">
                      <td
                        className="px-4 py-3 text-center text-medium font-semibold opacity-75"
                        colSpan={7}
                      >
                        Data Not Available
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
