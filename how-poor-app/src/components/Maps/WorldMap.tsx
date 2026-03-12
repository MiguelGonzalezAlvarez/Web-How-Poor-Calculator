import { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import { useTranslation } from 'react-i18next';
import useAppStore from '../../store/useAppStore';
import { formatCurrency } from '../../services/utils/formatters';
import { CalculationResult } from '../../types';
import 'leaflet/dist/leaflet.css';
import styles from './WorldMap.module.scss';

interface MapData {
  id: string;
  name: string;
  flag: string;
  lat: number;
  lng: number;
  salary: number;
  status: string;
  ratio: number;
  currency: string;
  currencySymbol: string;
}

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'better': return '#22c55e';
    case 'worse': return '#ef4444';
    default: return '#6b7280';
  }
};

const getStatusColorRgba = (status: string, opacity = 0.6): string => {
  switch (status) {
    case 'better': return `rgba(34, 197, 94, ${opacity})`;
    case 'worse': return `rgba(239, 68, 68, ${opacity})`;
    default: return `rgba(107, 114, 128, ${opacity})`;
  }
};

interface MapControllerProps {
  data: MapData[];
}

const MapController: React.FC<MapControllerProps> = ({ data }) => {
  const map = useMap();
  
  useEffect(() => {
    if (data && data.length > 0) {
      const bounds = data.map(d => [d.lat, d.lng]);
      map.fitBounds(bounds as [number, number][], { padding: [50, 50], maxZoom: 4 });
    }
  }, [data, map]);
  
  return null;
};

const WorldMap: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { calculatedResults, setSelectedDetailCountry, isCalculated } = useAppStore();

  if (!isCalculated || calculatedResults.length === 0) {
    return null;
  }

  const mapData = useMemo(() => {
    const uniqueCountries = new Map<string, CalculationResult>();
    
    calculatedResults.forEach((result: CalculationResult) => {
      if (!uniqueCountries.has(result.country.id)) {
        uniqueCountries.set(result.country.id, result);
      }
    });
    
    return Array.from(uniqueCountries.values()).map((result: CalculationResult) => {
      const name = i18n.language === 'es' ? result.country.nameEs : result.country.name;
      return {
        id: result.country.id,
        name,
        flag: result.country.flag,
        lat: result.country.lat,
        lng: result.country.lng,
        salary: result.equivalentSalary,
        status: result.status,
        ratio: result.ratio,
        currency: result.currency,
        currencySymbol: result.currencySymbol
      };
    });
  }, [calculatedResults, i18n.language]);

  return (
    <div className={styles.mapContainer}>
      <h3 className={styles.mapTitle}>{t('map.title')}</h3>
      
      <div className={styles.mapWrapper}>
        <MapContainer 
          center={[20, 0]} 
          zoom={2} 
          className={styles.map}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          
          <MapController data={mapData} />
          
          {mapData.map((country) => (
            <CircleMarker
              key={country.id}
              center={[country.lat, country.lng]}
              radius={12}
              pathOptions={{
                fillColor: getStatusColorRgba(country.status, 0.7),
                fillOpacity: 0.8,
                color: getStatusColor(country.status),
                weight: 2
              }}
              eventHandlers={{
                click: () => setSelectedDetailCountry(country.id),
              }}
            >
              <Popup className={styles.popup}>
                <div className={styles.popupContent}>
                  <span className={styles.popupFlag}>{country.flag}</span>
                  <span className={styles.popupName}>{country.name}</span>
                  <div className={styles.popupSalary}>
                    {formatCurrency(country.salary, country.currency)}
                  </div>
                  <div 
                    className={styles.popupStatus}
                    style={{ color: getStatusColor(country.status) }}
                  >
                    {t(`results.status.${country.status}`)} ({(country.ratio * 100 - 100).toFixed(0)}%)
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={styles.legendDot} style={{ background: '#22c55e' }} />
          <span>{t('map.legend.better')}</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendDot} style={{ background: '#6b7280' }} />
          <span>{t('map.legend.similar')}</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendDot} style={{ background: '#ef4444' }} />
          <span>{t('map.legend.worse')}</span>
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
