import { BkBtn, Title, TopFixedDiv, UpperBar, Wrapper } from 'Routes/Home';
import { Flex } from 'asset/Style';
import Missing_Input, {
  MissingSemiTitle,
} from 'components/missing/Missing_Input';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { onClick_bkBtn } from '../../hooks/hooks';
import { useRecoilState } from 'recoil';
import { missingInfoState } from 'recoils/atoms_missing';
import { missingPost } from 'apis/apis_POST';

function Missing_Home() {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [info, setInfo] = useRecoilState(missingInfoState);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleSumbit = () => {
    // Object.entries(info)로 info 객체의 키-값 쌍을 배열로 변환
    // filter() 함수로 'another' 키를 제외
    const hasEmptyValue = Object.entries(info)
      .filter(([key, value]) => key !== 'content') // 'another' 키 제외
      .some(([key, value]) => value === '' || value == null);
    // some() 메서드는 배열 안의 어떤 요소라도 주어진 판별 함수를 적어도 하나라도 통과하는지 테스트
    //즉, 여기서는 하나라도 빈값이 나오면 true를 return할 것이다.
    if (hasEmptyValue) alert('필수 항목을 작성해주세요.');
    else if (!active) alert('개인정보 수집, 이용에 동의해주세요.');
    else
      missingPost(info)
        .then((res) => {
          console.log(res);
          alert('등록이 완료되었습니다.');
          navigate('/');
        })
        .catch((err) => console.log(err));
  };
  return (
    <Wrapper>
      <TopFixedDiv>
        <UpperBar>
          <BkBtn onClick={onClick_bkBtn(navigate)}></BkBtn>
          <Title>실종자 찾기 신청</Title>
        </UpperBar>
      </TopFixedDiv>
      <MissingInfoContainer>
        <MissingTitle>실종자 정보</MissingTitle>
        <Missing_Input
          require={true}
          title="실종자 이름"
          placeholder="이름 입력"
          id="name"
        />
        <Missing_Input
          require={true}
          title="실종자 나이"
          placeholder="나이 입력(숫자만)"
          id="age"
        />
        <Missing_Input
          setInfo={setInfo}
          require={true}
          title="실종자 성별"
          btn={true}
          id="gender"
        />
        <Missing_Input setInfo={setInfo} title="실종자 사진" img={true} />
      </MissingInfoContainer>
      <MissingInfoContainer>
        <MissingTitle>실종 상세 정보</MissingTitle>
        <Missing_Input
          require={true}
          title="실종 위치"
          placeholder="실종 위치 입력"
          id="missingLocation"
        />
        <Missing_Input
          require={true}
          title="실종 시간"
          placeholder="실종 시간 입력 (ex: 23:00)"
          id="missingTime"
        />
        <Missing_Input
          setInfo={setInfo}
          title="기타 특이사항"
          placeholder="특징, 인상착의 등 입력"
          id="content"
        />
      </MissingInfoContainer>
      <MissingInfoContainer>
        <MissingTitle>보호자 정보</MissingTitle>
        <Missing_Input
          require={true}
          title="보호자 성함"
          placeholder="성함 입력"
          id="parentName"
        />
        <Missing_Input
          require={true}
          title="보호자 연락처"
          placeholder="전화번호 입력 (-없이 숫자만)"
          id="parentNo"
        />
        <div>
          <MissingSemiTitle style={{ marginTop: '20px' }}>
            개인정보 수집•이용 동의서
          </MissingSemiTitle>
          <AgreeBox>
            개인정보 수집 및 이용에 대해 하단의 동의란을 체크함에 따라 [개인정보
            보호법] 제15조 및 제17조에 따라 아래의 내용으로 개인정보를 수집,
            이용 및 제공하는데 동의합니다.   □ 개인정보의 수집 및 이용에 관한
            사항 - 수집하는 개인정보 항목 (실종자 찾기 신청 내용 일체) : 실종자
            이름, 실종자 나이, 실종자 성별, 실종자 사진, 실종 위치, 실종 시간,
            기타 특이사항, 보호자 성함, 보호자 연락처 실종자 정보, 실종 상세
            정보, 보호자 정보 등과 그 外 실종자 찾기 기재 내용 일체  -
            개인정보의 이용 목적 : 수집된 개인정보를 실종자를 찾는 목적으로
            활용하며, 목적 외의 용도로는 사용하지 않습니다.   □ 개인정보의 보관
            및 이용 기간 - 귀하의 개인정보를 다음과 같이 보관하며, 수집, 이용 및
            제공목적이 달성된 경우 [개인정보 보호법] 제21조에 따라 처리합니다.
            개인정보보호법에 의거하여 개인정보 수집 및 이용에 따른 동의를 거부할
            수 있으나, 동의를 거부할 경우 “실종자 찾기” 진행이 불가능합니다.
          </AgreeBox>

          <Flex style={{ justifyContent: 'end', marginTop: '8px' }}>
            <Checkbox onClick={() => setActive(!active)} active={active}>
              {active ? <Circle /> : ''}
            </Checkbox>
            <Agree>동의합니다.</Agree>
          </Flex>
        </div>
        <ApplyBtn onClick={handleSumbit}>신청하기</ApplyBtn>
      </MissingInfoContainer>
    </Wrapper>
  );
}

export default Missing_Home;
const AgreeBox = styled.div`
  width: 358px;
  height: 102px;
  flex-shrink: 0;
  border-radius: 12px;
  background: #222;
  color: #aaa;
  font-family: 'Pretendard';
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px; /* 146.667% */
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 8px;
  }
  padding: 16px 12px;
`;
const MissingTitle = styled.div`
  color: #fafafa;

  /* logo */
  font-family: 'NanumSquareNeo-Variable';
  font-size: 24px;
  font-style: normal;
  font-weight: 900;
  line-height: 32px; /* 133.333% */

  align-self: flex-start;
`;
const MissingInfoContainer = styled.div`
  margin-top: 80px;
`;
const Agree = styled.div`
  color: #ddd;
  font-family: 'Pretendard';
  font-size: 16px;

  font-weight: 600;
  line-height: 24px; /* 150% */
  margin-left: 8px;
`;

const Checkbox = styled.div`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #999;
  border-radius: 20px;
  &:hover {
    cursor: pointer;
  }
  ${(props) => (props.active ? ' border: 1px solid #53CDDD;' : '')}
`;

export const ApplyBtn = styled.button`
  margin-top: 64px;
  margin-bottom: 24px;
  width: 358px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 12px;
  background: #53cddd;

  color: #111;
  text-align: center;
  font-family: 'Pretendard';
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
  line-height: 24px; /* 150% */
`;

const Circle = styled.div`
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  background-color: #53cddd;
  border-radius: 14px;
`;
