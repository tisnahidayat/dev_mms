import React from "react";
import { FaAngleRight } from "react-icons/fa";

const Breadcrumbs = ({ title, text }) => {
  return (
    <div className="text-sm my-2">
      <ul className="flex items-center text-slate-600 font-medium space-x-2">
        <li className="flex items-center">
          <a href="#" className="hover:text-[#00a78e] transition duration-200">
            {title}
          </a>
        </li>
        <FaAngleRight className="mx-2 text-xs text-gray-400" />
        <li>
          <a href="#" className="text-[#00a78e] font-semibold ">
            {text}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Breadcrumbs;
