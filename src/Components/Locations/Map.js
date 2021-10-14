import React from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: "100%",
  height: "600px"
};


function MyComponent({locations, selectedPlace, setSelectedPlace}) {
  const [map, setMap] = React.useState(null)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_KEY}`
  })

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        defaultCenter={ !selectedPlace ? {lat: 38.63217176910362, lng: -90.19383204054196}:
        {lat: selectedPlace.latitude, lng: selectedPlace.longitude} }
        zoom={selectedPlace?17:10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <>
        {locations?.map((card) => (
          <Marker
            key={card.id}
            position={{ lat: card.latitude, lng: card.longitude }}
            onClick={() => setSelectedPlace(card)}
            icon={{
              url: "/hospital logo.png",
              scaledSize: new window.google.maps.Size(25, 25),
            }}
           
          />))}
          {selectedPlace && (
                    <InfoWindow
                      position={{
                        lat: selectedPlace.latitude,
                        lng: selectedPlace.longitude,
                      }}
                      onCloseClick={() => setSelectedPlace(null)}
                    >
                      <div style={{height: "70px", paddingTop: "20px"}}>
                        <h6>{selectedPlace.name}</h6>
                        <p>Clinic</p>
                      </div>
                    </InfoWindow>
                  )}
        </>
      </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)