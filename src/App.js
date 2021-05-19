import './App.css';
import { Fragment, useEffect, useState } from 'react'
import Players from './Players.js'

// URL EndPoints listed below:
const apiKey = 'tyjr5pv8a87cuj2zgy7az57p';
// const url = new URL('https://api.sportradar.us/formula1/trial/v2/en/competitors');



function App() {


  const [season, setSeason] = useState("")
  const [racers, setRacers] = useState([])


  // const proxySeason = `https://proxy.hackeryou.com?reqUrl=https://api.sportradar.us/formula1/trial/v2/en/seasons.json?api_key=tyjr5pv8a87cuj2zgy7az57p`
  const seasonUrl = 'https://api.sportradar.us/formula1/trial/v2/en/seasons.json'
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

  // const proxySummary = `https://proxy.hackeryou.com?reqUrl=https://api.sportradar.us/formula1/trial/v2/en/sport_events/${season}/summary.json?api_key=tyjr5pv8a87cuj2zgy7az57p`

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

    }
  }, [season])
  // setTimeout(() => {
  //   fetch(proxySummary)
  //   .then(function (summaryResponse) {
  //     return summaryResponse.json()
  //   })

  //   .then(function (summarySecondResponse) {
  //     const localRacers = summarySecondResponse.stage.competitors.map((racer) => {
  //       return {
  //         id: racer.id,
  //         name: racer.name,
  //         points: racer.result.points,
  //         carNumber: racer.result.car_number,
  //         position: racer.result.position,
  //         teamName: racer.team.name
  //       }
  //     })
  //     setRacers(localRacers)
  //   })}, 3000)


  // fetch(proxySummary)
  //   .then(function (summaryResponse) {
  //     return summaryResponse.json()
  //   })

  //   .then(function (summarySecondResponse) {
  //     const localRacers = summarySecondResponse.stage.competitors.map((racer) => {
  //       return {
  //         id: racer.id,
  //         name: racer.name,
  //         points: racer.result.points,
  //         carNumber: racer.result.car_number,
  //         position: racer.result.position,
  //         teamName: racer.team.name
  //       }
  //     })
  //     setRacers(localRacers)
  //   })




  // .then(function () => {})

  // console.log("This is the seasons", seasons)
  // Store the season for 2021 in a variable





  return (
    <Fragment>
      <div className="wrapper">
        <h1>F1 Standings</h1>
        {
          racers.length ? <Players racers={racers} /> : <h2>Loading please wait..</h2>
        }

      </div>
    </Fragment>
  );
}

export default App;
