import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Autocomplete } from '@react-google-maps/api';

const containerStyle = {
  width: '800px',
  height: '600px'
};

function MapPage(props) {

const center = {
    lat: props.lat,
    lng: props.lng
    };
    
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCA5nB4DmZh91lOhVk86-klyBy2Mup3bAE"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
   
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <div style={{"margin-left": "2rem"}}>
      <GoogleMap 
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        
              
      </GoogleMap>
      
      <><p>Hello</p></>
      </div>
  ) : <></>
}

export default React.memo(MapPage)



