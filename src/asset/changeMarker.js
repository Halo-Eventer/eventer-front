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
import smoke from 'asset/marker/smokeImg.png';
import activeSmoke from 'asset/marker/activeSmoke.png';
import park from 'asset/marker/parkImg.png';
import activePark from 'asset/marker/activePark.png';
export const changeMarker = (activeCategory, isPrev, text) => {
  //   const [text, setText] = useState();
  //   const [img, setImg] = useState();
  const { naver } = window;
  let img = event;

  if (activeCategory == 1) {
    isPrev ? (img = event) : (img = activeEvent);
  } else if (activeCategory == 2) {
    isPrev ? (img = info) : (img = activeInfo);
  } else if (activeCategory == 3) {
    isPrev ? (img = store) : (img = activeStore);
  } else if (activeCategory == 4) {
    isPrev ? (img = toilet) : (img = activeToilet);
  } else if (activeCategory == 5) {
    isPrev ? (img = park) : (img = activePark);
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
  <div style="display:flex; font-size: 12px;
          font-family: 'NanumSquareNeo';
          text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;
           font-weight: 800; justify-content: center;line-height: 16px;"> ${text} </div>
          </div>
  </div>`,
    size: new naver.maps.Size(50, 50),
    origin: new naver.maps.Point(0, 0),
    anchor: new naver.maps.Point(25, 26),
  };
};
