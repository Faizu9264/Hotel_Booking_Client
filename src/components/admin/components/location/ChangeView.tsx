// ChangeView.tsx
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

interface ChangeViewProps {
  center: [number, number];
  zoom: number;
}

const ChangeView = ({ center, zoom }: ChangeViewProps) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);

  return null;
};

export default ChangeView;