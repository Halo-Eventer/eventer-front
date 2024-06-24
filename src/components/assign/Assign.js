import styled from 'styled-components';

import AssignBasicInfoMap from './basicInfo/AssignBasicInfoMap';
import AssignBtn from './AssignBtn';
import AssignBasicInfoPost from './basicInfo/AssignBasicInfoPost';
import { useRecoilState } from 'recoil';
import { categoryState_assign, infoState } from 'recoils/atoms_assign';
import AssignBasicInfoLost from './basicInfo/AssignBasicInfoLost';
import AssignBasicInfoMissing from './basicInfo/AssignBasicInfoMissing';
import AssignBasicInfoUrgent from './basicInfo/AssignBasicInfoUrgent';

function Assign() {
  //*****전역 recoil모음*****
  const [category, setCategory] = useRecoilState(categoryState_assign);
  const [info, setInfo] = useRecoilState(infoState);
  //*****전역 recoil모음*****

  // console.log("info:", info);
  // console.log('category', category);

  const assignBasicInfoObject = {
    notice: <AssignBasicInfoPost />,
    event: <AssignBasicInfoPost />,
    lostItem: <AssignBasicInfoLost />,
    missingPerson: <AssignBasicInfoMissing />,
    urgent: <AssignBasicInfoUrgent />,
  };

  return (
    <AssignContainer>
      <AssignBtn />
      <InfoContainer>
        {assignBasicInfoObject[category] || <AssignBasicInfoMap />}
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
