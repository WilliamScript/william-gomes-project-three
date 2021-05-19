// Seasons
const Players = (props) => {
    const { racers } = props
    return (
        <div>
            <ol>
                {

                    racers.map((racer) => {
                        return (

                            <li>
                                {`${racer.name} - ${racer.teamName} - ${racer.carNumber}`}
                            </li>


                        )
                    })
                }
            </ol>
        </div>
    )
}

export default Players;