import './App.css';
import { Fragment, useEffect, useState } from 'react'
import Players from './PlayerProfile.js'

// URL EndPoints listed below:
const apiKey = 'tyjr5pv8a87cuj2zgy7az57p';
// const url = new URL('https://api.sportradar.us/formula1/trial/v2/en/competitors');

const seasonUrl = 'https://api.sportradar.us/formula1/trial/v2/en/seasons.json'


function App() {


  const [season, setSeason] = useState("sr:stage:686252")

  // },[summaryUrl])

  const proxySeason = new URL('https://proxy.hackeryou.com');
  proxySeason.search = new URLSearchParams({
    reqUrl: seasonUrl,
    "params[api_key]": apiKey
  });


  const summaryUrl = `https://api.sportradar.us/formula1/trial/v2/en/sport_events/${season}/summary.json`
  console.log("This is the summary url:", summaryUrl)

  
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

    
      fetch(proxySummary)
      .then(function (summaryResponse) {
        return summaryResponse.json()
      })
      .then(function (summarySecondResponse) {
        console.log(summarySecondResponse);
        return {
          
        }
      })

      console.log(proxySummary);
      // .then(function () => {})
      
        // console.log("This is the seasons", seasons)
        // Store the season for 2021 in a variable
        const year2021 = seasons[0].id
        setSeason(year2021)


      })

  }, [season, proxySeason, proxySummary])


  return (
    <Fragment>
      <h1>These are the seasons</h1>

      <Players />
    </Fragment>
  );
}

export default App;
