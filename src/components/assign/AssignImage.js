import { useEffect } from 'react';
import { imageUploadApi } from '../../apis/apis';
import { Input, InputBox, SemiTitle } from './Assign';

function AssignImage(props) {
  const handleImg = (e) => {
    imageUploadApi(e.target.files[0])
      .then((res) => {
        console.log(res.data);
        props.setImg(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // const fileReader = new FileReader();
    // fileReader.readAsDataURL(e.target.files[0]);
    // fileReader.onload = function (e) {
    //   console.log(e.target.result);
    // };
  };

  return (
    <InputBox>
      <SemiTitle>이미지 등록</SemiTitle>
      <Input
        accept="image/*"
        id="image"
        onChange={handleImg}
        type="file"
      ></Input>
    </InputBox>
  );
}

export default AssignImage;
