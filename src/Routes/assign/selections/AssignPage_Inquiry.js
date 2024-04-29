import styled from 'styled-components';

import {
  UpperBar_Component,
  MiddleBar_Component2,
} from 'components/assign/Assign_Bar';

import { AssignBox, Assign_Blank } from 'Routes/assign/AssignPage_Home';

import { cancleState } from 'recoils/atoms_assign';
import { useRecoilState } from 'recoil';

import InquiryAnswer from 'components/assign/Inquiry/InquiryAnswer';
import { useEffect, useState } from 'react';
import { getInquiry } from 'apis/apis_GET';
import secret from 'asset/assign/secret.svg';
import { deleteInquiry } from 'apis/apis_DELETE';
function AssignPage_Inquiry() {
  const [cancle, setCancle] = useRecoilState(cancleState);
  const [inquiryBoard, setInquiryBoard] = useState([]);
  const [activeId, setActiveId] = useState();
  function sortDate2(list) {
    const sorted_list = list
      .sort(function (a, b) {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      })
      .reverse();
    return sorted_list;
  }
  console.log(inquiryBoard);
  useEffect(() => {
    getInquiry()
      .then((res) => {
        setInquiryBoard(sortDate2(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleInquiry = (e) => {
    setCancle(false);
    console.log(e.target.id);
    setActiveId(e.target.id);
  };
  const handleDelete = (e) => {
    deleteInquiry(e.target.id).then((res) => {
      console.log(res);
      alert('성공적으로 삭제되었습니다.');
      setCancle(false);
    });
  };
  return (
    <Wrapper>
      <UpperBar_Component />
      <MiddleBar_Component2 text="문의사항 리스트" />
      <AssignBox>
        <InquiryBoard>
          {inquiryBoard?.map((e) => {
            return (
              <Inquiry id={e.id} onClick={handleInquiry}>
                {e.title}
                {e.isSecret ? <Secret src={secret}></Secret> : ''}
                {e.isAnswered ? <Answer>[답변 완료]</Answer> : ''}
                <Delete id={e.id} onClick={handleDelete}>
                  삭제
                </Delete>
              </Inquiry>
            );
          })}
        </InquiryBoard>
        {cancle ? <Assign_Blank /> : <InquiryAnswer id={activeId} />}
      </AssignBox>
    </Wrapper>
  );
}
export default AssignPage_Inquiry;
export const InquiryBoard = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
const Inquiry = styled.div`
  margin-top: 8px;
  width: 544px;
  height: 56px;
  flex-shrink: 0;
  background-color: rgb(240, 240, 240);
  border-radius: 4px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
`;
export const Wrapper = styled.div`
  width: 100vw;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Answer = styled.div`
  color: #4f33f6;
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: 32px;
  margin-left: 8px;
`;

const Secret = styled.img`
  margin-left: 4px;
`;
const Delete = styled.div`
  color: red;
  font-family: Pretendard;

  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 32px;
  margin-left: auto;
  margin-right: 8px;
`;
