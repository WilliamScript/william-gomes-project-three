// Seasons
const Players = (props) => {
    const { name, teamName, carNumber, position, points } = props

    return (
        <li>
            <p className="position">{position === 50? 20:position}</p>
            <div className={`${teamName} teamImg`}></div>
            <div className="teamAndName">
               <p className="racerName">{name}</p> 
               <p>{teamName}</p> 
            </div>
            {`${carNumber} - ${points ? points : 0}`}

        </li>
    )
}

export default Players;