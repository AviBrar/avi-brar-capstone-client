import { Link } from "react-router-dom";
import "./PlayerList.scss";

export default function PlayerList({ players }) {
  return (
    <>
      <ul className="player-list">
        <h2>Players</h2>
        {players.map((player) => {
          return (
            <Link to={`/players/${player.id}`}>
              <li key={player.id}>
                <div className="player-list__player">
                  <span className="player-list__player--box">Player Name: {player.player_name}</span>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </>
  );
}
