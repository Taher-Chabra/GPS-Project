import DeviceCard from "./DeviceCard";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { fetchAllDevices } from "../../services/mapData";

function DeviceCardList() {
  const [deviceData, setDeviceData] = useState([]);
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const res = await fetchAllDevices();
        setDeviceData(res.data);
      } catch (error) {
        console.error("Error fetching device data:", error);
      }
    };

    fetchDevices();
  }, []);
  return (
    <div className="w-100 min-h-dvh p-4 bg-slate-100 flex flex-col gap-4 overflow-y-auto z-9999 mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-900">Device List</h3>
        <span>
          <IoMdClose
            size={24}
            className="cursor-pointer text-gray-400 hover:text-gray-600"
          />
        </span>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        {deviceData &&
          deviceData.length > 0 &&
          deviceData.map((device) => (
            <DeviceCard key={device._id} device={device} />
          ))}
      </div>
    </div>
  );
}

export default DeviceCardList;
