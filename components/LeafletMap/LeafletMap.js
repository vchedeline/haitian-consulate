import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

const Map = () => {
  return (
    <MapContainer
      center={[42.35689, -71.05913]}
      zoom={14}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%", zIndex: "0" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
      />
      <Marker position={[42.35689, -71.05913]} draggable={true} animate={true}>
        <Popup>
          Haitian Consulate of Boston <br /> 333 Washington St., Suite 851{" "}
          <br />
          Boston, MA 02108
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
