import React, { useState } from "react";

function FileInputWithPreview({ label, id, onFileChange, error }) {
  const [fileName, setFileName] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name); // Simpan nama file yang dipilih
      onFileChange(id, file); // Kirim file ke fungsi induk berdasarkan id
    }
  };

  return (
    <div className="p-4 border border-[#00a78e] rounded mb-4">
      <label className="block text-sm font-medium mb-1 text-[#00a78e]">
        {label} <span className="text-red-500">*</span>
      </label>
      <p className="text-xs mb-4 text-gray-600">
        The file must be in PDF format and cannot exceed 5MB.
      </p>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="hidden"
        id={id}
      />
      <div className="flex justify-center">
        <label
          htmlFor={id}
          className="px-4 py-2 rounded-md border-2 w-[55%] border-blue-500 text-blue-700 font-semibold text-center cursor-pointer text-sm"
        >
          {fileName ? (
            <>
              📄 <span className="ml-2">{fileName}</span>
            </>
          ) : (
            "Upload File"
          )}
        </label>
      </div>
      <p className="text-red-500 text-xs mt-1 min-h-[1.25rem] text-center">
        {error || ""}
      </p>
    </div>
  );
}

export default FileInputWithPreview;
