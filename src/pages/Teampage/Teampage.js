import "./Teampage.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TeamDetails from "../../components/TeamDetails/TeamDetails";
import PlayerList from "../../components/PlayerList/PlayerList";
import Header from "../../components/Header/Header";
import Nav from "../../components/Nav/Nav";

export default function Teampage() {
  const { id } = useParams();
  const teamsURL = process.env.REACT_APP_TEAMS_URL;

  const [team, setTeam] = useState([]);
  const [players, setPlayers] = useState([]);

  const fetchTeam = async () => {
    try {
      const res = await axios.get(`${teamsURL}/${id}`);
      setTeam(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchPlayers = async () => {
    try {
      const res = await axios.get(`${teamsURL}/${id}/players`);
      setPlayers(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchTeam();
    fetchPlayers();
  }, []);

  return (
    <>
        <Header />
        <Nav />
    <main className="team-page">
      <TeamDetails
        id={team.id}
        league_id={team.league_id}
        team_name={team.team_name}
        city={team.city}
        country={team.country}
        manager_name={team.manager_name}
        team_description={team.team_description}
        contact_phone={team.contact_phone}
        contact_email={team.contact_email}
        founding_year={team.founding_year}
        goals={team.goals}
        goals_against={team.goals_against}
        wins={team.wins}
        draws={team.draws}
        losses={team.losses}
      />
      <PlayerList players={players} />
    </main>
    </>
  );
}
