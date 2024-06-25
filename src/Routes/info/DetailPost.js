import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
  Wrapper,
  ImgBlock,
  StyledSlider,
  MainBoard,
  TextBoard,
  festivalId,
  Index,
} from '../Home';

import { getDetail } from 'apis/apis_get';
import styled from 'styled-components';
import TopFixedBarPostDetail from 'components/info/TopFixedBarPostDetail';
import tempImg from 'asset/images/TempImg.png';

//import * as axios from 'axios';
/*import * as axios from 'axios';
는 JavaScript의 ES6 모듈 구문입니다. 
이 구문은 "axios"라는 모듈에서 
모든 export를 가져와서 axios라는 객체로 묶어
사용하겠다는 뜻입니다.*/

function DetailPost() {
  const postId = useParams().id;
  const [currentNum, setCurrentNum] = useState(1);

  var settings = {
    dots: false, // 슬라이드 바닥에 점을 보이게 할 것인지 설정
    infinite: true, // 무한 반복되게 할 것인지 설정
    speed: 300, // 슬라이드하는데 걸리는 시간 설정
    slidesToShow: 1, // 한 번에 보여줄 슬라이드 개수
    slidesToScroll: 1, // 슬라이드 넘어갈 때마다 몇 개의 슬라이드를 넘길 것인지 설정
    autoplay: false, // 자동으로 슬라이드를 넘길 것인지 설정
    afterChange: (current) => {
      //event처럼 이미 current자리는 현재 슬라이드 번호에 대한 인자임
      setCurrentNum(current + 1);
    }, //현재 슬라이드 위치에 따른 변화 get가능
  };

  const [detailedList, setDetailedList] = useState({ images: [tempImg] });
  const [titleText, setTitleText] = useState('');

  useEffect(() => {
    /* '공지사항 / 이벤트' 전환때문에 얘는 fetchList()가 아닌 
    getDetail을 가지고 직접 페이지 내 변수 조작*/
    getDetail(festivalId, 'notice', postId) //url의 카테고리는 일단 notice
      .then((response) => {
        if (typeof response.data === 'object') {
          setDetailedList(response.data);
          if (response.data.type === 'NOTICE') setTitleText('공지사항');
          else setTitleText('이벤트');
          // console.log('detail fetch success : ', response.data);
        } else {
          // console.log('detail fetch no data ;(');
        }
      })
      .catch((error) => {
        // console.log('detail fetch failed ;(', error);
      });
  }, []);

  return (
    <div>
      <TopFixedBarPostDetail titleText={titleText} />
      <Wrapper>
        <MainBoard>
          <ImgBlock style={{ width: '100%', marginBottom: '-6px' }}>
            <Index>
              {currentNum}/{detailedList?.images.length}
            </Index>

            <StyledSlider {...settings}>
              {detailedList.images?.map((item, key) => (
                <ImgBoardForPost key={key} src={item} />
              ))}
            </StyledSlider>
          </ImgBlock>
          <TextBoard>
            <div>
              <h2>{detailedList.subtitle}</h2>
              <h1>{detailedList.title}</h1>
              <HR />
              {detailedList.content?.split('\n').map((line, key) => {
                if (line.length === 0) {
                  /*애초에 split함수로 개행문자를 기준으로 나눴다는 건 
                                    개행문자는 나눠진 원소에 들어가지 않는다는 뜻,
                                    따라서 변수 line에 개행문자가 들어갈 일은 없으므로
                                    그냥 공간만 차지하는 빈 원소일 뿐*/
                  return <br key={key} />;
                } else return <h3 key={key}>{line}</h3>;
              })}
            </div>
          </TextBoard>
        </MainBoard>
      </Wrapper>
    </div>
  );
}

export default DetailPost;

export const ImgBoardForPost = styled.img`
  object-fit: cover;
  object-position: top;
  //이미지 태그용 (<> background-position)
  width: 100%;
  flex-shrink: 0;
  background-color: #000;

  z-index: 2;
`;

const HR = styled.p`
  width: 350px;
  height: 1px;
  flex-shrink: 0;
  margin-bottom: 16px;

  background-color: #aaa;
`;
