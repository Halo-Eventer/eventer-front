import overlay from 'asset/marker/overlay.png';
function makeOverlay(tmpMap, naver) {
  var bounds = new naver.maps.LatLngBounds(
    new naver.maps.LatLng(34.79513223922466, 126.43181022828543), // sw
    new naver.maps.LatLng(34.796961271799276, 126.43460325494713) // en
  );
  //   var overlayHTML = `
  //   <img src="${tmpImg}" style="width: 100%; height: 100%; opacity: 1;">
  // `;
  var groundOverlay = new naver.maps.GroundOverlay(overlay, bounds, {
    opacity: 1,
    clickable: false,
  });

  groundOverlay.setMap(tmpMap);
}

export default makeOverlay;
