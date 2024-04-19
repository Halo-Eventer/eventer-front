import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { GlobalStyles } from './GlobalStyles';
import { ReactQueryDevtools } from 'react-query/devtools';

import Home from './Routes/Home';
import NolzaMap from './Routes/map/NolzaMap';

import PostList_Root from './Routes/info/PostList_Root';
import ConcertInfo from './Routes/info/ConcertInfo';

import AssignPage_Home from './Routes/assign/AssignPage_Home';
import AssignPage_Select from './Routes/assign/AssignPage_Select';
import AssignPage_Map from './Routes/assign/selections/AssignPage_Map';
import AssignPage_Post from './Routes/assign/selections/AssignPage_Post';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect } from 'react';
import Missing_Home from 'Routes/find/Missing_Home';
import Lost_Home from './Routes/find/Lost_Home';

import { ThemeProvider } from 'styled-components';
import { Theme } from './Theme';
import { RecoilRoot, useRecoilState } from 'recoil';
import NoticeList from 'Routes/info/NoticeList';
import EventList from 'Routes/info/EventList';
import Lost_Detail from './Routes/find/Lost_Detail';
import { Query, QueryClient, QueryClientProvider } from 'react-query';
import { inAssignState } from 'recoils/atoms_assign';
import AssignPage_Missing from 'Routes/assign/selections/AssignPage_Missing';
import AssignPage_Lost from 'Routes/assign/selections/AssignPage_Lost';
import AssignPage_Urgent from 'Routes/assign/selections/AssignPage_Urgent';
import Detail_Post from 'Routes/info/Detail_Post';

function App() {
  const queryClient = new QueryClient();

  const [inAssign, setInAssign] = useRecoilState(inAssignState);
  //RecoilRoot안에서 쓰여야 함. 즉 index.js에서 쓰여야 함
  const location = window.location.pathname;

  useEffect(() => {
    if (location.includes('assign')) setInAssign(true);
    else setInAssign(false);
  }, [location]);

  // console.log('location, inAssign', location, inAssign);
  return (
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
            <Route path="/post/:id" element={<Detail_Post />} />
            {/* Detail을 루트로 처리하는 법 */}
            <Route path="/missing" element={<Missing_Home />}></Route>
            <Route path="/lost" element={<Lost_Home />}></Route>
            <Route path="/lost/:id" element={<Lost_Detail />}></Route>
            {/* 관리자페이지 */}
            <Route path="/assign" element={<AssignPage_Select />} />
            {/* <Route path="/assign/:id" element={<AssignPage_Select />} /> */}
            {/* 플랫폼화 됐을 때 */}
            <Route path="/assign_map/:id" element={<AssignPage_Map />} />{' '}
            <Route path="/assign_post/:id" element={<AssignPage_Post />} />
            <Route path="/assign_lost/:id" element={<AssignPage_Lost />} />
            <Route
              path="/assign_missing/:id"
              element={<AssignPage_Missing />}
            />
            {/* <Route path="/assign_wheelChair/:id" element={<AssignPage_WheelChair />} />
            <Route path="/assign_barrierFree/:id" element={<AssignPage_BarrierFree />} /> */}
            {/* 얘네는 구글폼링크로 연결 */}
            <Route path="/assign_urgent/:id" element={<AssignPage_Urgent />} />
          </Routes>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
