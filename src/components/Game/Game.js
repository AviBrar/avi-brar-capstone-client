import { useState, useEffect } from "react";
import "./Game.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Game() {
  const navigate = useNavigate();

  const teamsURL = process.env.REACT_APP_TEAMS_URL;
  const leaguesURL = process.env.REACT_APP_LEAGUES_URL;

  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);

  const [leagueList, setLeagueList] = useState([]);
  const [teamList, setTeamList] = useState([]);

  const [league, setLeague] = useState([]);
  const [leagueId, setLeagueId] = useState([]);

  const [goals1, setGoals1] = useState("");
  const [goals2, setGoals2] = useState("");
  const [wins, setWins] = useState("");
  const [draws, setDraws] = useState("");
  const [losses, setLosses] = useState("");

  const populateLeagues = () => {
    const parent = document.getElementById("gameLeague");
    if (!parent) {
      return <p>Loading...</p>;
    }

    if (parent.childElementCount < leagueList.length) {
      for (let i = 0; i < leagueList.length; i++) {
        let opt = document.createElement("option");
        opt.innerHTML = leagueList[i].league_name;
        opt.value = leagueList[i].id;
        parent.appendChild(opt);
      }
    }
  };
  useEffect(() => {
    const getLeagues = async () => {
      try {
        const res = await axios.get(`${leaguesURL}`);
        setLeagueList(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    getLeagues();
  }, []);
  populateLeagues();
  const populateTeams = () => {
    const parent = document.getElementById("gameTeams");
    if (!parent) {
      return <p>Loading...</p>;
    }

    if (parent.childElementCount < teamList.length) {
      for (let i = 0; i < teamList.length; i++) {
        let opt = document.createElement("option");
        opt.innerHTML = teamList[i].team_name;
        opt.value = teamList[i].id;
        parent.appendChild(opt);
      }
    }
  };
  useEffect(() => {
    if (league && leagueList.length > 0) {
      const matchedLeague = leagueList.find((l) => l.league_name === league);
      if (matchedLeague) {
        setLeagueId(matchedLeague.id); // Update state with the ID of the found league
      } else {
        setLeagueId(""); // Reset or handle the case where no league is found
      }
    } else {
      setLeagueId(""); // Reset when no league is selected or if leagueList is empty
    }
  }, [league, leagueList]);
  useEffect(() => {
    const getTeams = async () => {
      try {
        const res = await axios.get(`${leaguesURL}/${leagueId}/teams`);
        setTeamList(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    getTeams();
  }, [leagueId]);
  populateTeams();

  return (
    <>
      <form className="game">
        <div className="game__league">
          <div className="game__league-info">
            <label htmlFor="gameLeague">League</label>
            <select
              name="gameLeague"
              id="gameLeague"
              className="game__league-text dropdown"
              onChange={(e) => setLeague(e.target.value)}
            >
              <option value="invalid">Please select</option>
            </select>
          </div>
        </div>
        <div className="game__teams">
          <div className="game__teams-info">
            <label htmlFor="gameTeam1">Team 1</label>
            <select
              name="gameTeam1"
              id="gameTeams"
              className="game__teams-text dropdown"
              onChange={(e) => setTeam1(e.target.value)}
            >
              <option value="invalid">Please select</option>
            </select>
          </div>
          <div className="game__teams-info">
            <label htmlFor="gameTeam2">Team 2</label>
            <select
              name="gameTeam2"
              id="gameTeams"
              className="game__teams-text dropdown"
              onChange={(e) => setTeam2(e.target.value)}
            >
              <option value="invalid">Please select</option>
            </select>
          </div>
        </div>
      </form>
    </>
  );
}
