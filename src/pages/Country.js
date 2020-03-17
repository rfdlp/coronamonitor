import React from "react";
import { Fetch } from 'react-request';
import { Spinner } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { Line } from 'react-chartjs-2';
import moment from 'moment';

const Country = () => {
  const { countryCode } = useParams();
  const chartOptions = {
    tooltips: {
      mode: "nearest",
      position: "nearest",
      intersect: false,
      callbacks: {
        title: (tooltipItems, data) => {
          console.log('title', tooltipItems[0].xLabel);
          return moment(tooltipItems[0].xLabel)
              .utc()
              .format("MMMM DD, YYYY");
        },
      }
    },
    scales: {
      xAxes: [
        {
          ticks: {
            fontSize: 10,
            callback: value => moment(value).utc().format("MMM DD, YYYY")
          }
        }
      ]
    }
  }

  return (
    <div>
      <div>
        <Fetch url={`https://thevirustracker.com/free-api?countryTotal=${countryCode}`}>
          {({ fetching, failed, data }) => {
            if (fetching) {
              return (
                <div>
                  <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                </div>
              )
            }

            if (failed) {
              return <div>The request did not succeed.</div>;
            }

            if (data) {
              return (
                <div>
                  <div>Total Cases: {data.countrydata[0].total_cases}</div>
                  <div>Total Recovered: {data.countrydata[0].total_recovered}</div>
                  <div>Total Unresolved: {data.countrydata[0].total_unresolved}</div>
                  <div>Total Deaths: {data.countrydata[0].total_deaths}</div>
                  <div>New Cases Today: {data.countrydata[0].total_new_cases_today}</div>
                  <div>New Deaths Today: {data.countrydata[0].total_new_deaths_today}</div>
                  <div>Total Active Cases: {data.countrydata[0].total_active_cases}</div>
                  <div>Total Serious Cases: {data.countrydata[0].total_serious_cases}</div>
                </div>
              );
            }

            return null;
          }}
        </Fetch>
      </div>

      <div>
      <Fetch url={`https://thevirustracker.com/free-api?countryTimeline=${countryCode}`}>
        {({ fetching, failed, data }) => {
          if (fetching) {
            return (
              <div>
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </div>
            )
          }

          if (failed) {
            return <div>The request did not succeed.</div>;
          }

          if (data) {
            console.log(data.timelineitems[0]);
            const chartData = {
              labels: Object.keys(data.timelineitems[0]).map(k => new Date(k)),
              datasets: [
                {
                  label: 'New Daily Cases',
                  data: Object.keys(data.timelineitems[0]).map(k => (
                    {
                      x: new Date(k),
                      y: data.timelineitems[0][k].new_daily_cases
                    }
                  ))
                },
                {
                  label: 'New Daily Deaths',
                  data: Object.keys(data.timelineitems[0]).map(k => (
                    {
                      x: new Date(k),
                      y: data.timelineitems[0][k].new_daily_deaths
                    }
                  ))
                },
                {
                  label: 'Total Cases',
                  data: Object.keys(data.timelineitems[0]).map(k => (
                    {
                      x: new Date(k),
                      y: data.timelineitems[0][k].total_cases
                    }
                  ))
                },
                {
                  label: 'Total Recoveries',
                  data: Object.keys(data.timelineitems[0]).map(k => (
                    {
                      x: new Date(k),
                      y: data.timelineitems[0][k].total_recoveries
                    }
                  ))
                },
                {
                  label: 'Total Deaths',
                  data: Object.keys(data.timelineitems[0]).map(k => (
                    {
                      x: new Date(k),
                      y: data.timelineitems[0][k].total_deaths
                    }
                  ))
                }
              ]
            }
            
            return <Line data={chartData} options={chartOptions}/>;
          }

          return null;
        }}
      </Fetch>
      </div>
    </div>
  )
};

export default Country;



