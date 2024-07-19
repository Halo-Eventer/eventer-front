import overlay from 'asset/marker/overlay.png';
import overlayTmp from 'asset/marker/overlayTmp.webp';
function makeOverlay(tmpMap, naver) {
  var bounds = new naver.maps.LatLngBounds(
    new naver.maps.LatLng(34.79513223922466, 126.43181022828543), // sw
    new naver.maps.LatLng(34.796961271799276, 126.43460325494713) // en
  );
  var boundsTmp = new naver.maps.LatLngBounds(
    // 34.80921927876436
    // 126.36619810318679
    new naver.maps.LatLng(34.80752041179834, 126.36391864650823), // sw
    new naver.maps.LatLng(34.81105555545976, 126.36808076901747) // en
  );
  //   var overlayHTML = `
  //   <img src="${tmpImg}" style="width: 100%; height: 100%; opacity: 1;">
  // `;
  var groundOverlay = new naver.maps.GroundOverlay(overlay, bounds, {
    opacity: 1,
    clickable: false,
  });
  let groundOverlayTmp = new naver.maps.GroundOverlay(overlayTmp, boundsTmp, {
    opacity: 1,
    clickable: false,
  });
  // groundOverlay.setMap(tmpMap);
  groundOverlayTmp.setMap(tmpMap);
}

export default makeOverlay;
