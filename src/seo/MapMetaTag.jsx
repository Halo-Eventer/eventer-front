import { Helmet } from 'react-helmet';

const MapMetaTag = () => {
  // props로 content 내용을 불러올 예정임
  return (
    <Helmet>
      <title>목포해상 W쇼 MAP</title>
      <meta
        name="description"
        content="지도 기반 모바일 페이지를 통해 목포해상W쇼의 위치와 일정을 확인하고, 특별한 밤을 즐겨보세요!"
        data-react-helmet="true"
      />
      <meta property="og:url" content="https://mokpowshow.co.kr" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="목포해상 W쇼" />
      <meta
        property="og:description"
        content="해상무대에서 펼쳐지는 환상적인 공연과 불꽃의 만남, 국내 유일 해상 오브제 불꽃쇼 목포해상W쇼."
      />

      {/* <meta property="og:image" content="redkiwi.jpg" /> */}
    </Helmet>
  );
};

export default MapMetaTag;
