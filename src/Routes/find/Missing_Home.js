import { BkBtn, Title, TopFixedDiv, UpperBar, Wrapper } from 'Routes/Home';
import { Flex } from 'asset/Style';
import Missing_Input, {
  MissingSemiTitle,
} from 'components/missing/Missing_Input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { onClick_bkBtn } from '../../hooks/hooks';

function Missing_Home() {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [info, setInfo] = useState({});

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
        />
        <Missing_Input
          require={true}
          title="실종자 나이"
          placeholder="나이 입력(숫자만)"
        />
        <Missing_Input
          setInfo={setInfo}
          require={true}
          title="실종자 성별"
          btn={true}
        />
        <Missing_Input setInfo={setInfo} title="실종자 사진" img={true} />
      </MissingInfoContainer>
      <MissingInfoContainer>
        <MissingTitle>실종 상세 정보</MissingTitle>
        <Missing_Input
          require={true}
          title="실종 위치"
          placeholder="실종 위치 입력"
        />
        <Missing_Input
          require={true}
          title="실종 시간"
          placeholder="실종 시간 입력 (ex: 23:00)"
        />
        <Missing_Input
          setInfo={setInfo}
          title="기타 특이사항"
          placeholder="특징, 인상착의 등 입력"
        />
      </MissingInfoContainer>
      <MissingInfoContainer>
        <MissingTitle>보호자 정보</MissingTitle>
        <Missing_Input
          require={true}
          title="보호자 성함"
          placeholder="성함 입력"
        />
        <Missing_Input
          require={true}
          title="보호자 연락처"
          placeholder="전화번호 입력 (-없이 숫자만)"
        />
        <div>
          <MissingSemiTitle style={{ marginTop: '20px' }}>
            개인정보 수집•이용 동의서
          </MissingSemiTitle>
          <AgreeBox>
            이와 관련하여 아래와 같이 귀하의 개인정보를 수집 및 이용 내용을
            개인정보보호법 제15조(개인정보의 수집·이용) 및 통계법 제33조(비밀의
            보호 등)에 의거하여 안내드리니 확인하여 주시기 바랍니다. *
            개인정보의 수집·이용 목적 : '2024 목포W쇼 배리어프리존 신청'을 위한
            개인정보 수집 * 수집하려는 개인정보 항목 : 이름, 전화번호, 증명서류
            * 개인정보의 보유 및 이용 기간 : 목포W쇼 기간 종료 후 즉시 폐기 ※
            개인정보보호법에 의거하여 개인정보 수집 및 이용에 따른 동의를 거부할
            수 있으나, 동의를 거부할 경우 신청 대상에 포함되지 않습니다.
          </AgreeBox>

          <Flex style={{ justifyContent: 'end', marginTop: '8px' }}>
            <Checkbox onClick={() => setActive(!active)} active={active}>
              {active ? <Circle /> : ''}
            </Checkbox>
            <Agree>동의합니다.</Agree>
          </Flex>
        </div>
        <ApplyBtn>찾기 신청</ApplyBtn>
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
  font-family: Pretendard;
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
  font-family: 'NanumSquare Neo OTF';
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
  font-family: Pretendard;
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

const ApplyBtn = styled.button`
  margin-top: 64px;
  margin-bottom: 24px;
  width: 358px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 12px;
  background: #53cddd;

  color: #111;
  text-align: center;
  font-family: Pretendard;
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
