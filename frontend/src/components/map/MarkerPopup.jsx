import { Popup } from "react-leaflet";
import { formatDate } from "../../utils/dateFormat";

function MarkerPopup({ deviceData, deviceId = null }) {
  return (
    <Popup>
      <div className="text-sm">
        <span className="block text-center text-xl tracking-wide">
          <strong>{deviceId ? deviceId : deviceData._id}</strong>
        </span>
        <p>
          <span className="block">
            speed: <strong className="tracking-wide">{deviceData.speed}</strong>
          </span>
          <span className="block">
            Device Time: <strong className="tracking-wide">{formatDate(deviceData.ddate)}</strong>
          </span>
          <span className="block">
            Server Time: <strong className="tracking-wide">{formatDate(deviceData.createdAt)}</strong>
          </span>
        </p>
      </div>
    </Popup>
  );
}

export default MarkerPopup;
