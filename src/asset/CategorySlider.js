import React, { Component, useState } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import sojuImg from '../asset/category/sojuCateogory.svg';
import { getAllStore } from '../apis/apis';

export default class SwipeToSlide extends Component {
  constructor(props) {
    super(props);
    this.setActiveCategory = props.setActiveCategory;
    this.state = { active: 1 };
  }

  render() {
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
              이벤트
            </CategoryBox>
          </div>
          <div>
            <CategoryBox
              active={this.state.active}
              id="2"
              onClick={handleClick}
            >
              푸드트럭
            </CategoryBox>
          </div>
          <div>
            <CategoryBox
              active={this.state.active}
              id="3"
              onClick={handleClick}
            >
              <img id="3" src={sojuImg}></img>
              <div id="3">주점</div>
            </CategoryBox>
          </div>
          <div>
            <CategoryBox
              active={this.state.active}
              id="4"
              onClick={handleClick}
            >
              부스
            </CategoryBox>
          </div>
          <div>
            <CategoryBox
              active={this.state.active}
              id="5"
              onClick={handleClick}
            >
              편의시설
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
    width: 70px;
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
  width: 70px;

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
