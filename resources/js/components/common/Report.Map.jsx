import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const BREBES = [-6.8722, 109.04];

// Penanda bulat berwarna (menghindari masalah ikon bawaan Leaflet di Vite)
const dot = (color = '#ba1a1a', size = 18) =>
  L.divIcon({
    className: '',
    html: `<span style="display:block;width:${size}px;height:${size}px;border-radius:9999px;background:${color};border:3px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.4)"></span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });

// Geser peta otomatis ke titik yang dipilih
function FlyTo({ target }) {
  const map = useMap();
  useEffect(() => {
    if (target) map.flyTo(target, 14, { duration: 0.8 });
  }, [target, map]);
  return null;
}

export default function ReportMap({ markers = [], center = BREBES, zoom = 11, className = 'h-96', onSelect, flyTo }) {
  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom className={`isolate w-full rounded-2xl ${className}`}>
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((m) => (
        <Marker key={m.id} position={[m.lat, m.lng]} icon={dot(m.color)} eventHandlers={{ click: () => onSelect?.(m.id) }}>
          <Popup>
            <strong>{m.title}</strong>
            <br />
            {m.location}
          </Popup>
        </Marker>
      ))}
      <FlyTo target={flyTo} />
    </MapContainer>
  );
}