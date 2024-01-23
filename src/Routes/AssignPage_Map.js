import { useParams } from 'react-router-dom';
import Assign from '../components/assign/Assign';
import {
  MiddleBar_Component3,
  UpperBar_Component,
  Wrapper,
} from './AssignPage_Home';
import { GlobalStyles } from './Info';
import { Flex } from 'asset/Style';
import styled from 'styled-components';

function AssignPage_Map() {
  const id_param = useParams().id;

  return (
    <Wrapper>
      <GlobalStyles />
      <UpperBar_Component />
      <MiddleBar_Component3 map={true} id_param={id_param} />
      <AssignBox>
        <div style={{ width: '544px', background: '#EEEEEE' }}>
          카테고리 설정
        </div>
        {/* 임시 카테고리 설정 레이아웃 */}
        <Assign />
      </AssignBox>
    </Wrapper>
  );
}

export default AssignPage_Map;

const AssignBox = styled(Flex)`
  margin-top: 32px;
`;
