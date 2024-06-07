import Header from './components/Header';
import Home from './components/Home';
import { Routes, Route } from 'react-router-dom';
import Teacaj from './components/Teacaj';
import Povijest from './components/Povijest';
import DetailPage from './components/DetailPage';
import TecajnaRazlika from './components/TecajnaRazlika';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="tecaj" element={<Teacaj />} />
        <Route path="povijest/:valuta" element={<Povijest />} />
        <Route path="details/:valuta/:odabrani_datum" element={<DetailPage />} />
        <Route path="povijest/:valuta/:datum" element={<TecajnaRazlika />} />
      </Routes>
    </>
  );
}

export default App;
