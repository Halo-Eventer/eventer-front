import gate from 'asset/images/gate.svg';
export function makeFixedMarker(tmpMap, naver) {
  const marker = new naver.maps.Marker({
    position: new naver.maps.LatLng(34.795426053405535, 126.43244749184832),
    tmpMap,
    icon: {
      content: `
      <div > 
      <div style="display:flex; justify-content: center;align-items:center">
       <img style="margin:0;idth:32px;height:32px;" src = ${gate}></img>
      </div>
      <div style="display:flex; font-size: 12px;
      font-family: 'NanumSquareNeo';
      text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;
       font-weight: 800; justify-content: center;line-height: 16px;"> 게이트 </div>
      </div>`,
      size: new naver.maps.Size(28, 28),
      origin: new naver.maps.Point(0, 0),
      anchor: new naver.maps.Point(25, 26),
    },
  });
  marker.setMap(tmpMap);
}
