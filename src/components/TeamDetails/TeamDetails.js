import './TeamDetails.scss';

export default function TeamDetails({
    id, league_id, team_name, city, country, manager_name, team_description, contact_phone,
    contact_email, founding_year, goals, goals_against, wins, draws, losses
}){

    const points = wins*3 + draws;



    return(
        <>
            <section className='team-details'>
                <h1>{team_name}</h1>
                <div className='team-details__history'>
                    <p>{team_description}</p>
                    <p>City: {city}</p>
                    <p>Country: {country}</p>
                    <p>Founding Year: {founding_year}</p>
                    <p></p>
                </div>
                <div className='team-details__stats'>
                    <p>Goals: {goals}</p>
                    <p>Goals Against: {goals_against}</p>
                    <p>Wins: {wins}</p>
                    <p>Draws: {draws}</p>
                    <p>Losses: {losses}</p>
                    <p>Points: {points}</p>
                </div>
                <div className='team-details__contact'>
                    <p>Manager: {manager_name}</p>
                    <p>Manager Phone: {contact_phone}</p>
                    <p>Manager Email: {contact_email}</p>
                </div>
            </section>
        </>
    )
}