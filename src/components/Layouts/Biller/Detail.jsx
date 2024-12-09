import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import Sidebar from "../Sidebar";
import Header from "../Asset/Header";
import Breadcumbs from "../Asset/Breadcumbs";
import SidebarMobile from "../SidebarMobile";
import { detailBiller, approveBranch } from "../../../services/billerAPI";
import { FaDownload } from "react-icons/fa";

const Detail = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [billerData, setBillerData] = useState({});
  const sidebarRef = useRef(null);
  const { id } = useParams();
  const activeItem =
    location.pathname === `/biller/detail/${id}` ? "Biller" : "";

  // Handle window resize
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

  // Handle click outside sidebar
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

  useEffect(() => {
    const fetchBillerDetail = async () => {
      try {
        const response = await detailBiller(id);
        setBillerData(response.data.biller);
        console.log("Detail Biller Data:", response.data.biller);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBillerDetail();
  }, [id]);

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleApprove = async () => {
    try {
      const response = await approveBranch(id);
      console.log("Approval successful:", response.data);
      alert("Biller approved successfully!");
    } catch (error) {
      console.error("Error approving biller:", error);
      alert("Failed to approve biller.");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar Component */}
      <Sidebar
        ref={sidebarRef}
        activeItem={activeItem}
        isMobile={isMobile}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Main Content */}
      <main className="flex-1 p-5 overflow-auto">
        {isMobile && (
          <SidebarMobile onClick={toggleSidebar}>Biller</SidebarMobile>
        )}

        {/* Header and Breadcrumbs */}
        <Header
          title="Biller Details"
          subTitle="Review the details of your new submission before proceeding."
        />
        <Breadcumbs
          items={[
            { title: "List Biller", path: "/biller" },
            { title: "Check Detail", path: `/biller/detail/${id}` },
          ]}
        >
          Biller
        </Breadcumbs>

        <div className="flex flex-col items-center">
          {/* Wrapper dengan breakpoints responsif */}
          <div className="bg-white rounded-lg w-full flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
            {/* Biller Information */}
            <div className="w-full lg:w-1/2 border-2 rounded-lg p-4 border-[#00a78e]">
              <h2 className="font-semibold text-lg mb-2 border-b-2 border-[#00a78e] text-[#00a78e]">
                Biller Information
              </h2>
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="font-medium">Biller Name</td>
                    <td>: {billerData.name}</td>
                  </tr>
                  <tr>
                    <td className="font-medium">Type of Business</td>
                    <td>: {billerData.businessCategory}</td>
                  </tr>
                  <tr>
                    <td className="font-medium">Biller Address</td>
                    <td>: {billerData.billerAddress}</td>
                  </tr>
                  <tr>
                    <td className="font-medium">Biller Phone Number</td>
                    <td>: {billerData.phone}</td>
                  </tr>
                  <tr>
                    <td className="font-medium">Biller Email</td>
                    <td>: {billerData.email}</td>
                  </tr>
                  <tr>
                    <td className="font-medium">PIC Name</td>
                    <td>: {billerData.picName}</td>
                  </tr>
                  <tr>
                    <td className="font-medium">Department</td>
                    <td>: </td>
                  </tr>
                  <tr>
                    <td className="font-medium">Transaction Fee</td>
                    <td>: {billerData.transactionFee}</td>
                  </tr>
                  <tr>
                    <td className="font-medium">Transaction Scheme</td>
                    <td>: {billerData.transactionScheme}</td>
                  </tr>
                  <tr>
                    <td className="font-medium">Fee Covered By</td>
                    <td>: {billerData.feeBurden}</td>
                  </tr>
                  <tr>
                    <td className="font-medium">Settlement Number</td>
                    <td>: {billerData.settlementAccountNumber}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Right Column */}
            <div className="w-full lg:w-1/2 space-y-6">
              {/* Supporting Document */}
              <div className="rounded-lg border-2 border-[#00a78e] p-4">
                <h2 className="font-semibold text-lg mb-2 border-b-2 border-[#00a78e] text-[#00a78e]">
                  Supporting Document
                </h2>
                <table className="w-full">
                  <tbody>
                    {billerData.files &&
                      billerData.files.map((file, index) => (
                        <tr key={file.id || index} className="border-b">
                          <td className="text-red-600">{file.fileName}</td>
                          <td>
                            <Link
                              to={file.fileUrl}
                              target="_blank"
                              className="text-blue-500 flex gap-2 items-center hover:text-blue-700"
                            >
                              Download <FaDownload />
                            </Link>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* History */}
              <div className="rounded-lg border-2 border-[#00a78e] p-4">
                <h2 className="font-semibold text-lg mb-2 border-b-2 border-[#00a78e] text-[#00a78e]">
                  History
                </h2>
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="font-semibold">Date</td>
                      <td>: 06/05/2024</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Time:</td>
                      <td>: 14:00</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Customer Service:</td>
                      <td>: Service Kantor Cabang</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Note:</td>
                      <td>: Pengajuan Telah Dikirim</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-6 w-full max-w-5xl">
            <button className="px-6 py-2 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50">
              Revision
            </button>
            <button
              onClick={handleApprove} // Menambahkan event handler untuk approve
              className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            >
              Approve
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Detail;
