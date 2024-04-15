import './AddLeaguepage.scss';
import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import AddLeague from '../../components/AddLeague/AddLeague';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';

export default function AddLeaguepage(){

    return(
    <>
        <Header />
        <Nav />
      <main>
        <AddLeague />
      </main>
    </>
    )
}