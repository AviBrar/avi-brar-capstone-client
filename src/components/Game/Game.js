import { useState } from "react";
import Header from "../../components/Header/Header";
import Nav from "../../components/Nav/Nav";
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

  const [league, setLeague] = useState("");

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

  return (
    <>
      <form className="game" onSubmit={handleSubmit}>
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
          <div className="game__teams-1">
            <label htmlFor="team1">Home Team</label>
            <input type="" />
          </div>
        </div>
      </form>
    </>
  );
}
