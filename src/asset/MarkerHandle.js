import { useState } from 'react';

export const markerHandle = (id, naver, map, lat, lng, img, size, text) => {
  return new naver.maps.Marker({
    position: new naver.maps.LatLng(lat, lng),
    map,
    icon: {
      content:
        text != '공연장'
          ? id == -1
            ? `
          <div > 
          <div style="display:flex; justify-content: center;">
          <div style = "
           border-radius:28px;display:flex;justify-content:center;align-items: center;">
          <img style="width:60px;height:60px;" src = ${img}></img>
          </div>
          </div>
          <div style="display:flex; font-size: 12px;
          font-family: 'NanumSquareNeo';
          text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;
           font-weight: 800; justify-content: center;line-height: 16px;"> ${text} </div>
          </div>`
            : `
          <div > 
          <div style="display:flex; justify-content: center;">
          <div style = "
           border-radius:28px;display:flex;justify-content:center;align-items: center;">
          <img style="width:28px;height:32px;" src = ${img}></img>
          </div>
          </div>
          <div style="display:flex; font-size: 12px;font-family: 'NanumSquareNeo';
          text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;
           font-weight: 800; justify-content: center;line-height: 16px;"> ${text} </div>
          </div>`
          : `<div> 
      <div style="position:absolute;bottom:-70px;right:-80px">
      <img style="width:80px;height:78px" src = ${img}></img>
      </div>
      
      </div>`,
      size: new naver.maps.Size(size, size),
      origin: new naver.maps.Point(0, 0),
      anchor: new naver.maps.Point(25, 26),
    },
  });
  // 마커 클릭 이벤트 등록
  //   naver.maps.Event.addListener(map.marker, 'click', () => {
  //     console.log('marker clicked');
  //   });
};
