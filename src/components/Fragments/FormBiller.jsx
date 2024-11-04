import React from "react";
import InputBiller from "../Elements/InputBiller/InputBiller";
import SelectBiller from "../Elements/InputBiller/SelectBiller";
import FileInputWithPreview from "../Elements/InputBiller/FileInputWithPreview";

function BillerForm({
  formData,
  onInputChange,
  onFileChange,
  onSubmit,
  errors,
}) {
  return (
    <form onSubmit={onSubmit} className="mx-auto">
      {/* Section 1: Biller Name and Type of Business */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <InputBiller
          label="Biller Name"
          placeholder="Enter biller name..."
          required
          autoFocus
          value={formData.billerName}
          onChange={(e) => onInputChange("billerName", e.target.value)}
          error={errors.billerName}
        />
        <SelectBiller
          label="Type of Business"
          options={[
            { label: "Retail", value: "retail" },
            { label: "Finance", value: "finance" },
            { label: "Healthcare", value: "healthcare" },
          ]}
          required
          value={formData.typeOfBusiness}
          onChange={(e) => onInputChange("typeOfBusiness", e.target.value)}
          error={errors.typeOfBusiness}
        />
      </div>

      {/* Section 2: Biller Address */}
      <div className="grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <InputBiller
          label="Biller Address"
          type="email"
          placeholder="Enter biller address..."
          required
          value={formData.billerAddress}
          onChange={(e) => onInputChange("billerAddress", e.target.value)}
          error={errors.billerAddress}
        />
      </div>

      {/* Section 3: Biller Phone Number, PIC Name, and Department */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <InputBiller
          label="Biller Phone Number"
          placeholder="Enter biller phone number..."
          required
          value={formData.billerPhoneNumber}
          onChange={(e) => onInputChange("billerPhoneNumber", e.target.value)}
          error={errors.billerPhoneNumber}
        />
        <InputBiller
          label="Biller Email"
          placeholder="Enter biller email..."
          required
          value={formData.billerEmail}
          onChange={(e) => onInputChange("billerEmail", e.target.value)}
          error={errors.billerEmail}
        />
        <InputBiller
          label="PIC Name"
          placeholder="Enter PIC name..."
          required
          value={formData.picName}
          onChange={(e) => onInputChange("picName", e.target.value)}
          error={errors.picName}
        />
      </div>

      {/* Section 4: Transaction Fee, Transaction Scheme, and Fees Covered By */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <SelectBiller
          label="Department"
          options={[
            { label: "Sales", value: "sales" },
            { label: "Marketing", value: "marketing" },
            { label: "IT", value: "it" },
          ]}
          required
          value={formData.department}
          onChange={(e) => onInputChange("department", e.target.value)}
          error={errors.department}
        />
        <InputBiller
          label="Transaction Fee"
          placeholder="Enter transaction fee..."
          required
          value={formData.transactionFee}
          onChange={(e) => onInputChange("transactionFee", e.target.value)}
          error={errors.transactionFee}
        />
        <SelectBiller
          label="Transaction Scheme"
          options={[
            { label: "Scheme A", value: "scheme_a" },
            { label: "Scheme B", value: "scheme_b" },
            { label: "Scheme C", value: "scheme_c" },
          ]}
          required
          value={formData.transactionScheme}
          onChange={(e) => onInputChange("transactionScheme", e.target.value)}
          error={errors.transactionScheme}
        />
      </div>

      {/* Section 5: Settlement Account Number */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <SelectBiller
          label="Fees Covered By"
          options={[
            { label: "Company", value: "company" },
            { label: "Client", value: "client" },
          ]}
          required
          value={formData.feesCoveredBy}
          onChange={(e) => onInputChange("feesCoveredBy", e.target.value)}
          error={errors.feesCoveredBy}
        />
        <InputBiller
          label="Settlement Account Number"
          placeholder="Enter account number..."
          required
          value={formData.settlementAccountNumber}
          onChange={(e) =>
            onInputChange("settlementAccountNumber", e.target.value)
          }
          error={errors.settlementAccountNumber}
        />
      </div>

      {/* Supporting Document Section */}
      <h1 className="text-lg font-semibold text-[#00a78e]">
        Supporting Documents
        <span className="block border rounded-md border-[#00a78e] my-2"></span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 my-4 w-[80%] mx-auto">
        {/* PKS Document */}
        <FileInputWithPreview
          label="Upload PKS"
          id="pks"
          onFileChange={(id, file) => handleFileChange(id, file)}
          error={errors.pks}
        />

        {/* BPI Document */}
        <FileInputWithPreview
          label="Upload BPI"
          id="bpi"
          onFileChange={(id, file) => handleFileChange(id, file)}
          error={errors.bpi}
        />

        {/* Surat Cabang Document */}
        <FileInputWithPreview
          label="Upload Surat Cabang"
          id="suratCabang"
          onFileChange={(id, file) => handleFileChange(id, file)}
          error={errors.suratCabang}
        />

        {/* Bukti Biaya Setup Document */}
        <FileInputWithPreview
          label="Upload Bukti Biaya Setup"
          id="buktiBiayaSetup"
          onFileChange={(id, file) => handleFileChange(id, file)}
          error={errors.buktiBiayaSetup}
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end my-6">
        <button
          type="button"
          className="bg-gray-200 text-black px-4 py-2 rounded mr-2"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-[#00a78e] text-white px-4 py-2 rounded"
        >
          Continue
        </button>
      </div>
    </form>
  );
}

export default BillerForm;
