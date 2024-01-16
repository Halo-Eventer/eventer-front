import { useEffect } from 'react';
import { imageUploadApi } from '../../apis/apis';
import { Input, InputBox, SemiTitle } from './Assign';

function AssignImage(props) {
  const handleImg = (e) => {
    imageUploadApi(e.target.files[0])
      .then((res) => {
        if (e.target.id == 'thumbnail') props.setThumbnail(res.data);
        else props.setImg(res.data);
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
    <div>
      <InputBox>
        <SemiTitle>대표 이미지 등록</SemiTitle>
        <Input
          accept="image/*"
          id="thumbnail"
          onChange={handleImg}
          type="file"
        ></Input>
      </InputBox>
      <InputBox>
        <SemiTitle>세부 이미지 등록</SemiTitle>
        <Input
          accept="image/*"
          id="images"
          onChange={handleImg}
          type="file"
        ></Input>
      </InputBox>
    </div>
  );
}

export default AssignImage;
