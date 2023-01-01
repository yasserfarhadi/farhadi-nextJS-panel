import React from 'react';
import Image from 'next/image';
import GoogleMapReact from 'google-map-react';
import marker from '../assets/marker.png';
interface Coord {
  lat: number;
  lng: number;
}

interface MapProps extends Coord {
  setCoordinate: (coord: Coord) => void;
  defaultCoordinate: Coord;
}
const Marker = (_props: Coord): JSX.Element => {
  return (
    <Image
      src={marker}
      alt="marker"
      style={{ width: '30px', height: '45px' }}
    />
  );
};

function Map({ lat, lng, setCoordinate, defaultCoordinate }: MapProps) {
  function changeCenterHandler(map: {
    center: {
      lat: () => number;
      lng: () => number;
    };
  }) {
    setCoordinate({
      lat: map.center?.lat(),
      lng: map.center?.lng(),
    });
  }

  return (
    <GoogleMapReact
      defaultCenter={defaultCoordinate}
      defaultZoom={14}
      yesIWantToUseGoogleMapApiInternals
      onDrag={changeCenterHandler}
    >
      <Marker lat={lat} lng={lng} />
    </GoogleMapReact>
  );
}

export default Map;
