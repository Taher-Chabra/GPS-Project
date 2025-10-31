import { gpsApi } from "../lib/gpsApi";

//fetch all devices data
const fetchAllDevices = async () => {
  const response = await gpsApi.get("/getgpslastofall");
  return response.data;
};

//fetch single device data by ID
const fetchDeviceById = async (deviceId, date) => {
  const params = new URLSearchParams();
  params.append("id", deviceId);
  params.append("date", date);
  const response = await gpsApi.post("/getgpsof", params);

  return response.data;
};

export { fetchAllDevices, fetchDeviceById };
