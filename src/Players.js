// Seasons
const Players = (props) => {
    const { name, teamName, carNumber, position, points } = props
    return (
        <li>
            <div className={`${teamName} teamImg`}></div>
            {`${position} - ${name} - ${teamName} - ${carNumber} - ${points ? points : 0}`}

        </li>
    )
}

export default Players;