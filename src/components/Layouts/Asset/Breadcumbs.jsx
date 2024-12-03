import React from "react";
import { FaAngleRight } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Breadcrumbs = ({ items, children }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="text-sm my-2">
      <ul className="flex items-center text-slate-600 font-medium space-x-2">
        {/* Item pertama menggunakan children untuk "Biller" */}
        <li className="flex items-center">
          {children}
          {items.length > 0 && (
            <FaAngleRight className="mx-2 text-xs text-gray-400" />
          )}
        </li>

        {/* Render item berikutnya dari props items */}
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <a
              href={item.path}
              className={`${
                currentPath === item.path
                  ? "text-[#00a78e] font-semibold"
                  : ""
              } transition duration-200`}
            >
              {item.title}
            </a>
            {/* Tampilkan ikon jika bukan item terakhir */}
            {index < items.length - 1 && (
              <FaAngleRight className="mx-2 text-xs text-gray-400" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
