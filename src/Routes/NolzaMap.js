import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import SwipeToSlide from '../asset/CategorySlider';
import sojuImg from '../asset/marker/sojuImg.svg';
import ClickInfo from '../components/map/ClickInfo';
import hallMarker from '../asset/marker/concertHall.svg';
import sojuCategory from '../asset/category/sojuCateogory.svg';
import { markerHandle } from '../asset/MarkerHandle';
function NolzaMap() {
  const [activeCategory, setActiveCategory] = useState();
  const mapElement = useRef(1);
  const { naver } = window;
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    let mapOption = {
      center: new naver.maps.LatLng(37.5506, 127.0744),
      zoom: 17,
    };
    const map = new naver.maps.Map(mapElement.current, mapOption);

    let concertHallMarker = markerHandle(
      naver,
      map,
      37.55041,
      127.07505,
      hallMarker,
      100,
      '공연장'
    );
    if (activeCategory == 3) {
      let marker2 = markerHandle(
        naver,
        map,
        37.550461011449535,
        127.07458883480498,
        sojuImg,
        50,
        '지능기전공학과'
      );
      let marker3 = markerHandle(
        naver,
        map,
        37.55053862868136,
        127.0747350151963,
        sojuImg,
        50,
        '원자력공학과'
      );
      let marker4 = markerHandle(
        naver,
        map,
        37.552,
        127.0741,
        sojuImg,
        50,
        '정보보안학과'
      );
      import('../asset/MarkerClustering').then((res) => {
        const htmlMarker1 = {
          content: [
            `<div style='width: 50px; height: 50px; border-radius: 50%;  background: #FFF4F4;
          display: flex; align-items: center; justify-content: center'>`,
            `<div>`,
            `<img src=${sojuCategory}></img>`,
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
          markers: [marker2, marker3],
          disableClickZoom: false,
          gridSize: 200,
          icons: [htmlMarker1],
          indexGenerator: [10, 100, 200, 500, 1000],
          stylingFunction: function (clusterMarker, count) {
            clusterMarker.getElement().querySelector('p').textContent = count;
          },
        });
        new res.MarkerClustering({
          minClusterSize: 2,
          maxZoom: 19,
          map: map,
          markers: [marker4],
          disableClickZoom: false,
          gridSize: 200,
          icons: [htmlMarker1],
          indexGenerator: [10, 100, 200, 500, 1000],
          stylingFunction: function (clusterMarker, count) {
            clusterMarker.getElement().querySelector('p').textContent = count;
          },
        });
      });
    }
    naver.maps.Event.addListener(concertHallMarker, 'click', handlePopup);
    naver.maps.Event.addListener(map, 'click', () => {
      setPopup(false);
    });
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
