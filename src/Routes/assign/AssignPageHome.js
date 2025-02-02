import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { Flex } from 'asset/Style';

import {
  UpperBarComponent,
  MiddleBarComponent1,
} from '../../components/assign/AssignBar';

import dropDown from 'asset/images/DropDown.svg';
import { useRecoilState } from 'recoil';
import { GRID_WIDTH } from 'constants/const_assign';

function AssignPageHome() {
  const navigate = useNavigate();

  const [festival, setFestival] = useState('세종대학교');
  const [rotate, setRotate] = useState('0deg');
  const [festivalId, setFestivalId] = useRecoilState(festivalId);


  const onChange_select = (event) => {
    event.preventDefault();
    setFestival(event.currentTarget.value);
  };
  const onBlur_select = (event) => {
    event.preventDefault();
    setRotate('0deg');
  };
  const onClick_select = (event) => {
    event.preventDefault();
    setRotate('90deg');
  };
  //select태그에서 사용하기 (포커스처리인 onBlur 활용)
  //(뭘 선택하자마자 애니메이션 발생하게 하는건 힘듬. 그냥 select자체의 포커스 여부에만 집중해야함)

  const onClick_submit = () => {
    navigate(`/assign_select/${festivalId}`);
  };

  return (
    <Wrapper>
      <UpperBarComponent />
      <MiddleBarComponent1 />
      <FestivalSelectMainBox>
        <h1 color="#4F33F6">대학교 선택</h1>
        <FestivalSelectBox rotate={rotate}>
          <select
            onChange={onChange_select}
            onBlur={onBlur_select}
            onClick={onClick_select}
            value={festival}
          >
            <option value="세종대학교">세종대학교</option>
            <option value="Test1">Test1</option>
            <option value="Test2">Test2</option>
          </select>
          <img src={dropDown} />
        </FestivalSelectBox>
        <button onClick={onClick_submit}>선택 완료</button>
      </FestivalSelectMainBox>
    </Wrapper>
  );
}
export default AssignPageHome;

export const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;

  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

//======================================상단바 : 시작

export const UPPER_SELECTBOX = 145;
//selectbox 활용방식(너비 100% + padding + z-index + 드롭다운 이미지는 absolute)

export const Logo = styled.div`
  @font-face {
    font-family: 'YClover-Bold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_231029@1.1/YClover-Bold.woff2')
      format('woff2');
    font-weight: 700;
    font-style: normal;
  }

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-${GRID_WIDTH / 2}px, -50%);
  //grid에 맞게 추가하는 법 (백틱 + 포매팅 활용)

  cursor: pointer;

  color: #111;
  font-family: 'YClover-Bold';
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: 145.455%;
`;

export const FestivalSelectBox = styled.div`
  width: 145px;
  height: 32px;

  border-radius: 4px;
  border: 1px solid #ccc;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  select {
    width: 100%;

    appearance: none; /* 이것은 모든 브라우저에서 기본 화살표를 제거합니다. */
    -webkit-appearance: none; /* 이것은 Safari와 같은 웹킷 기반 브라우저에서 필요합니다. */
    -moz-appearance: none; /* 이것은 Firefox에서 필요합니다. */

    background-color: transparent;
    border: none;
    z-index: 2;

    color: #111;

    font-style: normal;
    font-weight: 500;
  }
  img {
    position: absolute;
    transform: rotate(${(props) => props.rotate});
    transition: transform 0.2s ease-out;
  }
`;

export const UpperBar = styled.div`
  position: relative;

  width: 100vw;
  height: 64px;

  border-bottom: 1px solid #eee;
  background: #fff;

  ${FestivalSelectBox} {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(${GRID_WIDTH / 2 - UPPER_SELECTBOX}px, -50%);
    //right:0px; (왼쪽 상단 꼭지점 기준이 아니라 그냥 오른쪽에 딱 붙여줌)

    width: ${UPPER_SELECTBOX}px;
    padding: 4px;

    select {
      color: black;

      font-size: 15px;
      font-style: normal;
      font-weight: 500;
      line-height: 160%;
    }
    img {
      right: 4px;
      width: 16px;
      height: 16px;
    }
  }
`;
//======================================상단바 : 끝

