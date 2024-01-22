import { Flex } from 'asset/Style';
import delete_menuBox from 'asset/assign/delete_menuBox.svg';
import images_preview from 'asset/assign/input_images.png';
import { useRef } from 'react';
import styled from 'styled-components';

function AssignMenuBox() {
  const imagesInput = useRef(null);
  return (
    <MenuContainer>
      <Flex style={{ marginTop: '8px' }}>
        <InputImages
          onClick={() => {
            imagesInput.current.click();
          }}
          src={images_preview}
        ></InputImages>
        <div style={{ marginLeft: '4px', width: '212px' }}>
          <MenuNamePrice placeholder="부스 이름 작성" />
          <MenuNamePrice style={{ marginTop: '4px' }} placeholder="세부 위치" />
        </div>
        <DeleteMenuBox src={delete_menuBox} />
      </Flex>
    </MenuContainer>
  );
}
const MenuContainer = styled(Flex)`
  margin-top: 8px;
  border-radius: 4px;
  border: 1px solid #eee;
  width: 352px;
  height: 100px;
  border-radius: 4px;
  border: 1px solid #eee;
  flex-shrink: 0;
`;

const InputImages = styled.img`
  width: 84px;
  height: 84px;
  margin-left: 8px;
  &:hover {
    cursor: pointer;
  }
`;

const MenuNamePrice = styled.input`
  padding: 0;
  width: 212px;
  height: 40px;
  background: #fafafa;
  border: 0;
  &::placeholder {
    padding-left: 8px;
  }
`;
const DeleteMenuBox = styled.img`
  margin-left: 4px;
  width: 32px;
  height: 84px;
  flex-shrink: 0;
`;

export default AssignMenuBox;
