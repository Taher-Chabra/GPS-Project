import { LuCirclePower } from "react-icons/lu";
import { MdOutlineSpeed } from "react-icons/md";
import { GiPathDistance } from "react-icons/gi";

function StatusIndicator({ speed }) {
  const isActive = speed !== 0;

  return (
    <span className="relative flex h-6 w-6">
      <LuCirclePower
        size={24}
        className={isActive ? "text-green-500" : "text-red-400"}
      />
    </span>
  );
}

function StatItem({ icon, label, value, unit }) {
  return (
    <div className="flex items-center text-gray-700">
      <span className="text-xl mr-2 text-blue-500">{icon}</span>
      <div>
        <span className="text-xs text-gray-500">{label}</span>
        <p className="text-md font-semibold">
          {value} <span className="text-sm font-normal">{unit}</span>
        </p>
      </div>
    </div>
  );
}

function DeviceCard({ device }) {
  const lastUpdated = new Date(device.ddate)
    .toLocaleString("en-In", {
      timeZone: "Asia/Kolkata",
    })
    .replace(",", " -");

  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-100 w-full max-w-xs transition-all hover:shadow-lg">
      <div className="flex justify-between items-center mb-3">
        <h3
          className="text-lg font-bold text-gray-800 truncate"
          title={device._id}
        >
          {device._id}
        </h3>
        <StatusIndicator speed={device.speed} />
      </div>

      <div className="flex items-center justify-start gap-6 my-2">
        <StatItem
          icon={<MdOutlineSpeed />}
          label="Speed"
          value={device.speed}
          unit="km/h"
        />
        <StatItem
          icon={<GiPathDistance />}
          label="Distance"
          value={parseFloat(device.km).toFixed(2)}
          unit="km"
        />
      </div>

      <div className="border-t border-gray-200 pt-3 mt-4">
        <span className="text-xs text-gray-500">
          Last Update: {lastUpdated}
        </span>
      </div>
    </div>
  );
}

export default DeviceCard;
