import { useEffect, useRef, useState } from 'react';
import { styled, createGlobalStyle } from 'styled-components';
import SwipeToSlide from '../asset/CategorySlider';
import ClickInfo from '../components/map/ClickInfo';
import { markerHandle } from '../asset/MarkerHandle';
import eventImg from 'asset/marker/eventImg.svg';
import sojuImg from 'asset/marker/sojuImg.svg';
import boothImg from 'asset/marker/boothImg.svg';
import foodImg from 'asset/marker/foodImg.svg';
import toiletImg from 'asset/marker/toiletImg.svg';
import hallMarker from 'asset/marker/concertHall.svg';
import getMarker from '../components/getMarker';

function NolzaMap(props) {
  const [activeCategory, setActiveCategory] = useState(1);
  let markerImg = '';
  const mapElement = useRef(1);
  const { naver } = window;
  const [popup, setPopup] = useState(false);
  const [data, setData] = useState([]);
  const [openId, setOpenId] = useState(0);
  useEffect(() => {
    if (activeCategory == 1) markerImg = eventImg;
    else if (activeCategory == 2) markerImg = foodImg;
    else if (activeCategory == 3) markerImg = sojuImg;
    else if (activeCategory == 4) markerImg = boothImg;
    else if (activeCategory == 5) markerImg = toiletImg;
  }, [activeCategory, data]);
  useEffect(() => {
    let mapOption = {
      center: new naver.maps.LatLng(37.5506, 127.0744),
      zoom: 17,
      minZoom: 16,
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
    console.log(data);
    naver.maps.Event.addListener(
      concertHallMarker,
      'click',
      handleConcertHallMarker
    );
    naver.maps.Event.addListener(map, 'click', () => {
      setPopup(false);
    });
    if (data != '') {
      const markerData = data?.map((e) => {
        return {
          name: e.name,
          lat: e.latitude,
          lng: e.longitude,
          summary: e.summary,
          type: e.type,
        };
      });

      const markers = markerData?.map((e) => {
        return markerHandle(naver, map, e.lat, e.lng, markerImg, 50, e.name);
      });

      import('../asset/MarkerClustering').then(({ MarkerClustering }) => {
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
        new MarkerClustering({
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
      markers?.map((e, i) => {
        naver.maps.Event.addListener(e, 'click', () => handleMarkers(data[i]));
      });
    }
  }, [data]);

  useEffect(() => {
    getMarker(activeCategory, setData);
    setOpenId(-2);
  }, [activeCategory]);

  const handleConcertHallMarker = () => {
    setPopup(true);
    setOpenId(-1);
  };
  const handleMarkers = (data) => {
    setPopup(true);
    setOpenId(data.id);
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      <GlobalStyle />
      <MapContainer ref={mapElement}>
        <SwipeToSlide setActiveCategory={setActiveCategory} />

        <ClickInfo
          data={{
            name: '공연장',
            summary: '소수빈, IVE, 10CM 공연',
            operationHours: '1일차 16:00~22:00',
            id: -1,
          }}
          openId={openId}
          mapElement={mapElement}
          popup={popup}
          setPopup={setPopup}
          setShowChangeBlock={props.setShowChangeBlock}
        />
        {data.map((e) => {
          return (
            <ClickInfo
              data={e}
              activeCategory={activeCategory}
              openId={openId}
              mapElement={mapElement}
              popup={popup}
              setPopup={setPopup}
              setShowChangeBlock={props.setShowChangeBlock}
            />
          );
        })}
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
  height: 100vh;
  z-index: 0;
`;
const GlobalStyle = createGlobalStyle`//전역 스타일 설정
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;
