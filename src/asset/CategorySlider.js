import React, { Component, useState } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import sojuImg from '../asset/category/sojuCateogory.svg';
import eventImg from 'asset/category/eventCategory.svg';
import boothImg from 'asset/category/boothCategory.svg';
import foodtruckImg from 'asset/category/foodtruckCategory.svg';
import amenityImg from 'asset/category/amenityCategory.svg';
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
      if (e.target.id == 3 && (hour > 22 || hour < 18)) {
        alert('주점은 현재 운영시간이 아닙니다.');
      }
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
              id="1"
              onClick={handleClick}
            >
              <img id="1" src={eventImg}></img>
              <CategoryText id="1">이벤트</CategoryText>
            </CategoryBox>
          </div>
          <div>
            <CategoryBox
              active={this.state.active}
              id="2"
              onClick={handleClick}
            >
              <img id="2" src={foodtruckImg}></img>
              <CategoryText id="2">푸드트럭</CategoryText>
            </CategoryBox>
          </div>
          <div>
            <CategoryBox
              active={this.state.active}
              id="3"
              onClick={handleClick}
            >
              <img id="3" src={sojuImg}></img>
              <CategoryText id="3">주점</CategoryText>
            </CategoryBox>
          </div>
          <div>
            <CategoryBox
              active={this.state.active}
              id="4"
              onClick={handleClick}
            >
              <img id="4" src={boothImg}></img>
              <CategoryText id="4">부스</CategoryText>
            </CategoryBox>
          </div>
          <div>
            <CategoryBox
              active={this.state.active}
              id="5"
              onClick={handleClick}
            >
              <img id="5" src={amenityImg}></img>
              <CategoryText id="5">편의시설</CategoryText>
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

    margin-left: 6px;
    margin-top: 6px;
    background-color: transparent;
  }
`;
const CategoryBox = styled.div`
  display: flex;
  height: 36px;
  align-items: center;
  justify-content: center;
  padding: 0 12px 0 12px;

  border-radius: 40px;
  background-color: ${(props) => {
    return props.id == props.active ? 'red' : 'white';
  }};
  color: ${(props) => {
    return props.id == props.active ? 'white' : 'black';
  }};
  .slick-list > .slick-slide {
    width: 500px;
  }
`;

const CategoryText = styled.div`
  margin-left: 4px;
`;
