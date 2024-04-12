import './App.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from './pages/Homepage/Homepage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Nav from './components/Nav/Nav';
import Leaguepage  from './pages/Leaguepage/Leaguepage';
import Teampage from './pages/Teampage/Teampage';

function App() {
  return (
    <BrowserRouter>
    <Header />
    <Nav />
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path="/leagues/:id" element={<Leaguepage />} />
        <Route path='/teams/:id' element={<Teampage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
