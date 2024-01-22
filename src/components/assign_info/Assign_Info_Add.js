import styled from 'styled-components';
import { Flex } from '../../asset/Style';
import { useEffect, useRef, useState } from 'react';
import { assignApi } from '../../apis/apis';

import {InputBox,Input,SemiTitle,
  Category,PlusImage,ImageBox,Image} from '../../Routes/AssignPage_Notice';

import AssignBtn_Info from './AssignBtn_Info';
import AssignImage_Info from './AssignImage_Info';
import AssignBasicInfo_Info from './AssignBasicInfo_Info';
import { FlexBox_Row, FlexBox_Column } from '../../Routes/Info';


function Assign_Info() {

  const [thumbnail,setThumbNail] = useState("");
  const [images, setImages] = useState([]);
  const [cntImageInput, setCntImageInput] = useState([0]);

  const [info, setInfo] = useState(
    {
      title: '',
      subtitle: '',
      simpleExplanantion: '',
      content:'',
    });
  const [category, setCategory] = useState('');

  const onClick_cntInput = (event) => {
    event.preventDefault();
    let newArr = [...cntImageInput];
    if (event.target.value === 'p') {
      const last = ++cntImageInput[cntImageInput.length - 1];
      //전위 연산자로 해야할 것
      console.log("newArr, last :", newArr, last);
      newArr.push(last);
    }
    else if (event.target.value === 'm' && cntImageInput.length > 1) {
      newArr.pop();
      if (cntImageInput.length === images.length) {
        let newArr2 = [...images];
        newArr2.pop();
        setImages(newArr2);
      }
    }
    setCntImageInput(newArr);
  }


  useEffect(() => {
    console.log("images:", images);
  }, [images]);
  return (
    <FlexBox_Column>
      <ImageBox>        
          <p>썸네일 등록</p>
              <FlexBox_Column style={{ marginBottom: '8px' }}>
                <AssignImage_Info
                  array={false}
                  setImage={setThumbNail}
                />
                {thumbnail > 0 &&
                <Image src={thumbnail}></Image>
                }
              </FlexBox_Column>
      </ImageBox>


      <ImageBox>

        <p>이미지 등록</p>
        {
          cntImageInput.map((index, key) =>
            <FlexBox_Column style={{ marginBottom: '8px' }}>
              <AssignImage_Info
                array={true}

                key={key}
                index={index}
                images={images}
                setImages={setImages}
                disabled={images.length < index}
              />
              {images.length > index &&
                <Image src={images[index]}></Image>
              }
            </FlexBox_Column>
          )

        }

        <FlexBox_Row>
          <PlusImage onClick={onClick_cntInput} value='p'> + </PlusImage>
          <PlusImage onClick={onClick_cntInput} value='m'> - </PlusImage>
        </FlexBox_Row>

      </ImageBox>


      <AssignBasicInfo_Info
        setInfo={setInfo}
        info={info}
        category={category}
        setCategory={setCategory}
      />



      <AssignBtn_Info 
      info={info} 
      category={category} 
      thumbnail={thumbnail}
      images={images}
      />
    </FlexBox_Column>
  );
}

// {
//     "name" :"주점1",
//     "summary": "전과 막걸리를 팔고 있어요",
//     "isOperation": true,
//     "operationHours" : "16:00~22:00",
//     "latitude":37.550991791122394,
//     "longitude":127.07476720170447,
//     "type": "주점"
// }
export default Assign_Info;



