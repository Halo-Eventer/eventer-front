<<<<<<< HEAD
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
=======
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Routes/Home';
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
      <Routes>
        <Route path="" element={<Home></Home>} />
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
>>>>>>> 52431a7e53fae3da7ccac52f116d03144933f05e
  );
}

export default App;
