import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { styled, createGlobalStyle } from 'styled-components';
import SwipeToSlide from '../../asset/CategorySlider';
import ClickInfo from '../../components/map/ClickInfo';
import { markerHandle } from '../../asset/MarkerHandle';

import hallMarker from 'asset/marker/concertHall.png';

import getMarker from '../../components/map/getMarker';
import eventMarker from 'asset/marker/manageMarker.png';
import toiletMarker from 'asset/marker/toiletMarker.png';
import infoMarker from 'asset/marker/infoMarker.png';
import storeMarker from 'asset/marker/storeMarker.png';
import parkMarker from 'asset/marker/parkingMarker.png';
import { getDetailInfo } from 'components/map/getDetailInfo';
// import { changeMarker } from 'asset/changeMarker';

import { UpperBar, BkBtn, Title } from '../Home';
import { getAllConcert } from 'apis/apis_GET';
import { makePolygon } from 'utils/map/makePolygon';
import { makeFixedMarker } from 'utils/map/makeFixedMarker';
import makeOverlay from '../../utils/map/makeOverlay';

function NolzaMap(props) {
  const [prevZoom, setPrevZoom] = useState();
  const [fixedMarker, setFixedMarker] = useState();
  const [zoom, setZoom] = useState();
  const [activeId, setActiveId] = useState('');
  const [activeCategory, setActiveCategory] = useState(4);
  const [prevClustering, setPrevClustering] = useState('');
  const [clickInfo, setClickInfo] = useState('');
  const [concertHallMarker, setConcertHallMarker] = useState([]);
  const [concertData, setConcertData] = useState([]);
  const [concertClick, setConcertClick] = useState(0); // 공연장과 타마커의 id값 같은 경우 clickinfo 두개 생성 방지.
  const [polygon, setPolygon] = useState();

  let markerImg = '';

  const mapElement = useRef(1);
  const [prevMarkers, setPrevMarkers] = useState([]);
  const [map, setMap] = useState(null);
  const { naver } = window;
  const [popup, setPopup] = useState(false);
  const [data, setData] = useState([]);
  const [openId, setOpenId] = useState(0);

  const selectedMarker = useRef(null);
  const selectedName = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeCategory == 1) markerImg = eventMarker;
    else if (activeCategory == 2) markerImg = infoMarker;
    else if (activeCategory == 3) markerImg = storeMarker;
    else if (activeCategory == 4) markerImg = toiletMarker;
    else if (activeCategory == 5) markerImg = parkMarker;
  }, [activeCategory, data]);

  useEffect(() => {
    const initZoom = 18;
    setPrevZoom(initZoom);
    setZoom(initZoom);
    let mapOption = {
      center: new naver.maps.LatLng(34.796118401891526, 126.43307373812141),
      zoom: initZoom,
      minZoom: 18,
      maxZoom: 20,
      tileTransition: true,
    };
    const tmpMap = new naver.maps.Map(mapElement.current, mapOption);

    getAllConcert(1)
      .then((res) => {
        setConcertData(res.data);
        const info = res.data?.map((e) => {
          let img = '';
          const text = e.name;

          img = hallMarker;

          return markerHandle(
            e.id,
            naver,
            tmpMap,
            e.latitude,
            e.longitude,
            img,
            100,
            text
          );
        });

        setConcertHallMarker(info);
      })
      .catch((err) => {
        // console.log(err);
      });
    setMap(tmpMap);

    // makePolygon(tmpMap, naver, setPolygon);
    makeOverlay(tmpMap, naver);
    // makeFixedMarker(tmpMap, naver, setFixedMarker);
    //   const rect = new naver.maps.Rectangle({
    //     // 영역 설정
    //     map: tmpMap,
    //     bounds: new naver.maps.LatLngBounds(
    //       naver.maps.LatLng(34.7920975019376, 126.43248443747436),
    //       naver.maps.LatLng(34.791263503821315, 126.43423101944666)
    //     ),
    //     fillColor: '#FED393',
    //     fillOpacity: 0.4,
    //     strokeWeight: 1,
    //     strokeColor: '#FFAF36',
    //   });
    window.scrollTo(0, -200);
    naver.maps.Event.addListener(tmpMap, 'zoom_changed', function (zoom) {
      setZoom(zoom);
    });
  }, []);

  useEffect(() => {
    if (zoom === 18 && prevZoom == 17) {
      makeFixedMarker(map, naver, setFixedMarker);
      makePolygon(map, naver, setPolygon);
    } else if (zoom === 17 && prevZoom == 18) {
      fixedMarker.map((e) => {
        e.setMap(null);
      });
      polygon.forEach((e) => {
        e.setMap(null);
      });
    }
    setPrevZoom(zoom);
  }, [zoom]);

  useEffect(() => {
    concertHallMarker.map((e, i) => {
      if (i == 0) {
        naver.maps.Event.addListener(e, 'click', () =>
          navigate('/concertinfo')
        );
      }
    });
  }, [concertHallMarker]);
  useEffect(() => {
    // if (popup == false) {
    //   if (!!selectedMarker.current) {
    //     selectedMarker.current.setIcon(
    //       changeMarker(activeCategory, 1, selectedName.current)
    //     );
    //     selectedName.current = null;
    //     selectedMarker.current = null;
    //   }
    // }
  }, [popup]);
  // useEffect(() => {
  //   // 내 위치 찾기
  //   let options = {
  //     enablehighAccuracy: false, // 높은 정확도 위해 true 배터리 많이 닳음.
  //     maximumAge: 0, // 0-> 캐싱된 position 사용하지 않고 실제 현재 위치만 사용
  //     timeout: 50000, //위치 정보 받는 최대 대기시간
  //   };
  //   let marker = '';
  //   let flag = false;
  //   if (navigator.geolocation)
  //     navigator.geolocation.watchPosition(getMyMarker, error, options);

  //   function error(err) {
  //     console.log(err);
  //   }
  //   function getMyMarker(e) {
  //     console.log('success', e.coords, e.coords.latitude, e.coords.longitude);
  //     if (flag) marker.setMap(null);
  //     else {
  //       marker = new naver.maps.Marker({
  //         position: new naver.maps.LatLng(
  //           e.coords.latitude,
  //           e.coords.longitude
  //         ),
  //         map: map,
  //         icon: {
  //           content: `
  //       <div style="width:20px;height:20px;background-color:blue;display:flex;
  //       justify-content:center;align-items:center;border-radius:20px">
  //       </div>`,
  //         },
  //       });

  //       marker.setMap(map);
  //       flag = true;
  //     }
  //   }
  // }, []);
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
          id: e.id,
          name: e.name,
          lat: e.latitude,
          lng: e.longitude,
          summary: e.summary,
          type: e.type,
        };
      });

      const markers = markerData?.map((e) => {
        return markerHandle(
          e.id,
          naver,
          map,
          e.lat,
          e.lng,
          markerImg,
          50,
          e.name
        );
      });
      setPrevMarkers(markers);

      // import('../asset/MarkerClustering').then(({ MarkerClustering }) => {
      // const htmlMarker1 = {
      //   content: [
      //     `<div style='width: 50px; height: 50px; border-radius: 50%;  background: #FFF4F4;
      //   display: flex; align-items: center; justify-content: center'>`,
      //     `<div>`,
      //     `<img src=${markerImg}></img>`,
      //     `<p style='color: #000; margin:0; display:flex; justify-content:center; font-size: 0.875rem '>1</p>`,
      //     `</div>`,
      //     `</div>`,
      //   ].join(''),
      //   size: new naver.maps.Size(40, 40),
      // };
      // setPrevClustering(
      //   new MarkerClustering({
      //     minClusterSize: 1,
      //     maxZoom: 19,
      //     map: map,
      //     markers: markers,
      //     disableClickZoom: false,
      //     gridSize: 200,
      //     icons: [htmlMarker1],
      //     indexGenerator: [10, 100, 200, 500, 1000],
      //     stylingFunction: function (clusterMarker, count) {
      //       clusterMarker.getElement().querySelector('p').textContent = count;
      //     },
      //   })
      // );
      // });
      markers?.map((e, i) => {
        naver.maps.Event.addListener(e, 'click', () =>
          handleMarkers(data[i], e)
        );
      });
    }
  }, [data]);

  useEffect(() => {
    getMarker(activeCategory, setData);
    setOpenId(-2);
  }, [activeCategory]);

  const handleMarkers = (data, marker) => {
    setActiveId(data.id);

    // if (!selectedMarker.current || selectedMarker.current !== marker) {
    //   if (!!selectedMarker.current) {
    //     selectedMarker.current.setIcon(
    //       changeMarker(activeCategory, 1, selectedName.current)
    //     );
    //   }
    //   marker.setIcon(changeMarker(activeCategory, 0, data.name));
    // }
    selectedMarker.current = marker;
    selectedName.current = data.name;

    getDetailInfo(data.id, setClickInfo, activeCategory);
    setConcertClick(false);
    setPopup(true);
    setOpenId(data.id);
  };

  return (
    <div>
      <GlobalStyle />
      <UpperBar style={{ position: 'absolute', zIndex: '10', width: '100%' }}>
        <BkBtn style={{ left: '20px' }} onClick={() => navigate(-1)} />
        <Title>공연장 지도</Title>
      </UpperBar>
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
                    // marker={marker}
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

export const MapContainer = styled.div`
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  /* height: 100vh; */
  z-index: 0;
`;
const GlobalStyle = createGlobalStyle`//전역 스타일 설정
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    
display: fixed;
  overflow: hidden;
  }
`;
