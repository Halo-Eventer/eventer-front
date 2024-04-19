import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { infoState } from 'recoils/atoms_assign';
import styled from 'styled-components';

function Assign_latlng() {
  const [info, setInfo] = useRecoilState(infoState);

  const [latlng, setLatlng] = useState({});

  const { naver } = window;
  const mapElement = useRef(1);
  const getLatLng = (e) => {
    setLatlng({ lat: e.latlng.y, lng: e.latlng.x });
  };
  useEffect(() => {
    let marker = '';
    const mapOptions = {
      center: new naver.maps.LatLng(34.7969637033503, 126.43264179058626),
      zoom: 17,
      minZoom: 15,
      disableDoubleClickZoom: true,
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);

    naver.maps.Event.addListener(map, 'click', (e) => {
      getLatLng(e);
      setInfo({
        ...info,
        latitude: e.latlng._lat,
        longitude: e.latlng._lng,
      });
      if (marker) {
        marker.setPosition(e.latlng);
      } else {
        marker = new naver.maps.Marker({
          position: e.coord,
          map: map,
        });
      }
    });
  }, []);

  return <Map ref={mapElement}></Map>;
}

export default Assign_latlng;

const Map = styled.div`
  width: 336px;
  height: 200px;
  margin-left: 8px;
  margin-top: 8px;
`;
