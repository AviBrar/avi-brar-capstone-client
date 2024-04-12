import "./Leaguepage.scss";
import  axios  from "axios";
import { useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import TeamList from "../../components/TeamList/TeamList";

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
            <section className="league">
                <div className="league__legend">
                    <p>Pos</p>
                    <h3>Team</h3>
                    <p>wins</p>
                    <p>draws</p>
                    <p>losses</p>
                    <p>GF</p>
                    <p>GA</p>
                    <p>Points</p>
                </div>
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
            </section>
        </>
    )
}
