import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { NavermapsProvider } from 'react-naver-maps';

import Home from './Routes/Home';
import FestivalInfo from './Routes/FestivalInfo';
import FestivalNoti from './Routes/FestivalNoti';
import Detail_Event from './Routes/Detail_Event';
import Detail_Noti from './Routes/Detail_Noti';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home></Home>}/>
        <Route path="/festivalInfo" element={<FestivalInfo/>}/>
        <Route path="/festivalNoti" element={<FestivalNoti/>}/>
        <Route path="/event/:id" element={<Detail_Event/>}/>
        <Route path="/noti/:id" element={<Detail_Noti/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
