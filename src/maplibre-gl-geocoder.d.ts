// maplibre-gl-geocoder.d.ts
declare module '@maplibre/maplibre-gl-geocoder' {
    export interface GeocoderOptions {
      marker?: boolean;
      collapsed?: boolean;
      mapboxApiUrl?: string;
    }
  
    export interface MapboxGeocoderEvent {
      result: {
        geometry: {
          coordinates: [number, number];
        };
      };
    }
  
    class MapLibreGeocoder implements IControl<MapInstance> {
      constructor(options: GeocoderOptions);
  
      on(eventName: string, callback: (event: MapboxGeocoderEvent) => void): void;
      onAdd(map: MapInstance): HTMLElement;
    onRemove(map: MapInstance): void;
    }
  
    export default MapLibreGeocoder;
  }
  