import doctorImg from 'asset/images/doctor.svg';
import { makeGate } from './makeGate';
export function makeFixedMarker(tmpMap, naver, setFixedMarker) {
  const gate1 = makeGate(tmpMap, naver, 34.79538675340553, 126.4325464918483);
  const gate2 = makeGate(tmpMap, naver, 34.79557534198884, 126.43289948037096);
  const gate3 = makeGate(tmpMap, naver, 34.79594824251079, 126.43376542518426);
  const gate4 = makeGate(tmpMap, naver, 34.79616301982082, 126.43418745091185);

  const seat = new naver.maps.Marker({
    position: new naver.maps.LatLng(34.795734198629084, 126.43331949484947),
    tmpMap,
    icon: {
      content: `
      <div style="text-align: center"> 
      <div style=" font-size: 12px;
      font-family: 'NanumSquareNeo';
      text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;
       font-weight: 800;line-height: 16px;"> 
       데크객석
       </div>
       <div style=" font-size: 12px;
       font-family: 'NanumSquareNeo';
       text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;
        font-weight: 800;line-height: 16px;"> 
        (선착순 2,000명)
        </div>
      </div>`,
      size: new naver.maps.Size(50, 52),
      origin: new naver.maps.Point(0, 0),
      anchor: new naver.maps.Point(25, 26),
    },
  });
  const doctor = new naver.maps.Marker({
    position: new naver.maps.LatLng(34.795884198629084, 126.43269949484947),
    tmpMap,
    icon: {
      content: `
      <div style="text-align: center"> 
      <div style="display:flex; justify-content: center;align-items:center">
       <img style="margin:0;idth:32px;height:32px;" src = ${doctorImg}></img>
      </div>
      <div style=" font-size: 12px;
      font-family: 'NanumSquareNeo';
      text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;
       font-weight: 800;line-height: 16px;"> 
       응급의료센터
       </div>
      </div>`,
      size: new naver.maps.Size(50, 52),
      origin: new naver.maps.Point(0, 0),
      anchor: new naver.maps.Point(25, 26),
    },
  });
  const fixedMarker = [gate1, gate2, gate3, gate4, seat, doctor];
  fixedMarker.map((e) => {
    e.setMap(tmpMap);
  });
  setFixedMarker(fixedMarker);
}
