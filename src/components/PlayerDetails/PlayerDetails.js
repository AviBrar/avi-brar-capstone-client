import './PlayerDetails.scss';

export default function PlayerDetails({player}) {
    return(
        <section className='player'>
            <div className='player__info'> 
                <h2>{player.player_name}</h2>
                <span>Team: {player.team_name}</span>
                <span>Address: {player.address}</span>
                <span>City: {player.city}</span>
                <span>Country: {player.country}</span>
                <span>Contact Name: {player.contact_name}</span>
                <span>Contact Phone: {player.contact_phone}</span>
                <span>Player Phone: {player.player_phone}</span>
                <span>Player Email: {player.player_email}</span>
            </div>
            <div className='player__stats'>
                <span>Goals: {player.goals}</span>
                <span>Assists: {player.assists}</span>
                <span>Yellow Cards: {player.yellow_cards}</span>
                <span>Red Cards: {player.red_cards}</span>
            </div>
        </section>
    )
}