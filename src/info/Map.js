import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import React from 'react';
import ReactDOM from 'react-dom';
import HideOverlay from '../HideOverlay';

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

const Component = withScriptjs(
  withGoogleMap(({location, toggleOpen, markerImg, markerTitle }) => (
    <GoogleMap
      defaultZoom={14}
      defaultCenter={location}
      defaultOptions={{ styles: googleMapStyle }}
    >
      <Marker
        position={location}
        onClick={toggleOpen}
        title={markerTitle}
        icon={{ url: markerImg, scaledSize: { width: 128, height: 128 } }}
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

export default function Map({ show, onHide, ...props }) {
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

  if (!apiKey || !show) {
    return <div />;
  }

  return ReactDOM.createPortal(
    <ErrorBoundary>
      <Component
        isMarkerShown
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={
          <div
            style={{
              height: '60%',
              width: '100vw',
              position: 'fixed',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 1000,
            }}
          />
        }
        mapElement={<div style={{ height: `100%` }} />}
        {...props}
      />
      <HideOverlay onHide={onHide} />
    </ErrorBoundary>,
    document.body,
  );
}
