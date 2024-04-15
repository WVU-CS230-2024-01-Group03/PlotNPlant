import React from "react";
import { TileLayer, MapContainer, Popup } from "react-leaflet";
import { Marker } from "react-leaflet";
import "./Styles.css";
export default function Map() {
  //Map to center around west virginia coordinates with a zoom of 8
  return (
    <div>
      <h1>Map of West Virginia</h1>
      <MapContainer center={[38.597626, -80.454903]} zoom={8}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Marker for Monogolia County */}
        <Marker position={[39.629761, -79.955948]}>
          <Popup>
            <h1 className="popup-header">Monogolia County</h1>
          </Popup>
        </Marker>
        {/* Marker for Taylor County */}
        <Marker position={[39.34053, -80.01763]}>
          <Popup>
            <h1 className="popup-header">Taylor County</h1>
          </Popup>
        </Marker>
        {/* Marker for Harrison County */}
        <Marker position={[39.28331, -80.351448]}>
          <Popup>
            <h1 className="popup-header">Harrison County</h1>
          </Popup>
        </Marker>
        {/* Marker for Hampshire County */}
        <Marker position={[39.34198, -78.756493]}>
          <Popup>
            <h1 className="popup-header">Hampshire County</h1>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
