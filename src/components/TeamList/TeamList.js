import "./TeamList.scss";
import { Link } from "react-router-dom";

export default function TeamList({
  id,
  team_name,
  goals,
  goals_against,
  wins,
  draws,
  losses,
}) {
  const points = wins * 3;

  return (
    <>
      <ul className="team-list">
        <li>{id}</li>
        <Link to={`/teams/${id}`}>
          <li className="team-list__name">{team_name}</li>
        </Link>
        <li>{wins}</li>
        <li>{draws}</li>
        <li>{losses}</li>
        <li>{goals}</li>
        <li>{goals_against}</li>
        <li>{points}</li>
      </ul>
    </>
  );
}
