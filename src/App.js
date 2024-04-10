import './App.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from './pages/Homepage/Homepage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Nav from './components/Nav/Nav';

function App() {
  return (
    <BrowserRouter>
    <Header />
    <Nav />
      <Routes>
        <Route path='/' element={<Homepage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
