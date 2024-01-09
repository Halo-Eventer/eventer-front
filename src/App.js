import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NolzaMap from './Routes/NolzaMap';
import { NavermapsProvider } from 'react-naver-maps';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<NolzaMap />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
