import './App.css';
import { Fragment, useEffect, useState } from 'react'
import Players from './Players.js'

// URL EndPoints listed below:
const apiKey = 'tyjr5pv8a87cuj2zgy7az57p';
// const url = new URL('https://api.sportradar.us/formula1/trial/v2/en/competitors');



function App() {
  // useStates here:
  const [season, setSeason] = useState("")
  const [racers, setRacers] = useState([])

  // Season URL and Proxy here:
  const seasonUrl = 'https://api.sportradar.us/formula1/trial/v2/en/seasons.json'
  const proxySeason = new URL('https://proxy.hackeryou.com');
  proxySeason.search = new URLSearchParams({
    reqUrl: seasonUrl,
    "params[api_key]": apiKey
  });

  // Summary URL and Proxy here:
  const summaryUrl = `https://api.sportradar.us/formula1/trial/v2/en/sport_events/${season}/summary.json`
  const proxySummary = new URL('https://proxy.hackeryou.com');
  proxySummary.search = new URLSearchParams({
    reqUrl: summaryUrl,
    "params[api_key]": apiKey
  });

  // 2 useEffect's with a fetch in each one, second dependancy calling on the change of 'season' from first fetch:
  useEffect(() => {

    // Fetch the url and Grab response for the seasons
    fetch(proxySeason)
      .then(response => response.json())
      .then(function (secondResponse) {

        const seasons = secondResponse.stages.map((year) => {
          return {
            id: year.id,
            description: year.description
          }
        })
        const year2021 = seasons[0].id
        setSeason(year2021)
      })
  }, []);


  useEffect(() => {
    if (season) {
      setTimeout(() => {
        fetch(proxySummary)
          .then(function (summaryResponse) {
            return summaryResponse.json()
          })

          .then(function (summarySecondResponse) {
            const localRacers = summarySecondResponse.stage.competitors.map((racer) => {
              return {
                id: racer.id,
                name: racer.name,
                points: racer.result.points,
                carNumber: racer.result.car_number,
                position: racer.result.position,
                teamName: racer.team.name

              }
            })
            setRacers(localRacers)
          })
      }, 1000
      )




    }
  }, [season])

  return (
    <Fragment>
      <div className="wrapper">
        <header>
          <h1>F1 Standings</h1>
        </header>
        <ol>
          {
            racers.map((piece) => {
              return (
                <Players
                  key={piece.id}
                  name={piece.name}
                  points={piece.points}
                  carNumber={piece.carNumber}
                  position={piece.position}
                  teamName={piece.teamName}
                />

              )
            })

          }
        </ol>

      </div>
    </Fragment>
  );
}

export default App;
