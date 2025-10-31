import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { TbClockPin } from "react-icons/tb";
import { PiPolygonDuotone, PiListLight } from "react-icons/pi";
import { RxCircle } from "react-icons/rx";
import { SlList } from "react-icons/sl";
import { LuMap } from "react-icons/lu";

function BottomControlMenu() {
  const [showControlPanel, setShowControlPanel] = useState(false);
  return (
    <>
      <div
        className={`absolute bottom-20 right-4 z-9999 transform transition-transform duration-100 ease-in-out origin-bottom  ${
          showControlPanel ? "translate-x-0" : "translate-x-[150%]"
        }`}
      >
        <div className="flex flex-col items-end gap-2 p-4 bg-transparent">
          <button className="flex items-center p-2 bg-white rounded-md shadow-md hover:bg-gray-50 hover:scale-105 transition cursor-pointer">
            <TbClockPin size={16} className="inline-block mr-2" />
            <span className="text-sm font-semibold">Last Day</span>
          </button>
          <button className="flex items-center justify-between gap-5 py-2 px-3 bg-white rounded-md shadow-md hover:bg-gray-50 hover:scale-105 transition cursor-pointer">
            <PiPolygonDuotone size={20} className="inline-block mr-2" />
            <RxCircle size={20} className="inline-block" />
          </button>
          <button className="flex items-center p-2 bg-white rounded-md shadow-md hover:bg-gray-50 hover:scale-105 transition cursor-pointer">
            <SlList size={16} className="inline-block mr-2" />
            <span className="text-sm font-semibold">Device List Menu</span>
          </button>
          <button
            className="flex items-center p-2 bg-white rounded-md shadow-md hover:bg-gray-50 hover:scale-105 transition cursor-pointer"
          >
            <PiListLight size={16} className="inline-block mr-2" />
            <span className="text-sm font-semibold">Display All Devices</span>
          </button>
          <button className="flex items-center py-3 px-2 bg-white rounded-md shadow-md hover:bg-gray-50 hover:scale-105 transition cursor-pointer">
            <LuMap size={20} className="inline-block" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-7 right-0 transform -translate-x-1/2 text-sm z-9999">
        <button
          className="flex items-center p-2.5 bg-red-700 text-white ease-in-out rounded-full shadow-md hover:bg-red-600 hover:scale-105 cursor-pointer transition"
          onClick={() => setShowControlPanel((prev) => !prev)}
        >
          <span
            className={`${
              showControlPanel ? "rotate-45" : ""
            } transform transition-transform`}
          >
            <FiPlus size={28} className="inline-block font-bold" />
          </span>
        </button>
      </div>
    </>
  );
}

export default BottomControlMenu;
