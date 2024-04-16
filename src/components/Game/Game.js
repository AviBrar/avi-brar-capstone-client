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
  const [homeTeam, setHomeTeam] = useState([]);
  const [awayTeam, setAwayTeam] = useState([]);

  const [leagueList, setLeagueList] = useState([]);
  const [teamList, setTeamList] = useState([]);

  const [league, setLeague] = useState([]);
  const [leagueId, setLeagueId] = useState([]);

  const [goals1, setGoals1] = useState("");
  const [goals2, setGoals2] = useState("");

  useEffect(() => {
    const getHomeTeam = async () => {
      if(team1 === "invalid"){return}
        try {
          const res = await axios.get(`${teamsURL}/${team1}`)
          setHomeTeam(res.data)
        } catch (e) {
          console.error(e);
        }
    }
    getHomeTeam();
  }, [team1])
  useEffect(() => {
    const getAwayTeam = async () => {
      if(team2 === "invalid"){return}
        try {
          const res = await axios.get(`${teamsURL}/${team2}`)
          setAwayTeam(res.data)
        } catch (e) {
          console.error(e);
        }
    }
    getAwayTeam();
  }, [team2])

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

  useEffect(() => {
    const getTeams = async () => {
      if (!league || league === "invalid") {
        setTeamList([]);
        return; // Prevents the API call if no valid league is selected
      }
  
      try {
        const res = await axios.get(`${leaguesURL}/${league}/teams`);
        setTeamList(res.data);
        // Resetting the team selection when the team list changes
        setTeam1("invalid");
        setTeam2("invalid");
      } catch (e) {
        console.error(e);
      }
    };
    getTeams();
  }, [league]); // Ensure this runs only when 'league' changes
  
  // Populate team options when teamList updates
  useEffect(() => {
    const populateTeams = (parentElementId) => {
      const parent = document.getElementById(parentElementId);
      if (!parent) return;
  
      parent.innerHTML = `<option value="invalid">Please select</option>`; // Clear existing options
      for (let i = 0; i < teamList.length; i++) {
        let opt = document.createElement("option");
        opt.innerHTML = teamList[i].team_name;
        opt.value = teamList[i].id;
        parent.appendChild(opt);
      };
    };
    populateTeams("gameTeams1");
    populateTeams("gameTeams2");
  }, [teamList]); // Populate teams when 'teamList' changes
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const wins = "1";
    const draws = "0";
    const losses = "1";
    const updateHomeTeam = async () => {
      try{
        await axios.put(`${teamsURL}/${team1}`, {
          league_id: league,
          team_name: homeTeam.team_name,
          city: homeTeam.city,
          country: homeTeam.country,
          manager_name: homeTeam.manager_name,
          team_description: homeTeam.team_description,
          contact_phone: homeTeam.contact_phone,
          contact_email: homeTeam.contact_email,
          founding_year: homeTeam.founding_year,
          goals: goals1,
          goals_against: goals2,
          wins: wins,
          draws: draws,
          losses: draws
        });
      } catch (error) {
        console.error(error);
      }
    };
    const updateAwayTeam = async () => {
      try{
        await axios.put(`${teamsURL}/${team2}`, {
          league_id: league,
          team_name: awayTeam.team_name,
          city: awayTeam.city,
          country: awayTeam.country,
          manager_name: awayTeam.manager_name,
          team_description: awayTeam.team_description,
          contact_phone: awayTeam.contact_phone,
          contact_email: awayTeam.contact_email,
          founding_year: awayTeam.founding_year,
          goals: goals2,
          goals_against: goals1,
          wins: draws,
          draws: draws,
          losses: losses
        });
      } catch (error) {
        console.error(error);
      }
    };
    updateHomeTeam();
    updateAwayTeam();
    navigate("/");
  }

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
          <div className="game__teams-info">
            <label htmlFor="gameTeam1">Home Team: </label>
            <select
              name="gameTeam1"
              id="gameTeams1"
              className="game__teams-text dropdown"
              onChange={(e) => setTeam1(e.target.value)}
            >
              <option value="invalid">Please select</option>
            </select>
          </div>
          <div className="game__teams-info">
            <label htmlFor="gameTeam2">Away Team: </label>
            <select
              name="gameTeam2"
              id="gameTeams2"
              className="game__teams-text dropdown"
              onChange={(e) => setTeam2(e.target.value)}
            >
              <option value="invalid">Please select</option>
            </select>
          </div>
        </div>
        <div className="game__score-container">
          <h2>Enter Scores</h2>
          <div className="game__score">
            <div className="game__score-home">
              <label htmlFor="homeScore">Home: </label>
              <input 
                name="homeScore"
                id="homeScore"
                type="text"
                className="game__score-input"
                onChange={(e) => setGoals1(e.target.value)} />
            </div>
            <div className="game__score-away">
              <label htmlFor="awayScore">Away: </label>
              <input 
                name="awayScore"
                id="awayScore"
                type="text"
                className="game__score-input"
                onChange={(e) => setGoals2(e.target.value)} />
            </div>
          </div>
          <div>
            <button 
              type="submit"
              >Submit Score</button>
          </div>
        </div>
      </form>
    </>
  );
}
