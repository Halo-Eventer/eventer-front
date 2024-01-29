export const markerHandle = (naver, map, lat, lng, img, size, text) => {
  console.log(img);
  return new naver.maps.Marker({
    position: new naver.maps.LatLng(lat, lng),
    map,
    icon: {
      content: `
      <div >
      <div style="display:flex; justify-content: center;">  
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
