import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import SwipeToSlide from '../asset/CategorySlider';
import sojuImg from '../asset/marker/sojuImg.svg';
import ClickInfo from '../components/map/ClickInfo';
import hallMarker from '../asset/marker/concertHall.svg';
import sojuCategory from '../asset/category/sojuCateogory.svg';
import { markerHandle } from '../asset/MarkerHandle';
import eventImg from '../asset/marker/eventImg.svg';
import getMarker from '../components/getMarker';
import boothImg from '../asset/marker/boothImg.svg';
import foodImg from '../asset/marker/foodImg.svg';
import toiletImg from '../asset/marker/toiletImg.svg';
function NolzaMap() {
  const [activeCategory, setActiveCategory] = useState();
  const mapElement = useRef(1);
  const { naver } = window;
  const [popup, setPopup] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    let mapOption = {
      center: new naver.maps.LatLng(37.5506, 127.0744),
      zoom: 17,
    };
    const map = new naver.maps.Map(mapElement.current, mapOption);
    const markerData = data?.map((e) => {
      return {
        name: e.name,
        lat: e.latitude,
        lng: e.longitude,
        summary: e.summary,
        type: e.type,
      };
    });
    console.log(markerData);
    let concertHallMarker = markerHandle(
      naver,
      map,
      37.55041,
      127.07505,
      hallMarker,
      100,
      '공연장'
    );
    let markerImg = '';
    if (activeCategory == 1) markerImg = eventImg;
    else if (activeCategory == 2) markerImg = foodImg;
    else if (activeCategory == 3) markerImg = sojuImg;
    else if (activeCategory == 4) markerImg = boothImg;
    else if (activeCategory == 5) markerImg = toiletImg;

    const markers = markerData?.map((e) => {
      return markerHandle(naver, map, e.lat, e.lng, markerImg, 50, e.name);
    });
    console.log(markers);
    import('../asset/MarkerClustering').then((res) => {
      const htmlMarker1 = {
        content: [
          `<div style='width: 50px; height: 50px; border-radius: 50%;  background: #FFF4F4;
          display: flex; align-items: center; justify-content: center'>`,
          `<div>`,
          `<img src=${markerImg}></img>`,
          `<p style='color: #000; margin:0; display:flex; justify-content:center; font-size: 0.875rem '>1</p>`,
          `</div>`,
          `</div>`,
        ].join(''),
        size: new naver.maps.Size(40, 40),
      };
      new res.MarkerClustering({
        minClusterSize: 2,
        maxZoom: 19,
        map: map,
        markers: markers,
        disableClickZoom: false,
        gridSize: 200,
        icons: [htmlMarker1],
        indexGenerator: [10, 100, 200, 500, 1000],
        stylingFunction: function (clusterMarker, count) {
          clusterMarker.getElement().querySelector('p').textContent = count;
        },
      });
    });

    naver.maps.Event.addListener(concertHallMarker, 'click', handlePopup);
    naver.maps.Event.addListener(map, 'click', () => {
      setPopup(false);
    });
  }, [data]);

  useEffect(() => {
    getMarker(activeCategory, setData);
  }, [activeCategory]);

  const handlePopup = () => {
    setPopup((prev) => !prev);
  };

  return (
    <div style={{ width: '100vw', marginLeft: '-8px', marginTop: '-8px' }}>
      <MapContainer ref={mapElement}>
        <SwipeToSlide setActiveCategory={setActiveCategory} />

        <ClickInfo mapElement={mapElement} popup={popup} setPopup={setPopup} />
      </MapContainer>
    </div>
  );
}
export default NolzaMap;

const Map = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const MapContainer = styled.div`
  width: 100vw;
  height: 99vh;
  z-index: 0;
`;
