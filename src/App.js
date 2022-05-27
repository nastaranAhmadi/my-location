import React from "react";
import AppContext from "./store/AppContext";
import Form from "./components/Form";
import Map from "./components/Map";


const initialState = {
  Longitude: 0,
  Latitude: 0,
  type: 'work',
  image: {value:'', uploaded: false},
  name: '',
  editForm: false
}

function App() {
  const [state, setState] = React.useState(initialState)
  const value = { state, setState };
  React.useEffect(()=>{
    navigator.geolocation.getCurrentPosition(function(position) {
        setState(prevState => ({
            ...prevState, 
            Longitude: position.coords.longitude,
            Latitude: position.coords.latitude
        }))
      });
}, [state.Latitude])
  return (
    <AppContext.Provider value={value}>
      {state.editForm? <Form/>: <Map/>}
    </AppContext.Provider>
  );
}

export default App;
