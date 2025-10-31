import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import type { Map } from "leaflet";
import type { GeoInfo } from "../types";

const ChangeView: React.FC<{ center: LatLngExpression; zoom: number }> = ({
  center,
  zoom,
}) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

interface MapDisplayProps {
  geoInfo: GeoInfo | null;
}

const MapDisplay: React.FC<MapDisplayProps> = ({ geoInfo }) => {
  const mapRef = useRef<Map>(null);

  useEffect(() => {
    if (mapRef.current) {
      setTimeout(() => {
        mapRef.current?.invalidateSize();
      }, 100);
    }
  }, []);

  const position: LatLngExpression = geoInfo?.loc
    ? [
        parseFloat(geoInfo.loc.split(",")[0]),
        parseFloat(geoInfo.loc.split(",")[1]),
      ]
    : [51.505, -0.09];

  const zoom = geoInfo ? 13 : 3;

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      scrollWheelZoom={true}
      ref={mapRef}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      {geoInfo && (
        <Marker position={position}>
          <Popup>
            <strong>{geoInfo.ip}</strong>
            <br />
            {geoInfo.city}, {geoInfo.country}
          </Popup>
        </Marker>
      )}
      <ChangeView center={position} zoom={zoom} />
    </MapContainer>
  );
};

export default MapDisplay;
