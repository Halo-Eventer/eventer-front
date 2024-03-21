import { useRef, useEffect } from 'react';
import { imageUploadApi } from 'apis/apis';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { categoryState_assign, infoState, itemIDState, modeState } from 'recoils/atoms_assign';
import { Input, InputBox } from 'Routes/assign/AssignPage_Home';


function AssignThumbnail() {
    //*****전역 recoil모음*****
    const [category, setCategory] = useRecoilState(categoryState_assign);
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
        category={category}
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
${props=>props.category=='missing' 
? 'width: 128px; height: 128px;'
: 'width: 352px; height: 352px; margin-top: 8px;'}
  border-radius: 4px;
  border: 1px solid #eee;
  &:hover {
    cursor: pointer;
  }
`;

export default AssignThumbnail;
