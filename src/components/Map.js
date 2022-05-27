import React from 'react';
import AppContext from "../store/AppContext";
import { MapContainer,TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import markerIconPng from "../assets/images/pin.png"
import {Icon} from 'leaflet'
import "../assets/styles/map.css";
function Map() {
    const { state, setState } = React.useContext(AppContext);
    const handleEdit = () => {
        setState(prevState => ({
            ...prevState, 
            editForm: true           
        }))
    }
    const ChangeMapView = ({ coords }) => {
        const map = useMap();
        map.setView(coords, map.getZoom());
      
        return null;
    }
    return (
        <div>
            <MapContainer center={[state.Latitude, state.Longitude]} zoom={15} scrollWheelZoom={false} 
            style={{ height: "90vh", width: "100%" }} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})} position={[state.Latitude, state.Longitude]}>
                <Popup maxWidth={300}>
                    <div className='popupContainer'>
                        <p className='popupHeader'>Location Details</p>
                        <p className='popupContent'>{state.type}</p>
                        <button onClick={handleEdit}>edit</button>
                    </div>
                </Popup>
                </Marker>
                <ChangeMapView coords={[state.Latitude, state.Longitude]} />
            </MapContainer>
        </div>
    );
}

export default Map;