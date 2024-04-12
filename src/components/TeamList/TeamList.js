import './TeamList.scss';
import { Link } from 'react-router-dom';

export default function TeamList({ id, team_name, goals, goals_against, wins, draws, losses}){

    const points = wins*3 + draws;

    return(
        <>
            <div className='team-list'>
                <p>{id}</p>
                <Link to={`/teams/${id}`}><h3>{team_name}</h3></Link>
                <p>{wins}</p>
                <p>{draws}</p>
                <p>{losses}</p>
                <p>{goals}</p>
                <p>{goals_against}</p>
                <p>{points}</p>
            </div>
        </>
    )
}