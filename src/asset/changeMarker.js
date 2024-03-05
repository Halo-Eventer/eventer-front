import { useState } from 'react';
import activeToilet from 'asset/marker/activeToilet.png';
import toilet from 'asset/marker/toilet.png';
import event from 'asset/marker/event.png';
import activeEvent from 'asset/marker/activeEvent.png';
import info from 'asset/marker/info.png';
import activeInfo from 'asset/marker/activeInfo.png';
import store from 'asset/marker/store.png';
import activeStore from 'asset/marker/activeStore.png';
import trash from 'asset/marker/trash.png';
import activeTrash from 'asset/marker/activeTrash.png';
export const changeMarker = (activeCategory, isPrev) => {
  //   const [text, setText] = useState();
  //   const [img, setImg] = useState();
  const { naver } = window;
  let img = event;
  let text = '관리자';

  if (activeCategory == 1) {
    isPrev ? (img = event) : (img = activeEvent);
    text = '관리자';
  } else if (activeCategory == 2) {
    isPrev ? (img = info) : (img = activeInfo);
    text = '안내소';
  } else if (activeCategory == 3) {
    isPrev ? (img = store) : (img = activeStore);
    text = '편의점';
  } else if (activeCategory == 4) {
    isPrev ? (img = toilet) : (img = activeToilet);
    text = '화장실';
  } else if (activeCategory == 5) {
    isPrev ? (img = trash) : (img = activeTrash);
    text = '쓰레기통';
  }

  return {
    content: `
  <div > 
  <div style="display:flex; justify-content: center;">
  <div style = "
   border-radius:28px;display:flex;justify-content:center;align-items: center;">
  <img style="width:36px;height:40px;" src = ${img}></img>
  </div>
  </div>
  <div style="display:flex; font-size: 12px;-webkit-text-stroke-width: 0.2px;-webkit-text-stroke-color: #FFF;
   font-weight: 800; justify-content: center;line-height: 16px;"> ${text} </div>
  </div>`,
    size: new naver.maps.Size(50, 50),
    origin: new naver.maps.Point(0, 0),
    anchor: new naver.maps.Point(25, 26),
  };
};
