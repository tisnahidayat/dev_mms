import React, { useState } from "react";
import { FaRegFilePdf, FaUpload } from "react-icons/fa";

function FileInputWithPreview({ label, id, onFileChange, error }) {
  const [fileName, setFileName] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileChange(id, file);
    }2
  };

  return (
    <div className="p-4 border-2 border-[#00a78e] rounded mb-4">
      <label className="block text-medium font-medium mb-1 text-[#00a78e]">
        {label} <span className="text-red-500">*</span>
      </label>
      <p className="text-sm mb-4 text-gray-600">
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
          className="px-4 py-2 rounded-md border-2 w-[55%] border-blue-500 text-blue-700 font-semibold text-center cursor-pointer text-sm transition-scale duration-300 ease-in-out hover:border-blue-700 hover:scale-105"
        >
          {fileName ? (
            <div className="flex items-center justify-center space-x-1">
              <FaRegFilePdf size={16} className="text-red-500 flex-shrink-0" />
              <span className="truncate w-32" title={fileName}>
                {fileName}
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-1">
              <span>Upload File</span>
              <FaUpload size={16} className="text-blue-500 flex-shrink-0" />
            </div>
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
