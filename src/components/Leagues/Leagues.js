import './Leagues.scss';
import {useState} from 'react';

export default function Leagues(){

    const [leagues, setLeagues] = useState();

    useEffect(() => {
        try:
    }, [])

     return(
        <>
            <div className="league-table">
            <h1 className="league-table__title">League Maestro</h1>
            <section className="league-table__section league-table__section--leagues">
                <h2 className="league-table__heading">LEAGUES</h2>
                <ul className="league-table__list">
                {leagues.map((league) => (
                    <li key={league.id} className="league-table__item">
                    <span className="league-table__item-name">{league.name}</span>
                    <button className="league-table__item-button">...</button>
                    </li>
                ))}
                </ul>
                <button className="league-table__button league-table__button--add">ADD NEW LEAGUE</button>
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
     )
}