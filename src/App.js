import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { NavermapsProvider } from 'react-naver-maps';

import Home from './Routes/Home';
import FestivalInfo from './Routes/FestivalInfo';
import FestivalNoti from './Routes/FestivalNoti';
import Detail_Event from './Routes/Detail_Event';
import Detail_Noti from './Routes/Detail_Noti';

import AssignPage_Home from './Routes/AssignPage_Home';
import AssignPage_Select from './Routes/AssignPage_Select';
import AssignPage from './Routes/AssignPage';
import AssignPage_Rending from './Routes/AssignPage_Rending';
import AssignPage_Notice from './Routes/AssignPage_Notice';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home></Home>} />
        <Route path="/festivalInfo" element={<FestivalInfo />} />
        <Route path="/festivalNoti" element={<FestivalNoti />} />

        <Route path="/event/:id" element={<Detail_Event />} />
        <Route path="/noti/:id" element={<Detail_Noti />} />
        {/* Detail을 루트로 처리하는 법 */}

        <Route path = "/assign_home" element={<AssignPage_Home/>}/>
        <Route path = "/assign_select/:id" element={<AssignPage_Select/>}/>
        <Route path = "/assign" element={<AssignPage />}/>   {/* 이게 assign_map 및 AssignPage_Map 파트 */}
        <Route path = "/assign_rending/:id" element={<AssignPage_Rending/>}/>
        <Route path = "/assign_notice/:id" element={<AssignPage_Notice/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
