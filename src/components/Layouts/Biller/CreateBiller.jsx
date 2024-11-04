import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../Sidebar";
import Header from "../Asset/Header";
import Breadcumbs from "../Asset/Breadcumbs";
import SidebarMobile from "../SidebarMobile";
import FormBiller from "../../Fragments/FormBiller";
const CreateBiller = () => {
  const location = useLocation();
  const activeItem = location.pathname === "/biller/create" ? "Biller" : "";
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [formData, setFormData] = useState({
    billerName: "",
    typeOfBusiness: "",
    billerAddress: "",
    billerEmail: "",
    billerPhoneNumber: "",
    picName: "",
    department: "",
    transactionFee: "",
    transactionScheme: "",
    feesCoveredBy: "",
    settlementAccountNumber: "",
    supportingDocuments: {
      pks: null,
      bpi: null,
      suratCabang: null,
      buktiBiayaSetup: null,
    },
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
      setIsSidebarOpen(!isMobile);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleFileChange = (id, file) => {
    setFormData((prevData) => ({
      ...prevData,
      supportingDocuments: {
        ...prevData.supportingDocuments,
        [id]: file,
      },
    }));

    // Reset error jika ada file yang dipilih
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: "",
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form Data Submitted:", formData);
    }
  };

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    const validateForm = () => {
      const newErrors = {};
      if (!formData.billerName)
        newErrors.billerName = "Biller name is required.";
      if (!formData.typeOfBusiness)
        newErrors.typeOfBusiness = "Type of business is required.";
      if (!formData.billerAddress)
        newErrors.billerAddress = "Biller address is required.";
      if (!formData.billerEmail)
        // Pastikan key sesuai dengan formData
        newErrors.billerEmail = "Biller email is required.";
      if (!formData.billerPhoneNumber)
        newErrors.billerPhoneNumber = "Biller phone number is required.";
      if (!formData.picName) newErrors.picName = "PIC name is required.";
      if (!formData.department)
        newErrors.department = "Department is required.";
      if (!formData.transactionFee)
        newErrors.transactionFee = "Transaction fee is required.";
      if (!formData.transactionScheme)
        newErrors.transactionScheme = "Transaction scheme is required.";
      if (!formData.feesCoveredBy)
        newErrors.feesCoveredBy = "Fees covered by is required.";
      if (!formData.settlementAccountNumber)
        newErrors.settlementAccountNumber =
          "Settlement account number is required.";
      // Validasi untuk setiap dokumen pendukung
      if (!formData.supportingDocuments.pks)
        newErrors.pks = "PKS document is required.";
      if (!formData.supportingDocuments.bpi)
        newErrors.bpi = "BPI document is required.";
      if (!formData.supportingDocuments.suratCabang)
        newErrors.suratCabang = "Surat Cabang is required.";
      if (!formData.supportingDocuments.buktiBiayaSetup)
        newErrors.buktiBiayaSetup = "Bukti Biaya Setup is required.";

      return newErrors;
    };
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
          title="Create Biller"
          subTitle="Fill in the details to set up a new biller account."
        />
        <Breadcumbs
          items={[
            { title: "List Biller", path: "/biller" },
            { title: "Create Biller", path: "/biller/create" },
          ]}
        >
          Biller
        </Breadcumbs>
        <div className="flex flex-col gap-1 p-2 border-2 rounded-md border-[#00a78e] mb-3">
          <h1 className="text-lg font-semibold text-[#00a78e] mx-2">
            Biller Information
          </h1>
          <span className="border border-[#00a78e] rounded-md"></span>
          <div className="p-2">
            <FormBiller
              formData={formData}
              onInputChange={handleInputChange}
              onFileChange={handleFileChange}
              onSubmit={handleFormSubmit}
              errors={errors}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateBiller;
