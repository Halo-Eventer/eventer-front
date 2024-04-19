import tmpImg from 'asset/images/SampleThumbnail.png';
function makeOverlay(tmpMap, naver) {
  var HOME_PATH = window.HOME_PATH || '.';
  var bounds = new naver.maps.LatLngBounds(
    new naver.maps.LatLng(34.7958637033503, 126.43304179058626),
    new naver.maps.LatLng(34.7952637033501, 126.43224179058626)
  );

  var groundOverlay = new naver.maps.GroundOverlay(HOME_PATH + tmpImg, bounds, {
    opacity: 1,
    clickable: false,
  });

  groundOverlay.setMap(tmpMap);
}

export default makeOverlay;
