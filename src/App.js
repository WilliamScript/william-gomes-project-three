import './App.css';
import { Fragment, useEffect, useState } from 'react'
import Players from './Players.js'

// URL EndPoints listed below:
const apiKey = 'tyjr5pv8a87cuj2zgy7az57p';
// const url = new URL('https://api.sportradar.us/formula1/trial/v2/en/competitors');

const seasonUrl = 'https://api.sportradar.us/formula1/trial/v2/en/seasons.json'


function App() {


  const [season, setSeason] = useState("sr:stage:686252")
  const [racers, setRacers] = useState([])

  // },[summaryUrl])

  const proxySeason = new URL('https://proxy.hackeryou.com');
  proxySeason.search = new URLSearchParams({
    reqUrl: seasonUrl,
    "params[api_key]": apiKey
  });


  const summaryUrl = `https://api.sportradar.us/formula1/trial/v2/en/sport_events/${season}/summary.json`

  const proxySummary = new URL('https://proxy.hackeryou.com');
  proxySummary.search = new URLSearchParams({
    reqUrl: summaryUrl,
    "params[api_key]": apiKey
  });

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
        // setSeason(year2021)
      })


    fetch(proxySummary)
      .then(function (summaryResponse) {
        return summaryResponse.json()
      })

      .then(function (summarySecondResponse) {
        const racers = summarySecondResponse.stage.competitors.map((racer) => {
          return {
            id: racer.id,
            name: racer.name,
            points: racer.result.points,
            carNumber: racer.result.car_number,
            position: racer.result.position,
            teamName: racer.team.name
          }
        })
        setRacers(racers)
        console.log(racers)
      })

    // .then(function () => {})

    // console.log("This is the seasons", seasons)
    // Store the season for 2021 in a variable



  }, [season, proxySeason, proxySummary])


  return (
    <Fragment>
      <div className="wrapper">
      <h1>F1 Standings</h1>

      <Players racers={racers} />
      </div>
    </Fragment>
  );
}

export default App;
