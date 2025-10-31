import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import MarkerPopup from "../components/map/MarkerPopup";
import "leaflet/dist/leaflet.css";
import CountryLine from "../components/map/CountryLine";
import TopNav from "../components/map/TopNav";
import { fetchAllDevices, fetchDeviceById } from "../services/mapData";
import BottomControlMenu from "../components/map/BottomControlMenu";

function MarkerIcon(speed) {
  let markerUrl = "";
  switch (true) {
    case speed <= 0: {
      markerUrl = "/custom-car-marker-red.png";
    }
    case speed > 0 && speed <= 80: {
      markerUrl = "/custom-car-marker-green.png";
    }
    case speed > 80: {
      markerUrl = "/custom-car-marker-blue.png";
    }
    default: {
      markerUrl = "/custom-car-marker-red.png";
    }
  }

  return L.icon({
    iconUrl: markerUrl,
    shadowUrl: "/shadow-pin.png",
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    shadowSize: [34, 30],
    shadowAnchor: [1, 29],
    popupAnchor: [0, -40],
  });
}

function TrackingMap() {
  const [allDevices, setAllDevices] = useState([]);
  const [selectedDeviceData, setSelectedDeviceData] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState("");
  const [displayAllDevices, setDisplayAllDevices] = useState(true);
  const mapRef = useRef(null);

  const handleDisplayAllDevices = async () => {
    try {
      const res = await fetchAllDevices();
      setAllDevices(res.data);
      setDisplayAllDevices(true);
    } catch (error) {
      console.error("Error fetching all devices:", error);
    }
  };

  const displaySelectedDevice = async (
    deviceId,
    date = new Date().toISOString().split("T")[0]
  ) => {
    try {
      const res = await fetchDeviceById(deviceId, date);
      setSelectedDeviceData(res.data[0]);
      setDisplayAllDevices(false);
      mapRef.current.setView([res.data[0].lat, res.data[0].lng], 17);
    } catch (error) {
      console.error("Error fetching device by ID:", error);
    }
  };

  useEffect(() => {
    if (allDevices.length === 0 && displayAllDevices) {
      handleDisplayAllDevices();
    }
  }, [displayAllDevices]);
  return (
    <div className="w-full h-screen">
      <MapContainer
        center={[23.1686, 79.9339]}
        zoom={5}
        scrollWheelZoom={true}
        className="h-full w-full relative"
        maxBounds={[
          [-90, -180],
          [90, 180],
        ]}
        maxBoundsViscosity={0.5}
        minZoom={2}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          noWrap={true}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <TopNav />
        <CountryLine />

        {displayAllDevices &&
          allDevices &&
          allDevices.map((device) => (
            <Marker
              key={device._id}
              position={[parseFloat(device.lat), parseFloat(device.lng)]}
              icon={MarkerIcon(device.speed)}
            >
              <MarkerPopup deviceData={device} />
            </Marker>
          ))}

        {!displayAllDevices && selectedDeviceData && (
          <Marker
            position={[
              parseFloat(selectedDeviceData.lat),
              parseFloat(selectedDeviceData.lng),
            ]}
            icon={MarkerIcon(selectedDeviceData.speed)}
          >
            <MarkerPopup
              deviceData={selectedDeviceData}
              deviceId={selectedDeviceData.device}
            />
          </Marker>
        )}

        <BottomControlMenu />
      </MapContainer>
    </div>
  );
}
export default TrackingMap;
