import "./Leaguepage.scss";
import  axios  from "axios";
import { useState, useEffect } from "react";
import {useParams, Link} from "react-router-dom";
import TeamList from "../../components/TeamList/TeamList";
import Header from "../../components/Header/Header";
import Nav from "../../components/Nav/Nav";

export default function Leaguepage() {
    const {id} = useParams();
    const leaguesURL = process.env.REACT_APP_LEAGUES_URL;

    const [teams, setTeams] = useState([]);

    const fetchTeams = async () => {
      try {
        const res = await axios.get(`${leaguesURL}/${id}/teams`);
        setTeams(res.data);
      } catch (e) {
        console.error(e);
      }
    };

    useEffect(() => {
        fetchTeams();
      }, []);
  
    return(
        <>
        <Header />
        <Nav />
            <main>
              <div className="league">
                <ul className="league__legend">
                    <li>Pos</li>
                    <li>Team</li>
                    <li>wins</li>
                    <li>draws</li>
                    <li>losses</li>
                    <li>GF</li>
                    <li>GA</li>
                    <li>Points</li>
                </ul>
                {teams.map((team) => {
                    return (
                        <TeamList
                        key={team.id}
                        id={team.id}
                        team_name={team.team_name}
                        goals={team.goals}
                        goals_against={team.goals_against}
                        wins={team.wins}
                        draws={team.draws}
                        losses={team.losses}
                        />
                    );
                 })}
                 <div className="league__button-container">
                  <Link to={"/teams/add"} className="league__button league__button--add">
                    ADD A NEW TEAM
                  </Link>
                  <Link to={"/teams/game"} className="league__button league__button--add">
                    PLAY A GAME
                  </Link>
                  </div>
                </div>
            </main>
        </>
    )
}
