import { useState } from 'react';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import './PlayGamepage.scss';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'

export default function PlayGamepage(){

    const navigate = useNavigate();

    const teamsURL = process.env.REACT_APP_TEAMS_URL;
    const leaguesURL = process.env.REACT_APP_LEAGUES_URL;

    const [team1, setTeam1] = useState([]);
    const [team2, setTeam2] = useState([]);

    const [leagueList, setLeagueList] = useState([]);

    const [goals1, setGoals1] = useState("");
    const [goals2, setGoals2] = useState("");
    const [wins, setWins] = useState("");
    const [draws, setDraws] = useState("");
    const [losses, setLosses] = useState("");


    return(
        <>
            <Header />
            <Nav />
            <main>

            </main>
        </>
    )
}