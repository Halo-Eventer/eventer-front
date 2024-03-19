import styled from 'styled-components';

import { Flex } from '../../asset/Style';
import { useState, useEffect } from 'react';

import AssignBasicInfo from './AssignBasicInfo';
import AssignImage from './AssignImage';
import AssignBtn from './AssignBtn';
import AssignMenu from './AssignMenu';
import AssignBasicInfo_Post from './AssignBasicInfo_Post';
import { useRecoilState } from 'recoil';
import { categoryState_assign, infoState } from 'recoils/atoms_assign';

function Assign() {

  //*****전역 recoil모음*****
  const [category, setCategory] = useRecoilState(categoryState_assign);
  const [info, setInfo] = useRecoilState(infoState);
  //*****전역 recoil모음*****

  console.log("info:", info);
  console.log('category', category);

  return (
    <AssignContainer>
      <AssignBtn />
      <InfoContainer>
        {category != 'amenity' &&
          (category == 'store'
            ? <AssignMenu />
            : <AssignImage />
          )}

        {category == 'notice'
          ? <AssignBasicInfo_Post />
          : <AssignBasicInfo/>
        }
      </InfoContainer>
    </AssignContainer>
  );
}

export default Assign;

const AssignContainer = styled.div``;

const InfoContainer = styled.div`
  width: 352px;
  height: 536px;
  padding: 0;
  flex-shrink: 0;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const InputBox = styled(Flex)`
  justify-content: space-between;
  align-items: center;
`;
export const Input = styled.input`
  padding: 0;
  margin-left: 8px;
  margin-top: 8px;
  background: #fafafa;
  height: 24px;
  width: 300px;
  border-radius: 4px;
  border: 0;

  color: #111;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 160% */

  &::placeholder {
    display: flex;
    align-items: center;
  }
  &:focus {
    outline: none;
  }
`;
export const SemiTitle = styled.div`
  display: flex;
  height: 30px;
`;
export const Category = styled.select`
  width: 200px;
  height: 30px;
`;
export const InputLatLng = styled(Input)`
  padding: 0;
  margin: 0;
  margin-left: 4px;
  padding-left: 8px;
  width: 116px;
  height: 40px;
  flex-shrink: 0;
  background-color: ${(props) => {
    return props.disabled ? '#DDD' : '';
  }};

  color: #111;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 160% */
`;
