import styled from 'styled-components';

import AssignBasicInfo_Map from './basicInfo/AssignBasicInfo_Map';
import AssignBtn from './AssignBtn';
import AssignBasicInfo_Post from './basicInfo/AssignBasicInfo_Post';
import { useRecoilState } from 'recoil';
import { categoryState_assign, infoState } from 'recoils/atoms_assign';
import AssignBasicInfo_Lost from './basicInfo/AssignBasicInfo_Lost';
import AssignBasicInfo_Missing from './basicInfo/AssignBasicInfo_Missing';
import AssignBasicInfo_Urgent from './basicInfo/AssignBasicInfo_Urgent';

function Assign() {
  //*****전역 recoil모음*****
  const [category, setCategory] = useRecoilState(categoryState_assign);
  const [info, setInfo] = useRecoilState(infoState);
  //*****전역 recoil모음*****

  // console.log("info:", info);
  // console.log('category', category);

  const AssignBasicInfo_Object = {
    notice: <AssignBasicInfo_Post />,
    event: <AssignBasicInfo_Post />,
    lostItem: <AssignBasicInfo_Lost />,
    missingPerson: <AssignBasicInfo_Missing />,
    urgent: <AssignBasicInfo_Urgent />,
  };

  return (
    <AssignContainer>
      <AssignBtn />
      <InfoContainer>
        {AssignBasicInfo_Object[category] || <AssignBasicInfo_Map />}
        {/* 특별한 카테고리가 아니면 기본값으로 지도폼 렌더링 */}
      </InfoContainer>
    </AssignContainer>
  );
}

export default Assign;

const AssignContainer = styled.div``;

export const InfoContainer = styled.div`
  width: 352px;
  height: 536px;
  padding: 0;
  flex-shrink: 0;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
