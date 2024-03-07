import { useEffect, useRef, useState } from 'react';
import { BkBtn, Title, UpperBar } from './Home';
import { MapContainer } from './NolzaMap';
import { useNavigate } from 'react-router-dom';
import { markerHandle } from 'asset/MarkerHandle';
import cableCar from 'asset/marker/cableCar.png';
function TourMap() {
  const mapElement = useRef(1);
  const [map, setMap] = useState(null);

  const navigate = useNavigate();
  const { naver } = window;
  useEffect(() => {
    // 처음 맵 만들기
    let mapOption = {
      center: new naver.maps.LatLng(34.79327983731187, 126.37965064676204),
      zoom: 14,
      minZoom: 11,
      tileTransition: true,
      scaleControl: true,
      logoControl: false,
      mapDataControl: false,
      zoomControl: false,
      mapTypeControl: false,
    };
    const tmpMap = new naver.maps.Map(mapElement.current, mapOption);
    setMap(tmpMap);
    const marker = markerHandle(
      -1,
      naver,
      tmpMap,
      34.79887211015978,
      126.36982871559033,
      cableCar,
      600,
      '목포해상케이블카'
    );
    naver.maps.Event.addListener(marker, 'click', () =>
      console.log('케이블카 클릭')
    );
  }, []);

  return (
    <div>
      <UpperBar style={{ position: 'absolute', zIndex: '10', width: '100%' }}>
        <BkBtn style={{ left: '20px' }} onClick={() => navigate(-1)} />
        <Title>주변관광지</Title>
      </UpperBar>
      <MapContainer ref={mapElement}></MapContainer>
    </div>
  );
}

export default TourMap;
