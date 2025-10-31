import { useRef, useEffect, useState } from "react";
import { DataTable } from "simple-datatables";
import { fetchAllDevices } from "../../services/mapData";
import "simple-datatables/dist/style.css";
import "../../styles/deviceTable.css";

function GPSDeviceTable() {
  const [deviceData, setDeviceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const tableRef = useRef(null);
  const dataTableRef = useRef(null);
 
  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const res = await fetchAllDevices();
        setDeviceData(res.data);
      } catch (error) {
        console.error("Error fetching device data:", error);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  useEffect(() => {
    if (deviceData.length > 0 && tableRef.current && !dataTableRef.current) {
      dataTableRef.current = new DataTable(tableRef.current, {
        searchable: true,
        sortable: true,
        perPage: 5,
      });
    }
  }, [deviceData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="p-5 border animate-spin border-slate-200 rounded-full border-t-transparent"></span>
      </div>
    );
  }

  return (
    <div className="p-8 w-2/3 mx-auto bg-white border border-gray-100 rounded-lg shadow-md shadow-gray-700 dark:shadow-gray-500">
      <table ref={tableRef} className="">
        <thead>
          <tr>
            <th>
              <span className="flex items-center">SI</span>
            </th>
            <th>
              <span className="flex items-center">Device</span>
            </th>
            <th>
              <span className="flex items-center">Kilometers</span>
            </th>
            <th>
              <span className="flex items-center">Date</span>
            </th>
            <th>
              <span className="flex items-center">Time</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {deviceData &&
            deviceData.length > 0 &&
            deviceData.map((device, index) => (
              <tr key={index}>
                <td className="text-gray-900 whitespace-nowrap">{index + 1}</td>
                <td className="text-gray-900 whitespace-nowrap">
                  {device._id}
                </td>
                <td className="text-gray-900 whitespace-nowrap">
                  {parseFloat(device.km).toFixed(2)} KM
                </td>
                <td className="text-gray-900 whitespace-nowrap">
                  {new Date(device.ddate).toLocaleDateString("en-IN", {
                    timeZone: "Asia/Kolkata",
                  })}
                </td>
                <td className="text-gray-900 whitespace-nowrap">
                  {new Date(device.ddate).toLocaleTimeString("en-IN", {
                    timeZone: "Asia/Kolkata",
                  })}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default GPSDeviceTable;
