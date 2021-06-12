import './App.css';
import { Fragment, useEffect, useState } from 'react'
import Players from './Players.js'

const apiKey = 'qq6tpe2qffsmqd78jz8ghghv';

function App() {
  // useStates here:
  const [season, setSeason] = useState("")
  const [racers, setRacers] = useState([])
  const [seasons, setSeasons] = useState([])

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
        // Mapping over seasons endpoint
        const seasonsArray = secondResponse.stages.map((year) => {
          // Saving the year id for second fetch call, Saving description for options dropdown
          return {
            id: year.id,
            description: year.description
          }
        })
        // Set season is here:
        setSeasons(seasonsArray)
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
            console.log(summarySecondResponse)
            // Mapping through season summary url to grab specific data for the app.
            const localRacers = summarySecondResponse.stage.competitors.map((racer, index) => {
              console.log("The index1:", index)
              return {
                id: racer.id,
                name: racer.name,
                points: racer.result ? racer.result.points : "No Data",
                carNumber: racer.result ? racer.result.car_number : "No Data",
                position: index + 1,
                teamName: racer.team ? racer.team.name : null
              }
            })
            setRacers(localRacers)
          })
          // Set timeout so that api calls are not too close together otherwise it causes an error with the api
      }, 1000
      )
    }
  }, [season])

  const handleChange = (event) => {
    event.preventDefault();
    // console.log(event.target)
    setSeason(event.target.value)
  }

  return (
    <Fragment>
      <div className="wrapper">
        <header>
          <h1>F1 Standings</h1>

          <p className="desc">This application allows you to look at past and current statistics of drivers in formula 1! All you need to do to access information on drivers is to select a year from the drop down menu and they will appear to you!</p>
        </header>

        <form action="">
          <select name="year" id="season" onChange={handleChange}>
            <option disabled selected>Select a year:</option>

            {
              seasons.map((year) => {
                return (
                  <option value={year.id}>{year.description}</option>
                )
              })
            }

          </select>
        </form>

        <ol>
          {
            racers.map((piece) => {
              return (
                <Players
                  id={piece.id}
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
