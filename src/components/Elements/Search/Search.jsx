import { FaSearch } from "react-icons/fa";

const Search = () => {
  return (
    <div className="relative w-full sm:w-[25%]">
      {" "}
      <input
        type="text"
        className="w-full text-sm border p-1 pr-8 pl-3 border-[#00a78e] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00a78e] focus:ring-offset-1"
        placeholder="Search"
      />
      <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
        <FaSearch size={15} className="text-gray-500 opacity-50" />
      </span>
    </div>
  );
};

export default Search;




