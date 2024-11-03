import Header from "../Asset/Header";
import Sidebar from "../Sidebar";
import Breadcumbs from "../Asset/Breadcumbs";
import Search from "../../Elements/Search/Search";
import Dropdown from "../../Elements/Search/Dropdown";
import { useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation

const Index = () => {
  const [selectedStatus, setSelectedStatus] = useState("Approved");
  const location = useLocation(); // Mengambil lokasi saat ini
  const activeItem = location.pathname === "/" ? "Biller" : "Maintenance";

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activeItem={activeItem} />
      <main className="flex-1 p-5 overflow-auto ">
        <Header
          title={"Maintenance"}
          subTitle={"View and manage all maintenanced billers.."}
        />
        <Breadcumbs title={"Maintenance"} text={"List Maintenance"} />
        <div className="flex flex-col gap-1 p-2 border-2 rounded-md border-[#00a78e] mb-3">
          <h1 className="text-lg font-semibold text-[#00a78e] mx-2">
            List Maintenance
          </h1>
          <div className="flex flex-col gap-1 p-3 mx-2 border-2 rounded-md border-[#00a78e] shadow-sm shadow-slate-400 bg-[#F3F3F3]">
            <div className="flex flex-col sm:flex-row gap-2 my-3 w-full">
              <Search className="md:w-[50%] w-full" />
              <Dropdown
                options={[
                  "Approved",
                  "Proposed",
                  "Rejected",
                  "Revision",
                  "Completed",
                ]}
                selectedValue={selectedStatus}
                onSelect={(value) => setSelectedStatus(value)}
                className="md:w-[50%] w-full"
              />
            </div>

            {/* Tabel List Biller */}
            <div className="overflow-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-white uppercase bg-[#00a78e] border-b border-gray-300">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      No
                    </th>
                    <th scope="col" className="px-4 py-3">
                      No APPD
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Biller Name
                    </th>
                    <th scope="col" className="px-4 py-3">
                      PIC Name
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-4 py-3">
                      By
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b hover:bg-gray-50">
                    <td className="px-4 py-3">1</td>
                    <td className="px-4 py-3">APPD001</td>
                    <td className="px-4 py-3">Universitas Ahmad Dahlan</td>
                    <td className="px-4 py-3">Customer Service</td>
                    <td className="px-4 py-3">Proposed</td>
                    <td className="px-4 py-3">Cabang Pemabantu</td>
                    <td className="px-4 py-3">Check Detail</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-gray-50">
                    <td className="px-4 py-3">2</td>
                    <td className="px-4 py-3">APPD002</td>
                    <td className="px-4 py-3">
                      Universitas Muhammadiyah Yogyakarta
                    </td>
                    <td className="px-4 py-3">Teller</td>
                    <td className="px-4 py-3">Completed </td>
                    <td className="px-4 py-3">Kantor Pusat</td>
                    <td className="px-4 py-3">Check Detail</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-gray-50">
                    <td className="px-4 py-3">3</td>
                    <td className="px-4 py-3">APPD003</td>
                    <td className="px-4 py-3">Universitas Gadjah Mada</td>
                    <td className="px-4 py-3">Customer Service</td>
                    <td className="px-4 py-3">Proposed</td>
                    <td className="px-4 py-3">-</td>
                    <td className="px-4 py-3">Check Detail</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-gray-50">
                    <td className="px-4 py-3">4</td>
                    <td className="px-4 py-3">APPD004</td>
                    <td className="px-4 py-3">Universitas Islam Indonesia</td>
                    <td className="px-4 py-3">Marketing</td>
                    <td className="px-4 py-3">Revision</td>
                    <td className="px-4 py-3">Cabang Pembantu</td>
                    <td className="px-4 py-3">Check Detail</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-gray-50">
                    <td className="px-4 py-3">5</td>
                    <td className="px-4 py-3">APPD005</td>
                    <td className="px-4 py-3">Universitas Negeri Yogyakarta</td>
                    <td className="px-4 py-3">Customer Service</td>
                    <td className="px-4 py-3">Completed</td>
                    <td className="px-4 py-3">Kantor Pusat</td>
                    <td className="px-4 py-3">Check Detail</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
