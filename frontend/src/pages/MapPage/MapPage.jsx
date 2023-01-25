import React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Autocomplete,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useState } from "react";

const containerStyle = {
  width: "800px",
  height: "590px",
};

function MapPage(props) {
  const center = {
    lat: props.lat,
    lng: props.lng,
  };

  const onLoadMarker = (marker) => {
    console.log("marker: ", marker);
  };

  const [autocomplete, setAutoComplete] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState();

  const position = {
    lat: latitude,
    lng: longitude,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCA5nB4DmZh91lOhVk86-klyBy2Mup3bAE",
    libraries: ["places"],
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const onLoadAutoComplete = (autocomplete) => {
    setAutoComplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      console.log(autocomplete.getPlace());
      //   debugger;
      setAddress(autocomplete.getPlace());
      let address = autocomplete.getPlace();
      console.log("Actual Address", address.adr_address);
      setLatitude(address.geometry.location.lat);
      setLongitude(address.geometry.location.lng);
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  return isLoaded ? (
    <div style={{ left: "50%", marginLeft: "-400px", position: "absolute" }}>
      <GoogleMap
        id="marker-example"
        mapContainerStyle={containerStyle}
        center={center}
        zoom={9}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={props.onMapClick}
      >
        <Autocomplete
          onLoad={onLoadAutoComplete}
          onPlaceChanged={onPlaceChanged}
        >
          <input
            type="text"
            placeholder="Enter Search Term..."
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: "absolute",
              left: "50%",
              marginLeft: "-120px",
            }}
          />
        </Autocomplete>
        {/* Searched Place Marker */}
        <Marker
          onLoad={onLoadMarker}
          center={position}
          position={position}
          onPlaceChanged={onPlaceChanged}
        />
        {/* Current Location Marker */}
        <Marker
          onLoad={onLoadMarker}
          position={center}
          onPlaceChanged={onPlaceChanged}
        />
        <DirectionsRenderer></DirectionsRenderer>
      </GoogleMap>
      <div style={{position: "absolute"}}>
        <h4>
          <a href={address?.website}>{address?.name}</a>
        </h4>
        <p>{address?.formatted_address}</p>
        <p>{address?.formatted_phone_number}</p>
        <p>{address?.current_opening_hours?.weekday_text[0]}</p>
        <p>{address?.current_opening_hours?.weekday_text[1]}</p>
        <p>{address?.current_opening_hours?.weekday_text[2]}</p>
        <p>{address?.current_opening_hours?.weekday_text[3]}</p>
        <p>{address?.current_opening_hours?.weekday_text[4]}</p>
        <p>{address?.current_opening_hours?.weekday_text[5]}</p>
        <p>{address?.current_opening_hours?.weekday_text[6]}</p>
      </div>

      <></>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(MapPage);
