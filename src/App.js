import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalStyles } from './GlobalStyles';

import Home from './Routes/Home';
import NolzaMap from './Routes/map/NolzaMap';
import TourMap from './Routes/map/TourMap';

import PostList_Root from './Routes/info/PostList_Root';
import FestivalInfo from './Routes/info/FestivalInfo';
import FestivalNotice from './Routes/info/FestivalNotice_X';
import Detail_Event from './Routes/info/Detail_Event';
import Detail_Notice from './Routes/info/Detail_Notice';

import AssignPage_Home from './Routes/assign/AssignPage_Home';
import AssignPage_Select from './Routes/assign/AssignPage_Select';
import AssignPage_Map from './Routes/assign/AssignPage_Map';
import AssignPage_Rending from './Routes/assign/AssignPage_Rending';
import AssignPage_Notice from './Routes/assign/AssignPage_Notice';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect } from 'react';

import { ThemeProvider } from 'styled-components';
import { Theme } from './Theme';
import { RecoilRoot } from 'recoil';
import NoticeList from 'Routes/info/NoticeList';
import EventList from 'Routes/info/EventList';

function App() {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`); //"--vh"라는 속성으로 정의해준다.
  }

  useEffect(() => {
    setScreenSize();
  });

  return (
    <BrowserRouter>
      <RecoilRoot>
        <GlobalStyles />
        <ThemeProvider theme={Theme}>
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="/map" element={<NolzaMap />} />
            <Route path="/tourmap" element={<TourMap />} />
            <Route path="/festivalInfo" element={<FestivalInfo />} />
            <Route path="/post" element={<PostList_Root />}>
              <Route path="notice" element={<NoticeList/>}/>
              <Route path="event" element={<EventList/>}/>
            </Route>
            <Route path="/post/event/:id" element={<Detail_Event />} />
            <Route path="/post/notice/:id" element={<Detail_Notice />} />
            {/* Detail을 루트로 처리하는 법 */}


            <Route path="/assign" element={<AssignPage_Select />} />
            <Route path="/assign_map/:id" element={<AssignPage_Map />} />{' '}
            {/* 이게 assign_map 및 AssignPage_Map 파트 */}
            <Route path="/assign_rending/:id" element={<AssignPage_Rending />} />
            <Route path="/assign_notice/:id" element={<AssignPage_Notice />} />
            {/* assign_home => assign_select => (assign_rending/notice/map/performance) */}
          </Routes>
        </ThemeProvider>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
