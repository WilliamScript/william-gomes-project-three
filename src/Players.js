// Seasons
const Players = (props) => {
  const { id, name, carNumber, position, points, teamName } = props
  return (
    <li key={id}>
      <p className="position">{position}</p>
      <div className={teamName != null ? `${teamName} teamImg` : "noImage teamImg"}></div>
      <div className="teamAndName">
        <p className="racerName">{name}</p>
        <p>{teamName}</p>
      </div>
      <div className="extraInfo">
        <p>Total Points:{points ? points : 0}</p>
        <p>Racers Car Number:{carNumber} </p>
      </div>
    </li>
  )
}

export default Players;