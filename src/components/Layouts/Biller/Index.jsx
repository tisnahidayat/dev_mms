import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../Sidebar";
import Header from "../Asset/Header";
import Breadcumbs from "../Asset/Breadcumbs";
import Search from "../../Elements/Search/Search";
import Dropdown from "../../Elements/Search/Dropdown";
import SidebarMobile from "../SidebarMobile";

const Index = () => {
  const [selectedStatus, setSelectedStatus] = useState("Approved");
  const location = useLocation();
  const activeItem = location.pathname === "/" ? "Biller" : "Maintenance";
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null); // Sidebar reference

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
        {isMobile && <SidebarMobile onClick={toggleSidebar} />}

        {/* Header, Breadcrumbs, and Content */}
        <Header
          title="Biller"
          subTitle="View and manage all registered billers."
        />
        <Breadcumbs title="Biller" text="List Biller" />
        <div className="flex flex-col gap-1 p-2 border-2 rounded-md border-[#00a78e] mb-3">
          <h1 className="text-lg font-semibold text-[#00a78e] mx-2">
            List Biller
          </h1>
          <div className="flex flex-col gap-1 p-3 mx-2 border-2 rounded-md border-[#00a78e] shadow-sm shadow-slate-400 bg-[#F3F3F3]">
            <div className="flex flex-col sm:flex-row gap-3 my-3 w-full">
              <Search className="sm:w-[50%] w-full" />
              <Dropdown
                options={[
                  "Approved",
                  "Proposed",
                  "Rejected",
                  "Revision",
                  "Completed",
                ]}
                selectedValue={selectedStatus}
                onSelect={(value) => setSelectedStatus(value)}
                className="sm:w-[50%] w-full"
              />
              <button className="w-full sm:w-auto font-semibold text-sm text-white py-1 px-2 bg-[#00a78e] rounded-md ml-auto">
                Create Biller
              </button>
            </div>

            {/* Table Content */}
            <div className="overflow-auto">
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
                  {/* Sample Row Data */}
                  <tr className="bg-white border-b hover:bg-gray-50">
                    <td className="px-4 py-3">1</td>
                    <td className="px-4 py-3">APPD001</td>
                    <td className="px-4 py-3">Universitas Ahmad Dahlan</td>
                    <td className="px-4 py-3">Customer Service</td>
                    <td className="px-4 py-3">Proposed</td>
                    <td className="px-4 py-3">Cabang Pembantu</td>
                    <td className="px-4 py-3">Check Detail</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-gray-50">
                    <td className="px-4 py-3">2</td>
                    <td className="px-4 py-3">APPD002</td>
                    <td className="px-4 py-3">PT Telekomunikasi Indonesia</td>
                    <td className="px-4 py-3">Support</td>
                    <td className="px-4 py-3">Approved</td>
                    <td className="px-4 py-3">Cabang Utama</td>
                    <td className="px-4 py-3">View Details</td>
                  </tr>
                  {/* Additional sample rows */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
