import { useEffect, useRef, useState } from 'react';

import { styled, createGlobalStyle } from 'styled-components';
import SwipeToSlide from '../asset/CategorySlider';
import ClickInfo from '../components/map/ClickInfo';
import { markerHandle } from '../asset/MarkerHandle';
import eventImg from 'asset/category/eventCategory.svg';
import sojuImg from 'asset/category/sojuCateogory.svg';
import boothImg from 'asset/category/boothCategory.svg';
import foodImg from 'asset/category/foodtruckCategory.svg';
import doctorImg from 'asset/marker/doctor.png';
import hallMarker from 'asset/marker/concertHall.svg';
import getMarker from '../components/getMarker';
import { getDetailInfo } from 'components/map/getDetailInfo';
import { getAllConcert, getDetailConcert } from 'apis/apis';




function NolzaMap(props) {
  const [activeCategory, setActiveCategory] = useState(1);
  const [prevClustering, setPrevClustering] = useState('');
  const [clickInfo, setClickInfo] = useState('');
  const [concertHallMarker, setConcertHallMarker] = useState([]);
  const [concertData, setConcertData] = useState([]);
  const [concertClick, setConcertClick] = useState(0); // 공연장과 타마커의 id값 같은 경우 clickinfo 두개 생성 방지.
  let markerImg = '';
  const mapElement = useRef(1);
  const [prevMarkers, setPrevMarkers] = useState([]);
  const [map, setMap] = useState(null);
  const { naver } = window;
  const [popup, setPopup] = useState(false);
  const [data, setData] = useState([]);
  const [openId, setOpenId] = useState(0);

  useEffect(() => {
    if (activeCategory == 1) markerImg = eventImg;
    else if (activeCategory == 2) markerImg = foodImg;
    else if (activeCategory == 3) markerImg = sojuImg;
    else if (activeCategory == 4) markerImg = boothImg;
    else if (activeCategory == 5) markerImg = doctorImg;
  }, [activeCategory, data]);
  useEffect(() => {
    let mapOption = {
      center: new naver.maps.LatLng(37.5506, 127.0744),
      zoom: 17,
      minZoom: 17,
      tileTransition: true,
      scaleControl: true,
      logoControl: false,
      mapDataControl: false,
      zoomControl: false,
      mapTypeControl: false,
    };
    const tmpMap = new naver.maps.Map(mapElement.current, mapOption);
    setMap(tmpMap);
    getAllConcert(1)
      .then((res) => {
        console.log(res);
        setConcertData(res.data);
        let concertHallMarkerInfo = res.data.map((e) => {
          return markerHandle(
            naver,
            tmpMap,
            e.latitude,
            e.longitude,
            hallMarker,
            100,
            '공연장'
          );
        });
        setConcertHallMarker(concertHallMarkerInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    concertHallMarker.map((e, i) => {
      e.setMap(map);
      naver.maps.Event.addListener(e, 'click', () =>
        handleConcertHallMarker(concertData[i].id)
      );
    });
  }, [concertHallMarker]);
  useEffect(() => {
    // 내 위치 찾기
    let options = {
      enablehighAccuracy: false, // 높은 정확도 위해 true 배터리 많이 닳음.
      maximumAge: 0, // 0-> 캐싱된 position 사용하지 않고 실제 현재 위치만 사용
      timeout: 50000, //위치 정보 받는 최대 대기시간
    };
    let marker = '';
    let flag = false;
    if (navigator.geolocation)
      navigator.geolocation.watchPosition(getMyMarker, error, options);

    function error(err) {
      console.log(err);
    }
    function getMyMarker(e) {
      console.log('success', e.coords, e.coords.latitude, e.coords.longitude);
      if (flag) marker.setMap(null);
      else {
        marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(
            e.coords.latitude,
            e.coords.longitude
          ),
          map: map,
          icon: {
            content: `
        <div style="width:20px;height:20px;background-color:blue;display:flex;
        justify-content:center;align-items:center;border-radius:20px">
        </div>`,
          },
        });
        console.log(marker);
        marker.setMap(map);
        flag = true;
      }
    }
  }, []);
  useEffect(() => {
    // 마커 찍기
    if (!map) return;
    if (prevClustering != '') prevClustering.setMap(null);

    if (prevMarkers) {
      prevMarkers.forEach((e) => {
        e.setMap(null);
      });
    }

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
      setPrevMarkers(markers);

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

        setPrevClustering(
          new MarkerClustering({
            minClusterSize: 1,
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
          })
        );
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

  const handleConcertHallMarker = (id) => {
    setPopup(true);
    setConcertClick(true);
    getDetailConcert(id)
      .then((res) => {
        setClickInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setOpenId(id);
  };
  const handleMarkers = (data) => {
    getDetailInfo(data.id, setClickInfo, activeCategory);
    setConcertClick(false);
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
        {concertClick
          ? concertData.map((e) => {
              return (
                <ClickInfo
                  data={e}
                  openId={openId}
                  mapElement={mapElement}
                  popup={popup}
                  clickInfo={clickInfo}
                  setPopup={setPopup}
                  setShowChangeBlock={props.setShowChangeBlock}
                />
              );
            })
          : data.map((e) => {
              if (e.id == openId)
                return (
                  <ClickInfo
                    data={e}
                    activeCategory={activeCategory}
                    openId={openId}
                    mapElement={mapElement}
                    popup={popup}
                    setPopup={setPopup}
                    clickInfo={clickInfo}
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
