import {useState,useEffect} from 'react';

import styled from 'styled-components';

import {InputBox,Input,SemiTitle,
  Category,PlusImage,ImageBox,Image} from '../../Routes/AssignPage_Notice';
  
import { assignInfoApi } from '../../apis/apis';

function AssignBtn_Info(props) {
  const requestBody = {
    ...props.info,
    images:props.images,
    thumbnail:props.thumbnail,
    festivalId:1
  }
  const assignInfo = () => {

    assignInfoApi(requestBody, requestBody.festivalId, props.category)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
      
  };
  return <Button onClick={assignInfo}>등록하기</Button>;
}

export default AssignBtn_Info;

const Button = styled.button`
  margin-top: 20px;
  width: 400px;
  height: 40px;
`;
