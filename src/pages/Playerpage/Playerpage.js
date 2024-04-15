import './Playerpage.scss';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import PlayerDetails from '../../components/PlayerDetails/PlayerDetails';

export default function Playerpage(){
    const {id} = useParams();
    const [player, setPlayer] = useState([]);
    const playersURL = process.env.REACT_APP_PLAYERS_URL;

    const fetchPlayer = async () => {
        const res = await axios.get(`${playersURL}/${id}`)
        setPlayer(res.data)
    }
    useEffect(() => {
        fetchPlayer();
    }, [])
    return(
        <>
        <Header />
        <Nav />
        <main>
            <PlayerDetails player={player} />
        </main>
        </>
    )
}