import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

function Assign_latlng(props) {
  const [latlng, setLatlng] = useState({});

  const { naver } = window;
  const mapElement = useRef(1);
  const getLatLng = (e) => {
    console.log(e.latlng);
    setLatlng({ lat: e.latlng.y, lng: e.latlng.x });
  };
  useEffect(() => {
    let marker = '';
    const mapOptions = {
      center: new naver.maps.LatLng(37.5506, 127.0744),
      zoom: 17,
      minZoom: 16,
      disableDoubleClickZoom: true,
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);

    naver.maps.Event.addListener(map, 'click', (e) => {
      getLatLng(e);
      props.setInfo({
        ...props.info,
        latitude: e.latlng._lat,
        longitude: e.latlng._lng,
      });
      if (marker) {
        console.log(marker.position, e.coord);
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
