import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalStyles } from 'asset/GlobalStyles';

import Home from './Routes/Home';
import NolzaMap from 'Routes/NolzaMap';
import FestivalInfo from './Routes/FestivalInfo';
import FestivalNotice from './Routes/FestivalNotice';
import Detail_Event from './Routes/Detail_Event';
import Detail_Notice from './Routes/Detail_Notice';

import AssignPage_Home from './Routes/AssignPage_Home';
import AssignPage_Select from './Routes/AssignPage_Select';
import AssignPage_Map from './Routes/AssignPage_Map';
import AssignPage_Rending from './Routes/AssignPage_Rending';
import AssignPage_Notice from './Routes/AssignPage_Notice';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route path="" element={<Home/>} />
        <Route path="/map" element={<NolzaMap/>}/>
        <Route path="/festivalInfo" element={<FestivalInfo />} />
        <Route path="/festivalNotice" element={<FestivalNotice />} />
        <Route path="/event/:id" element={<Detail_Event />} />
        <Route path="/notice/:id" element={<Detail_Notice />} />
        {/* Detail을 루트로 처리하는 법 */}

        <Route path="/assign_home" element={<AssignPage_Home />} />
        <Route path="/assign_select/:id" element={<AssignPage_Select />} />

        <Route path = "/assign_map/:id" element={<AssignPage_Map />}/>   {/* 이게 assign_map 및 AssignPage_Map 파트 */}
        <Route path = "/assign_rending/:id" element={<AssignPage_Rending/>}/>
        <Route path = "/assign_notice/:id" element={<AssignPage_Notice/>}/>
        {/* assign_home => assign_select => (assign_rending/notice/map/performance) */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
