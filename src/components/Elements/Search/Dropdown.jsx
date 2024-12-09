import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

const Dropdown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [selectedValue, setSelectedValue] = useState(""); // Awalnya kosong

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value) => {
    setSelectedValue(value === "All" ? "" : value);
    onSelect(value);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const optionsWithAll = ["All", ...options];

  return (
    <div ref={dropdownRef} className="relative w-full sm:w-[30%]">
      <div
        onClick={handleToggle}
        className={`w-full text-sm border p-1 pr-8 pl-3 cursor-pointer bg-white ${
          isOpen
            ? "border-[#00a78e] ring-1 ring-[#00a78e]"
            : "border-[#00a78e]"
        } ${selectedValue ? "text-slate-400" : "text-slate-400"}`}
        style={{ borderRadius: "4px" }}
      >
        {selectedValue || "Sort Status"}
        <span
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <FaChevronDown size={15} className="opacity-50" />
        </span>
      </div>

      {isOpen && (
        <ul className="absolute w-full bg-white border border-[#00a78e] mt-1 z-10 rounded-md overflow-hidden">
          {optionsWithAll.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option)}
              className="p-1.5 text-sm text-slate-700 border-b hover:bg-[#00a78e] hover:text-white cursor-pointer transition-colors duration-300"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
