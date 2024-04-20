import tmpImg from 'asset/images/SampleThumbnail.png';
function makeOverlay(tmpMap, naver) {
  var bounds = new naver.maps.LatLngBounds(
    new naver.maps.LatLng(34.79262495209305, 126.433928073729), // sw
    new naver.maps.LatLng(34.79352366548996, 126.43547284990258) // en
  );
  var overlayHTML = `<div style="position:absolute; left:0; top:0; width:100%; height:100%; transform: rotate(45deg);">
  <img src="${tmpImg}" style="width: 100%; height: 100%; opacity: 1;">
</div>`;
  var groundOverlay = new naver.maps.GroundOverlay(overlayHTML, bounds, {
    opacity: 1,
    clickable: false,
  });

  groundOverlay.setMap(tmpMap);
}

export default makeOverlay;
