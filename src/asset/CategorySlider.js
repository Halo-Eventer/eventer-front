import React, { Component, useState } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import sojuImg from '../asset/category/storeCategory.png';
import eventImg from 'asset/category/manageCategory.png';
import boothImg from 'asset/category/toiletCategory.png';
import foodtruckImg from 'asset/category/infoCategory.png';
import parkImg from 'asset/category/parkingCategory.png';

export default class SwipeToSlide extends Component {
  constructor(props) {
    super(props);
    this.setActiveCategory = props.setActiveCategory;
    this.state = { active: 1 };
  }

  render() {
    const today = new Date();
    const hour = today.getHours();

    const settings = {
      className: '',
      infinite: false,
      centerPadding: '60px',
      draggable: true,
      slidesToShow: 3,
      swipeToSlide: true,
      variableWidth: true,

      afterChange: function (index) {
        // console.log(
        //   `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
        // );
      },
    };
    const handleClick = (e) => {
      this.setState({ active: e.target.id });
      this.setActiveCategory(e.target.id);
      // if (e.target.id == 3 && (hour > 22 || hour < 18)) {
      //   alert('주점은 현재 운영시간이 아닙니다.');
      // }
    };

    return (
      <div
        style={{
          position: 'relative',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '100',
        }}
      >
        <StyledSlider active={this.state.active} {...settings}>
          <div>
            <CategoryBox
              active={this.state.active}
              id="4"
              onClick={handleClick}
            >
              <CategoryImg id="4" src={boothImg}></CategoryImg>
              <CategoryText id="4">화장실</CategoryText>
            </CategoryBox>
          </div>

          <div>
            <CategoryBox
              active={this.state.active}
              id="2"
              onClick={handleClick}
            >
              <CategoryImg id="2" src={foodtruckImg}></CategoryImg>
              <CategoryText id="2">종합안내센터</CategoryText>
            </CategoryBox>
          </div>
          <div>
            <CategoryBox
              active={this.state.active}
              id="3"
              onClick={handleClick}
            >
              <CategoryImg id="3" src={sojuImg}></CategoryImg>
              <CategoryText id="3">편의점</CategoryText>
            </CategoryBox>
          </div>
          <div>
            <CategoryBox
              active={this.state.active}
              id="1"
              onClick={handleClick}
            >
              <CategoryImg id="1" src={eventImg}></CategoryImg>
              <CategoryText id="1">관리자</CategoryText>
            </CategoryBox>
          </div>
          <div>
            <CategoryBox
              active={this.state.active}
              id="5"
              onClick={handleClick}
            >
              <CategoryImg id="5" src={parkImg}></CategoryImg>
              <CategoryText id="5">주차장</CategoryText>
            </CategoryBox>
          </div>
        </StyledSlider>
      </div>
    );
  }
}

const StyledSlider = styled(Slider)`
  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;

    height: 36px;
    font-size: 13px;

    margin-left: 6px;
    margin-top: 45px;
    background-color: transparent;
  }
`;
const CategoryBox = styled.div`
  display: flex;
  height: 34px;
  align-items: center;
  justify-content: center;
  padding: 0 12px 0 12px;

  border-radius: 100px;
  background: #fff;

  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.16);
  background-color: ${(props) => {
    return props.id == props.active ? '#53CDDD' : 'white';
  }};
  color: ${(props) => {
    return props.id == props.active ? '#fff' : '#000';
  }};
  .slick-list > .slick-slide {
    width: 500px;
  }
`;

const CategoryText = styled.div`
  margin-left: 4px;
`;

const CategoryImg = styled.img`
  width: 24px;
  height: 24px;
`;
