import { useState,useEffect } from 'react';
import { imageUploadApi } from '../../apis/apis';
import {InputBox,Input,SemiTitle,
  Category,PlusImage,ImageBox,Image} from '../../Routes/AssignPage_Notice';


function AssignImage_Info(props) {

  const handleImg = (event) => {
    event.preventDefault();

    imageUploadApi(event.target.files[0])
      .then((response) => 
      {
        console.log(response.data);

        if(props.array){
          let newArr=[...props.images]; //setState 특정 배열원소 수정
          newArr[props.index]=response.data;
          props.setImages(newArr);
        }else{
          props.setImage(response.data);
        }
      })
      .catch((error) => 
      {
        console.log(error);
      });
  };

  return (
    <InputBox>

      <Input
      accept="image/*"
      id="image"
      onChange={handleImg}
      type="file"
      disabled={props.disabled}/>

      {props.array &&
      <SemiTitle>({props.index+1}번째 슬라이드)</SemiTitle>
      }     
      
    </InputBox>
  );
}

export default AssignImage_Info;
