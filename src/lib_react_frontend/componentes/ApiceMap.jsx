import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap as LibMap } from 'react-google-maps';

/**
 * Componente genérico google maps da aplicação.
 */
export default class ApiceMap extends React.Component {

  constructor() {
    super();
    this.lat = -23.0825434;
    this.lng = -52.4515378;
  }

  getMapOptions() {
    return { 
      gestureHandling: 'greedy',
    };
  }

  /**
   * Método de render padrão
   */
  render() {
    const Map = withScriptjs(withGoogleMap(() =>
      <LibMap defaultZoom={13}
              defaultCenter={{ lat: this.lat, lng: this.lng }}
              defaultOptions={this.getMapOptions()} >
        {this.props.children}
      </LibMap>
    ));

    return (
      <Map className="bordered"
           googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&key=' + this.props.maps_key + '&libraries=geometry,drawing,places'}
           loadingElement={<div className="h-100" />}
           containerElement={<div className="h-100" />}
           mapElement={<div className="h-100" />} />
    );
  }
}
