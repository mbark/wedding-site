import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import Hosts from '../resources/images/hosts.png';
import React from 'react';

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
      />
    </GoogleMap>
  )),
);

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div>Failed to load map</div>;
    }

    return this.props.children;
  }
}

export default function Map() {
  const location = { lat: 59.332387, lng: 18.076871 };
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

  return apiKey ? (
    <ErrorBoundary>
      <Component
        isMarkerShown
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={
          <div
            style={{ height: `400px`, marginLeft: '-1rem', width: '100vw' }}
          />
        }
        mapElement={<div style={{ height: `100%` }} />}
        location={location}
      />
    </ErrorBoundary>
  ) : (
    <div />
  );
}
