import { useRef, useEffect } from 'react';
import { Input, InputBox } from './Assign';
import { imageUploadApi } from 'apis/apis';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { infoState, itemIDState, modeState } from 'recoils/atoms_assign';

function AssignThumbnail() {
    //*****전역 recoil모음*****
    const [mode, setMode] = useRecoilState(modeState);
    const [itemID, setItemID] = useRecoilState(itemIDState);
    const [info, setInfo] = useRecoilState(infoState);
    //*****전역 recoil모음*****


  const thumbnailInput = useRef(null);
  const handleImg = (e) => {
    if (e.target.files[0] != undefined) {
      imageUploadApi(e.target.files[0])
        .then((res) => {
          setInfo({ ...info, thumbnail: res.data });
          console.log(res.data);
        })
        .catch((err) => {
          alert(err.response.data.error);
        });
    }
  };

  useEffect(() => {
    console.log('THUMBNAIL RERENDERING : ', mode);
    console.log('thumbnail changed!');
  }, [mode, itemID]);

  return (
    <InputBox>
      <InputThumbnail
        onClick={() => {
          thumbnailInput.current.click();
        }}
        src={info.thumbnail}
      />
      <Input
        style={{ display: 'none' }}
        accept="image/*"
        id="thumbnail"
        onChange={handleImg}
        type="file"
        ref={thumbnailInput}
      ></Input>
    </InputBox>
  );
}

const InputThumbnail = styled.img`
  width: 352px;
  height: 352px;
  border-radius: 4px;
  margin-top: 8px;
  border: 1px solid #eee;
  &:hover {
    cursor: pointer;
  }
`;

export default AssignThumbnail;