//======================================중간바 : 시작
export const H1 = styled.h1`
  color: ${(props) => props.color || 'black'};
  font-weight: ${(props) => props.fontWeight || '600'};
`;
export const MiddleBar = styled.div`
  position: relative;

  width: 100vw;
  height: 64px;
  border-bottom: 1px solid #eee;
  background: #fff;

  div {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-${GRID_WIDTH / 2}px, -50%);

    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 4px;

    ${H1} {
      margin-right: 4px;

      font-size: 16px;
      font-style: normal;
      line-height: 24px; /* 150% */
      padding: 4px;

      display: flex;
      justify-content: center;
      align-items: center;
    }

    img {
      width: 16px;
      height: 16px;
    }
  }
`;
//=================중간바 : 끝

//=================메인박스 (대학교 선택, 대학선택 select, 버튼 등) : 시작
export const FestivalSelectMainBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 256px;

  display: flex;
  flex-direction: column;
  justify-content: column;
  align-items: center;

  h1 {
    width: 100%;
    padding: 0;
    margin: 0 0 16px 0;

    color: #111;
    text-align: center;

    font-size: 32px;
    font-style: normal;
    font-weight: 800;
    line-height: 150%;
  }
  ${FestivalSelectBox} {
    width: 256px;
    height: 64px;
    flex-shrink: 0;
    margin-bottom: 8px;
    padding: 20px;
    select {
      width: 184px;
      font-size: 17px;
      line-height: 141.176%;
    }
    img {
      right: 16px;
      width: 32px;
      height: 32px;
    }
  }
  button {
    width: 256px;
    height: 64px;
    flex-shrink: 0;

    border: none;
    border-radius: 4px;
    background: #4f33f6;

    color: #fff;
    text-align: center;

    font-size: 17px;
    font-style: normal;
    font-weight: 700;

    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
//=================메인박스 (대학교 선택, 대학선택 select, 버튼 등) : 끝

export const AssignBlank = styled.div`
  width: 352px;
  height: 560px;
  flex-shrink: 0;

  border-radius: 4px;
  border: 1px solid #eee;
  background: linear-gradient(
    159deg,
    #f6f6f6 0%,
    rgba(244, 244, 244, 0) 48%,
    #f6f6f6 100%
  );

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AssignBox = styled(Flex)`
  align-items: flex-start;
  gap: 32px;

  margin-top: 32px;
`;

//===== Assign.js에 있던 중복 컴포넌트들 (AssignPage의 대부분 컴포넌트들은 여기서 관리) =====//
export const InputBox = styled(Flex)`
  position: relative;

  justify-content: space-between;
  align-items: center;
`;
export const Input = styled.input`
  padding: 0;
  margin-left: 8px;
  margin-top: 8px;
  background: #fafafa;
  height: 24px;
  width: 300px;
  border-radius: 4px;
  border: 0;

  color: #111;

  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 160% */

  &::placeholder {
    display: flex;
    align-items: center;
  }
  &:focus {
    outline: none;
  }
`;

export const TextAreaDiv = styled.div`
  width: 336px;
  height: 96px;
  background: #fafafa;
  padding: 8px;
`;

export const TextArea = styled.textarea`
  width: 320px;
  height:80px;
  background: #fafafa;

  color: #111;
  font-size: 15px;
  font-weight: 500;
  line-height: 24px; /* 160% */

  resize: none;

  overflow-y: visible;
  border: none;

  white-space: pre-wrap;

  &:focus {
    outline: none;
  }
`;

export const SemiTitle = styled.div`
  display: flex;
  height: 30px;
`;
export const Category = styled.select`
  width: 200px;
  height: 30px;
`;

export const InputDiv = styled.div`
  background: #fafafa;
  width: 336px;
  height: 40px;
`;

export const InputContainer = styled(Flex)`
  margin-top: 8px;
  width: 350px;
  height: auto;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1px solid #eee;

  padding-top: 8px;
  padding-bottom: 8px;

  flex-direction: column;
  align-items: center;
  gap: 4px;
`;
