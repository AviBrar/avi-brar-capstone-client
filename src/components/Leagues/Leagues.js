import "./Leagues.scss";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Leagues() {
  const leaguesURL = process.env.REACT_APP_LEAGUES_URL;
  const teamsURL = process.env.REACT_APP_TEAMS_URL;

  const [leagues, setLeagues] = useState([]);

  const fetchLeagues = async () => {
    try {
      const res = await axios.get(leaguesURL);
      console.log(res.data);
      setLeagues(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const manageLeague = () => {};

  useEffect(() => {
    fetchLeagues();
  }, []);

  return (
    <>
      <div className="league-table">
        <section className="league-table__section league-table__section--leagues">
          <h2 className="league-table__heading">LEAGUES</h2>
          <ul className="league-table__list">
            {leagues.map((league) => {
              return (
                <li key={league.id} className="league-table__item">
                  <span
                    onClick={() => manageLeague(league.id)}
                    className="league-table__item-name"
                  >
                    {league.league_name}
                  </span>
                  <button className="league-table__item-button">...</button>
                </li>
              );
            })}
          </ul>
          <button className="league-table__button league-table__button--add">
            ADD NEW LEAGUE
          </button>
        </section>

        {/* <section className="league-table__section league-table__section--tournaments">
                <h2 className="league-table__heading">TOURNAMENTS</h2>
                <ul className="league-table__list">
                {tournaments.map((tournament) => (
                    <li key={tournament.id} className="league-table__item">
                    <span className="league-table__item-name">{tournament.name}</span>
                    <button className="league-table__item-button">...</button>
                    </li>
                ))}
                </ul>
                <button className="league-table__button league-table__button--add">ADD NEW TOURNAMENT</button>
            </section> */}
      </div>
    </>
  );
}
