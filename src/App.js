import './App.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from './pages/Homepage/Homepage';
import PlayGamepage from './pages/PlayGamepage/PlayGamepage';
import Leaguepage  from './pages/Leaguepage/Leaguepage';
import Teampage from './pages/Teampage/Teampage';
import Playerpage from './pages/Playerpage/Playerpage';
import AddLeaguepage from './pages/AddLeaguepage/AddLeaguepage';
import AddTeampage from './pages/AddTeampage/AddTeampage';
import Accountpage from './pages/Accountpage/Accountpage';
import {io} from 'socket.io-client';
import Chatpage from './pages/Chatpage/Chatpage';
import Loginpage from './pages/Loginpage/Loginpage';
const socket = io('<http://localhost:3000>');

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/leagues/add' element={<AddLeaguepage/>} />
        <Route path="/leagues/:id" element={<Leaguepage />} />
        <Route path="/teams/add" element={<AddTeampage />} />
        <Route path="/teams/game" element={<PlayGamepage />} />
        <Route path='/teams/:id' element={<Teampage />} />
        <Route path='/players/:id' element={<Playerpage />} />
        <Route path='/account' element={<Accountpage />} />
        <Route path='/chat' element={<Chatpage />} />
        <Route path='/login' element={<Loginpage />} />
        <Route path='*' element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
