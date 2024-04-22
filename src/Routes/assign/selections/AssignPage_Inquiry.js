import styled from 'styled-components';

import {
  UpperBar_Component,
  MiddleBar_Component2,
} from 'components/assign/Assign_Bar';

import { AssignBox, Assign_Blank } from 'Routes/assign/AssignPage_Home';

import { cancleState } from 'recoils/atoms_assign';
import { useRecoilState } from 'recoil';

import InquiryAnswer from 'components/assign/Inquiry/InquiryAnswer';

function AssignPage_Inquiry() {
  const [cancle, setCancle] = useRecoilState(cancleState);

  return (
    <Wrapper>
      <UpperBar_Component />
      <MiddleBar_Component2 text="문의사항 리스트" />
      <AssignBox>
        <InquiryBoard>
          <Inquiry onClick={() => setCancle(!cancle)}>문의사항 제목</Inquiry>
          <Inquiry onClick={() => setCancle(!cancle)}>문의사항 제목</Inquiry>
          <Inquiry onClick={() => setCancle(!cancle)}>문의사항 제목</Inquiry>
          <Inquiry onClick={() => setCancle(!cancle)}>문의사항 제목</Inquiry>
          <Inquiry onClick={() => setCancle(!cancle)}>문의사항 제목</Inquiry>
        </InquiryBoard>
        {cancle ? <Assign_Blank /> : <InquiryAnswer />}
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
  justify-content: space-between;
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
