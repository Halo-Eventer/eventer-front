import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { GlobalStyles } from './GlobalStyles';
import { ReactQueryDevtools } from 'react-query/devtools';

import Home from './Routes/Home';
import NolzaMap from './Routes/map/NolzaMap';

import PostList_Root from './Routes/info/PostListRoot';
import ConcertInfo from './Routes/info/ConcertInfo';

import AssignPageHome from './Routes/assign/AssignPageHome';
import AssignPageSelect from './Routes/assign/AssignPageSelect';
import AssignPageMap from './Routes/assign/selections/AssignPageMap';
import AssignPagePost from './Routes/assign/selections/AssignPagePost';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect } from 'react';
import MissingHome from 'Routes/find/MissingHome';
import LostHome from './Routes/find/LostHome';

import { ThemeProvider } from 'styled-components';
import { Theme } from './Theme';
import { RecoilRoot, useRecoilState } from 'recoil';
import NoticeList from 'Routes/info/NoticeList';
import EventList from 'Routes/info/EventList';
import LostDetail from './Routes/find/LostDetail';
import { QueryClient, QueryClientProvider } from 'react-query';
import { inAssignState } from 'recoils/atoms_assign';
import AssignPageMissing from 'Routes/assign/selections/AssignPageMissing';
import AssignPageLost from 'Routes/assign/selections/AssignPageLost';
import AssignPageUrgent from 'Routes/assign/selections/AssignPageUrgent';
import DetailPost from 'Routes/info/DetailPost';

import AssignPageLogin from 'Routes/assign/AssignPageLogin';
import AssignPageInquiry from 'Routes/assign/selections/AssignPageInquiry';
import MetaTag from 'seo/MetaTag';

function App() {
  const queryClient = new QueryClient();

  const [inAssign, setInAssign] = useRecoilState(inAssignState);
  //RecoilRoot안에서 쓰여야 함. 즉 index.js에서 쓰여야 함
  const location = window.location.pathname;

  useEffect(() => {
    if (location.includes('assign')) setInAssign(true);
    else setInAssign(false);
  }, [location]);

  function setScreenSize() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`); //"--vh"라는 속성으로 정의해준다.
    console.log(vh);
  }
  useEffect(() => {
    setScreenSize();
  }, []);
  return (
    <>
      <MetaTag />
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          {/* <ReactQueryDevtools initialIsOpen = {true}/> */}
          <GlobalStyles inAssign={inAssign} />
          <ThemeProvider theme={Theme}>
            <Routes>
              <Route path="" element={<Home />} />
              <Route path="/map" element={<NolzaMap />} />
              <Route path="/concertInfo" element={<ConcertInfo />} />
              <Route path="/post" element={<PostList_Root />}>
                <Route path="notice" element={<NoticeList />} />
                <Route path="event" element={<EventList />} />
              </Route>
              <Route path="/post/:id" element={<DetailPost />} />
              {/* Detail을 루트로 처리하는 법 */}
              <Route path="/missing" element={<MissingHome />}></Route>
              <Route path="/lost" element={<LostHome />}></Route>
              <Route path="/lost/:id" element={<LostDetail />}></Route>
              {/* 관리자페이지 */}
              <Route path="/login" element={<AssignPageLogin />} />
              <Route path="/assign" element={<AssignPageSelect />} />
              {/* <Route path="/assign/:id" element={<AssignPage_Select />} /> */}
              {/* 플랫폼화 됐을 때 */}
              <Route path="/assign_map/:id" element={<AssignPageMap />} />{' '}
              <Route path="/assign_post/:id" element={<AssignPagePost />} />
              <Route path="/assign_lost/:id" element={<AssignPageLost />} />
              <Route
                path="/assign_missing/:id"
                element={<AssignPageMissing />}
              />
              {/* <Route path="/assign_wheelChair/:id" element={<AssignPage_WheelChair />} />
            <Route path="/assign_barrierFree/:id" element={<AssignPage_BarrierFree />} /> */}
              {/* 얘네는 구글폼링크로 연결 */}
              <Route
                path="/assign_urgent/:id"
                element={<AssignPageUrgent />}
              />
              <Route path="/assign_inquiry" element={<AssignPageInquiry />} />
            </Routes>
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
