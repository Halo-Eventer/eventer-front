import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import SwipeToSlide from '../asset/CategorySlider';
import sojuImg from '../asset/marker/sojuImg.svg';
import ClickInfo from '../components/map/ClickInfo';
import hallMarker from '../asset/marker/concertHall.svg';
import sojuCategory from '../asset/category/sojuCateogory.svg';


function NolzaMap() {
  const mapElement = useRef(1);
  const { naver } = window;
  const [popup, setPopup] = useState(false);
  useEffect(() => {
    console.log(popup, 'changed');
  }, [popup]);
  useEffect(() => {
    console.log(mapElement.current, mapElement);
    let mapOption = {
      center: new naver.maps.LatLng(37.5506, 127.0744),
      zoom: 17,
    };
    const map = new naver.maps.Map(mapElement.current, mapOption);
    const mapDiv = document.getElementById('map');

    let concertHallMarker = new naver.maps.Marker({
      position: new naver.maps.LatLng(37.55041, 127.07505),
      map,
      icon: {
        url: hallMarker,
        size: new naver.maps.Size(100, 100),
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(25, 26),
      },
    });

    let marker2 = new naver.maps.Marker({
      position: new naver.maps.LatLng(37.551, 127.0744),
      map,
      icon: {
        url: sojuImg,
        size: new naver.maps.Size(50, 50),
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(25, 26),
      },
    });
    let marker3 = new naver.maps.Marker({
      position: new naver.maps.LatLng(37.5512, 127.0744),
      map,
      icon: {
        url: sojuImg,
        size: new naver.maps.Size(50, 50),
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(25, 26),
      },
    });
    let marker4 = new naver.maps.Marker({
      position: new naver.maps.LatLng(37.5521, 127.074),
      map,
      icon: {
        url: sojuImg,
        size: new naver.maps.Size(50, 50),
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(25, 26),
      },
    });

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

    naver.maps.Event.addListener(concertHallMarker, 'click', handlePopup);
    naver.maps.Event.addListener(map, 'click', () => {
      setPopup(false);
    });
  }, []);

  const handlePopup = () => {
    console.log(popup);
    setPopup((prev) => !prev);
  };
  return (
    <div style={{ width: '100vw', marginLeft: '-8px', marginTop: '-8px' }}>
      <div
        ref={mapElement}
        style={{
          width: '100vw',
          height: '100vh',
          zIndex: 0,
        }}
      >
        <SwipeToSlide />

        <ClickInfo mapElement={mapElement} popup={popup} setPopup={setPopup} />
      </div>
    </div>
  );
}
export default NolzaMap;

const Map = styled.div`
  &:hover {
    cursor: pointer;
  }
`;
