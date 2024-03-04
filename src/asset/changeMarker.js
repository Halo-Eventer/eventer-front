import { useState } from 'react';
import activeToilet from 'asset/marker/activeToiletImg.svg';
import toilet from 'asset/marker/toiletImg.svg';
import event from 'asset/marker/eventImg.svg';

export const changeMarker = (activeCategory, isPrev) => {
  //   const [text, setText] = useState();
  //   const [img, setImg] = useState();
  const { naver } = window;
  let img = event;
  let text = '관리자';

  if (activeCategory == 1) {
  } else if (activeCategory == 2) {
  } else if (activeCategory == 3) {
  } else if (activeCategory == 4) {
    isPrev ? (img = toilet) : (img = activeToilet);
    text = '화장실';
    console.log(img, text);
  } else if (activeCategory == 5) {
  }

  return {
    content: `
  <div > 
  <div style="display:flex; justify-content: center;">
  <div style = "
   border-radius:28px;display:flex;justify-content:center;align-items: center;">
  <img style="width:32px;height:36px;" src = ${img}></img>
  </div>
  </div>
  <div style="display:flex; font-size: 12px; font-weight: 800; justify-content: center;line-height: 16px;"> ${text} </div>
  </div>`,
    anchor: new naver.maps.Point(25, 26),
    size: new naver.maps.Size(50, 50),
  };
};
