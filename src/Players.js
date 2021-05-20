// Seasons
const Players = (props) => {
    const { name, carNumber, position, points } = props

    return (
        <li>
            <p className="position">{position === 50 ? 20 : position}</p>
            <div className={`${"teamName"} teamImg`}></div>
            <div className="teamAndName">
                <p className="racerName">{name}</p>
                {/* <p>{teamName}</p>  */}
            </div>
            <div className="extraInfo">
                <p>Total Points:{points ? points : 0}</p>
                <p>Racers Car Number:{carNumber} </p>
            </div>

        </li>
    )
}

export default Players;