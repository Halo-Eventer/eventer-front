export function makePolygon(tmpMap, naver, setPolygon) {
  const polygon1 = new naver.maps.Polygon({
    map: tmpMap,
    paths: [
      [126.43237125036256, 34.795382741543236],
      [126.43248312001636, 34.795220110168334],
      [126.4343122617882, 34.79609871338156],
      [126.43420919669107, 34.796258895383374],
    ],
    fillColor: '#FED393',
    fillOpacity: 1,
    strokeWeight: 1,
    strokeColor: '#FFAF36',
  });
  const polygon2 = new naver.maps.Polygon({
    map: tmpMap,
    paths: [
      [126.43294024028604, 34.79606594957744], //왼쪽 위
      [126.43309468001172, 34.795852586951064], // 왼쪽 아래
      [126.43337792671495, 34.79597784821558],
      [126.4332262345867, 34.79618897049904],
    ],
    fillColor: '#FED393',
    fillOpacity: 1,
    strokeWeight: 1,
    strokeColor: '#FFAF36',
  });
  setPolygon([polygon1, polygon2]);
}
