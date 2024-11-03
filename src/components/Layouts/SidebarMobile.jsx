import { FaAlignLeft } from "react-icons/fa";

const SidebarMobile = ({ onClick }) => {
  return (
    <div className="flex items-center w-full border-b-2 shadow-md py-3 mb-5 px-3">
      <FaAlignLeft
        size={20}
        className={`duration-500 cursor-pointer text-[#00a78e]`}
        onClick={onClick}
      />
      <div className="flex justify-center w-full">
        <h1 className="text-center font-semibold text-lg text-[#00a78e]">Biller</h1>
      </div>
    </div>
  );
};

export default SidebarMobile;
