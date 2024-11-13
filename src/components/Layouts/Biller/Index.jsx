import React, { useState, useEffect, useRef, useMemo } from "react"; // Import useMemo untuk optimalisasi
import { Link, useLocation } from "react-router-dom";
import Sidebar from "../Sidebar";
import Header from "../Asset/Header";
import Breadcumbs from "../Asset/Breadcumbs";
import Search from "../../Elements/Search/Search";
import Dropdown from "../../Elements/Search/Dropdown";
import SidebarMobile from "../SidebarMobile";
import { FaPlusCircle, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Index = () => {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const activeItem = location.pathname === "/biller" ? "Biller" : "";
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const data = useMemo(
    () => [
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
      {
        no: 4,
        appd: "APPD004",
        billerName: "Bank BRI",
        picName: "Account Manager",
        status: "Revision",
        by: "Cabang Pembantu",
      },
      {
        no: 5,
        appd: "APPD005",
        billerName: "Perusahaan ABC",
        picName: "Customer Service",
        status: "Rejected",
        by: "Cabang Utama",
      },
      {
        no: 6,
        appd: "APPD006",
        billerName: "Perusahaan XYZ",
        picName: "Manager",
        status: "Proposed",
        by: "Cabang Utama",
      },
      {
        no: 7,
        appd: "APPD007",
        billerName: "Sekolah A",
        picName: "Admin",
        status: "Approved",
        by: "Cabang Pembantu",
      },
    ],
    []
  );

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        item.appd.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.billerName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        selectedStatus === "All" || item.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [data, searchTerm, selectedStatus]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleSortStatus = (status) => {
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth < 900;
      setIsMobile(mobileView);
      if (mobileView) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
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

        <Header
          title="Biller"
          subTitle="View and manage all registered billers."
        />
        <Breadcumbs
          items={[
            { title: "List Biller", path: "/biller" },
            { title: "Check Detail" },
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
                setSearchTerm={handleSearchChange}
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

            <div className="overflow-auto">
              {currentData.length > 0 ? (
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
                    {currentData.map((item, index) => (
                      <tr
                        key={item.no}
                        className="bg-white border-b hover:bg-gray-50"
                      >
                        <td className="px-4 py-3">
                          {indexOfFirstItem + index + 1}
                        </td>
                        <td className="px-4 py-3">{item.appd}</td>
                        <td className="px-4 py-3">{item.billerName}</td>
                        <td className="px-4 py-3">{item.picName}</td>
                        <td className="px-4 py-3">{item.status}</td>
                        <td className="px-4 py-3">{item.by}</td>
                        <td className="px-4 py-3">
                          <Link to={`/biller/check-detail`}>Check Detail</Link>
                        </td>
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

            {/* Pagination */}
            <div className="flex justify-center mt-4">
              <nav className="inline-flex items-center">
                {/* Prev Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`w-8 h-8 flex items-center justify-center border rounded ${
                    currentPage === 1
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <FaChevronLeft size={15} />
                </button>

                {/* Page Numbers with Ellipsis */}
                {Array.from({ length: totalPages }, (_, index) => {
                  const pageNumber = index + 1;
                  const showPage =
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 &&
                      pageNumber <= currentPage + 1);

                  if (showPage) {
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`w-8 h-8 flex items-center justify-center border rounded ${
                          currentPage === pageNumber
                            ? "bg-[#00a78e] text-white"
                            : "bg-white text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  } else if (
                    (pageNumber === currentPage - 2 ||
                      pageNumber === currentPage + 2) &&
                    totalPages > 5
                  ) {
                    return (
                      <span
                        key={`ellipsis-${pageNumber}`}
                        className="w-8 h-8 flex items-center justify-center text-gray-500"
                      >
                        ...
                      </span>
                    );
                  }
                  return null;
                })}

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`w-8 h-8 flex items-center justify-center border rounded ${
                    currentPage === totalPages
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <FaChevronRight size={15} />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
