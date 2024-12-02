import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "../Sidebar";
import Header from "../Asset/Header";
import Breadcumbs from "../Asset/Breadcumbs";
import Search from "../../Elements/Search/Search";
import Dropdown from "../../Elements/Search/Dropdown";
import SidebarMobile from "../SidebarMobile";
import { FaPlusCircle } from "react-icons/fa";
import { fetchBillers, detailBiller } from "../../../services/billerAPI"; // Import fetchBillers

const Index = () => {
  const location = useLocation();
  const sidebarRef = useRef(null);

  // State hooks
  const [billersData, setBillersData] = useState([]);
  const [loading, setLoading] = useState(false); // Untuk menangani loading state
  const [error, setError] = useState(null); // Untuk menangani error
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const activeItem = location.pathname === "/biller" ? "Biller" : "";

  // Fetching billers data from API
  const loadBillersData = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchBillers();
      setBillersData(data.data.listBiller);
    } catch (err) {
      setError("Failed to fetch billers data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle window resize for mobile view
  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth < 900;
      setIsMobile(mobileView);
      setIsSidebarOpen(!mobileView); // Automatically open sidebar on desktop
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle click outside of sidebar to close on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        isSidebarOpen
      ) {
        setIsSidebarOpen(false);
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

  // Toggle sidebar on mobile
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Load billers data on component mount
  useEffect(() => {
    loadBillersData();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        ref={sidebarRef}
        activeItem={activeItem}
        isMobile={isMobile}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <main className="flex-1 p-5 overflow-auto">
        {isMobile && (
          <SidebarMobile onClick={toggleSidebar}>Biller</SidebarMobile>
        )}

        {/* Header and Breadcumbs */}
        <Header
          title="Biller"
          subTitle="View and manage all registered billers."
        />
        <Breadcumbs
          items={[
            { title: "List Biller", path: "/biller" },
            { title: "Create Biller" },
          ]}
        >
          Biller
        </Breadcumbs>

        {/* Search and Dropdown */}
        <div className="flex flex-col p-2 border-2 rounded-md border-[#00a78e] mb-3">
          <h1 className="text-lg font-semibold text-[#00a78e] mx-2">
            List Biller
          </h1>
          <div className="flex flex-col sm:flex-row gap-3 my-3 w-full">
            <Search />
            <Dropdown
              options={[
                "Approved",
                "Proposed",
                "Rejected",
                "Revision",
                "Completed",
              ]}
            />
            <Link
              to="/biller/create"
              className="w-full sm:w-auto font-semibold text-sm text-white py-1 px-2 bg-[#00a78e] rounded-md ml-auto hover:bg-[#00a78e]/80 hover:text-white ease-in-out duration-200"
            >
              <span className="flex items-center justify-center gap-2">
                Create Biller <FaPlusCircle />
              </span>
            </Link>
          </div>

          {/* Billers Table */}
          <div className="overflow-x-auto">
            {loading ? (
              <div className="text-center text-gray-500">Loading...</div>
            ) : error ? (
              <div className="text-center text-red-500">{error}</div>
            ) : billersData.length > 0 ? (
              <table className="min-w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-center text-white uppercase bg-[#00a78e] border-b border-gray-300">
                  <tr>
                    <th className="px-4 py-3">No</th>
                    <th className="px-4 py-3">No APPD</th>
                    <th className="px-4 py-3 hidden md:table-cell">
                      Biller Name
                    </th>
                    <th className="px-4 py-3 hidden lg:table-cell">PIC Name</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 hidden lg:table-cell">By</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {billersData.map((item, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3">{item.appd}</td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        {item.name}
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        {item.picName}
                      </td>
                      <td className="flex px-4 py-3 items-center justify-center">
                        <span
                          className={`py-1 w-[70%] text-center text-xs rounded-lg text-white capitalize ${
                            item.submissionStatus === "APPROVED"
                              ? "bg-[#18908E]"
                              : item.submissionStatus === "PROPOSED"
                              ? "bg-[#106EF2]"
                              : item.submissionStatus === "REJECTED"
                              ? "bg-[#D1351D]"
                              : item.submissionStatus === "REVISION"
                              ? "bg-[#F9B300]"
                              : item.submissionStatus === "COMPLETED"
                              ? "bg-gray-500"
                              : "bg-gray-300"
                          }`}
                        >
                          {item.submissionStatus.toLowerCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        {item.createdBy}
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          to={`/biller/detail/${item.id}`}
                          className="text-blue-600 hover:underline"
                        >
                          Check Detail
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center text-gray-500">
                Data Not Available
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
