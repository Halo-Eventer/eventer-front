export const markerHandle = (naver, map, lat, lng, img, size, text) => {
  return new naver.maps.Marker({
    position: new naver.maps.LatLng(lat, lng),
    map,
    icon: {
      content:
        text != '공연장'
          ? `
      <div > 
      <div style="display:flex; justify-content: center;">
      <div style = "
       border-radius:28px;display:flex;justify-content:center;align-items: center;">
      <img style="width:32px;height:36px;" src = ${img}></img>
      </div>
      </div>
      <div style="display:flex; font-size: 12px; font-weight: 800; justify-content: center;line-height: 16px;"> ${text} </div>
      </div>`
          : `<div > 
      <div style="display:flex; justify-content: center; align-items: center;">
      <img src = ${img}></img>
      </div>
      <div style="display:flex; justify-content: center; margin-top:4px"> ${text} </div>
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
