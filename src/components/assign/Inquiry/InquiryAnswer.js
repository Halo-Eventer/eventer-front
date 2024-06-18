import styled from 'styled-components';
import { InfoContainer } from '../Assign';
import { InputContainer } from 'Routes/assign/AssignPage_Home';
import { Flex } from 'asset/Style';
import { getInquiryDetail } from 'apis/apis_GET';
import { useEffect, useState } from 'react';
import { postInquiry } from 'apis/apis_POST';
import { useRecoilState } from 'recoil';
import { cancleState } from 'recoils/atoms_assign';

function InquiryAnswer(props) {
  const [info, setInfo] = useState();
  const [answer, setAnswer] = useState();
  const [cancle, setCancle] = useRecoilState(cancleState);

  useEffect(() => {
    console.log(info);
    getInquiryDetail(props.id).then((res) => {
      setInfo(res.data);
      setAnswer(res.data.answer);
    });
  }, [props.id]);
  const handleAnswer = (e) => {
    setAnswer(e.target.value);
  };
  const handlePostAnswer = () => {
    postInquiry(props.id, answer).then((res) => {
      alert('답변 완료');
      setCancle(!cancle);
    });
  };
  return (
    <div>
      <InfoContainer style={{ width: '500px', height: '1200px' }}>
        <Flex style={{ justifyContent: 'center' }}>
          <Btn
            onClick={() => setCancle(true)}
            style={{ margin: 0, background: '#F2F2F2', color: '#111' }}
          >
            취소하기
          </Btn>
          <Btn onClick={handlePostAnswer}>답변하기</Btn>
        </Flex>
        <InputContainer style={{ width: '500px' }}>
          <Box> {info?.title} </Box>
          <Box> {info?.userId ? info.userId : '익명'} </Box>
          <Box> 문의사항 비밀번호 </Box>
          <AnswerBox value={info?.content} readOnly></AnswerBox>
          <AnswerBox
            style={{ height: '720px' }}
            placeholder="답변 작성"
            value={answer ? answer : ''}
            onChange={handleAnswer}
          ></AnswerBox>
        </InputContainer>
      </InfoContainer>
    </div>
  );
}

export default InquiryAnswer;

const Btn = styled.button`
  width: 244px;
  height: 48px;
  border-radius: 4px;
  background: #4f33f6;

  color: #fff;
  text-align: center;
  font-size: 15px;
  font-weight: 700;
  line-height: 32px; /* 213.333% */
  &:hover {
    cursor: pointer;
  }
  border: 0;

  ${(props) => {
    return props.cancle
      ? 'color: #111; background: #F2F2F2;'
      : 'margin-left: 8px';
  }}
`;
const AnswerBox = styled.textarea`
  padding: 8px;
  width: 480px;
  height: 244px;
  flex-shrink: 0;
  color: #999;

  font-size: 15px;
  background: #fafafa;
  font-weight: 500;
  line-height: 24px; /* 160% */
  resize: none;
  border: none;

  color: #111;
`;

const Box = styled.div`
  width: 480px;
  padding: 8px;
  background: #fafafa;
  flex-shrink: 0;
`;
