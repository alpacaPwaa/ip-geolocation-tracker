import React from "react";
import type { GeoInfo } from "../types";

interface GeoInfoCardProps {
  data: GeoInfo;
}

const InfoItem: React.FC<{ label: string; value?: string }> = ({
  label,
  value,
}) => (
  <div className="flex justify-between items-baseline">
    <span className="text-slate-400 text-sm uppercase font-semibold">
      {label}
    </span>
    <span className="text-white text-right font-medium">{value || "N/A"}</span>
  </div>
);

const GeoInfoCard: React.FC<GeoInfoCardProps> = ({ data }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-lg animate-fade-in">
      <h2 className="text-xl font-bold text-sky-400 mb-4">
        Geolocation Details
      </h2>
      <div className="space-y-3">
        <InfoItem label="IP Address" value={data.ip} />
        <InfoItem
          label="Location"
          value={`${data.city}, ${data.region}, ${data.country}`}
        />
        <InfoItem label="Postal Code" value={data.postal} />
        <InfoItem label="Timezone" value={data.timezone} />
        <InfoItem label="ISP" value={data.org} />
      </div>
    </div>
  );
};

export default GeoInfoCard;
