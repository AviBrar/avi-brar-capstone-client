import "./PlayerList.scss";

export default function PlayerList({ players }) {
  console.log(players);
  return (
    <>
      <div className="player-list">
        {players.map((player) => {
          return (
            <>
              <div className="player-list__player"></div>
            </>
          );
        })}
      </div>
    </>
  );
}
