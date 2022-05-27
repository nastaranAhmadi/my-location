import React from 'react';
import { MapContainer,TileLayer, useMap, Marker } from 'react-leaflet'
import {Icon} from 'leaflet'
import 'leaflet/dist/leaflet.css'
import "../assets/styles/form.css";
import markerIconPng from "../assets/images/pin.png"
import logo from "../assets/images/upload.png"
import AppContext from "../store/AppContext";

function Form() {
    const { state, setState } = React.useContext(AppContext);
    const [locType, setLocType] = React.useState(state.type)
    const [logoFile, setLogoFile] = React.useState(state.image)
    const [locName, setLocName] = React.useState('')
    const handleType = (type) => {
        setLocType(type.target.value);
    }
    const handleFile = (file) => {
        setLogoFile({value: file.target.value, uploaded: true})
    }
    const handleName = (e) => {
        setLocName(e.target.value)
    }
    const handleSave = () => {
        setState(prevState => ({
            ...prevState, 
            image: logoFile,
            name: locName,
            type: locType,
            editForm: false            
        }))
    }
    const handleCancel = () =>{
        setState(prevState => ({
            ...prevState, 
            editForm: false           
        }))
    }
    const ChangeMapView = ({ coords }) => {
        const map = useMap();
        map.setView(coords, map.getZoom());
        return null;
    }
    return (
        <div className='container'>
            <div className='form'>
                <div className='formHeader'>
                    <p>Share location</p>
                </div>
                <div className='formContent'>
                    <div className='row'>
                        <label>Location name: </label>
                        <input type={"text"} onKeyUp={handleName} />
                    </div>
                    <div className='row'>
                        <label>Location on map: </label>
                        <MapContainer 
                            center={[state.Latitude, state.Longitude]} 
                            zoom={15} 
                            scrollWheelZoom={false} 
                            style={{ height: "200px", width: "100%" }} 
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker 
                                icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})} 
                                position={[state.Latitude, state.Longitude]}
                            ></Marker>
                            <ChangeMapView coords={[state.Latitude, state.Longitude]} />
                        </MapContainer>
                    </div>
                    <div className='row'>
                        <label>Location type: </label>
                        <select value={locType} onChange={handleType}>
                            <option value="work">work</option>
                            <option value="home">home</option>
                            <option value="gym">gym</option>
                        </select>
                    </div>
                    <div className='row'>
                        <label>Logo: </label>
                        <div>
                        <label htmlFor="logoFile" className='uploadContainer'>
                            <p>Upload</p>
                            {
                                !logoFile.uploaded ?
                                <img alt='upload' src={logo} className="uploadIcon" />
                                :
                                <p className='fileName'>{logoFile.value}</p>
                            }
                        </label>
                        <input accept="image/png, image/jpeg" type={"file"} id="logoFile" className="file" onChange={handleFile} />
                        </div>
                    </div>
                </div>
                <div className='action'>
                    <button className='save' onClick={handleSave}>save</button>
                    <button className='cancel' onClick={handleCancel}>cancel</button>
                </div>
            </div>
        </div>
    );
}

export default Form;