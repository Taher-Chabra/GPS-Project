import { useMemo } from "react";
import { Polyline } from "react-leaflet";
import { countryJson } from "../../constants/coordinates";

export default function CountryLine() {
  const coords = useMemo(
    () => countryJson["India"].coordinates.map((coord) => [coord[1], coord[0]]),
    [countryJson]
  );

  return (
    <Polyline positions={coords} pathOptions={{ color: "blue", weight: 3 }} />
  );
}
