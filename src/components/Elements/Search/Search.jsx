import React from "react";
import { FaSearch } from "react-icons/fa";

const Search = ({ value, onChange }) => {
  return (
    <div className="relative w-full sm:w-[25%]">
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full text-sm border p-1 pr-8 pl-3 rounded focus:outline-none focus:ring-1 focus:ring-[#00a78e] border-[#00a78e]"
        placeholder="Search No APPD or Biller Name"
      />
      <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
        <FaSearch size={15} className="text-gray-500 opacity-50" />
      </span>
    </div>
  );
};

export default Search;
