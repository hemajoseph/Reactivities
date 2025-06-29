import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

type Props = {
    position: [number, number]; // Latitude and Longitude
    venue: string; // Venue name
}

export default function MapComponent({position, venue}: Props) {
    //const position = [51.505, -0.09]; // Default position for the map
  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{height:'100%'}}>
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={position}>
        <Popup>
            {venue}
        </Popup>
    </Marker>
    </MapContainer>
  )
}
