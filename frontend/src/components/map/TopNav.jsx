import { FiMinusCircle } from "react-icons/fi";
import { HiChevronDoubleRight } from "react-icons/hi";

function TopNav() {
  return (
    <nav className="absolute inset-x-0 top-0 bg-[#198754]/80 shadow-md px-8 py-2 z-9999 flex justify-between items-center text-[1rem]">
      <div className="flex space-x-6 font-bold">
        <button className="text-white uppercase">All</button>
        <button className="text-white uppercase">Device List</button>
      </div>
      <div className="flex space-x-6">
        <span className="text-slate-800 flex items-center">
          <HiChevronDoubleRight className="inline-block mr-1" />
          <span className="text-white">1</span>
        </span>
        <span className="text-slate-800 flex items-center font-bold">
          <FiMinusCircle className="inline-block mr-1.5" />
          <span className="text-white">8</span>
        </span>
      </div>
    </nav>
  );
}

export default TopNav;
