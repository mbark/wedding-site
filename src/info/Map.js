import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';
import Hosts from '../resources/images/hosts.png';

import React, { useState } from 'react';

const googleMapStyle = [
  {
    stylers: [
      {
        hue: '#dd0d0d',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        lightness: 100,
      },
      {
        visibility: 'simplified',
      },
    ],
  },
];

const markerIcon = { url: Hosts, scaledSize: { width: 128, height: 128 } };

const Component = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={14}
      defaultCenter={props.location}
      defaultOptions={{ styles: googleMapStyle }}
    >
      <Marker
        position={props.location}
        onClick={props.toggleOpen}
        title="Our hosts"
        icon={markerIcon}
      >
        {props.isOpen && (
          <InfoBox
            onCloseClick={props.toggleOpen}
            options={{ closeBoxURL: ``, enableEventPropagation: true }}
          >
            <div>Hello, Kaohsiung!</div>
          </InfoBox>
        )}
      </Marker>
    </GoogleMap>
  )),
);

const apiKey = 'AIzaSyB7JTOt3UvxeKeyf57C4OvnACSRPQix7PU';

export default function Map() {
  const location = { lat: 59.332387, lng: 18.076871 };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Component
      isMarkerShown
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px`, marginLeft: '-1rem', width: '100vw' }} />}
      mapElement={<div style={{ height: `100%` }} />}
      location={location}
      isOpen={isOpen}
      toggleOpen={() => setIsOpen(!isOpen)}
    />
  );
}
