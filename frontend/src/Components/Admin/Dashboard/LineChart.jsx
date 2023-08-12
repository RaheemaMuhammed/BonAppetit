 
import React, { useState } from 'react'
import 'chart.js/auto'
import { Line } from 'react-chartjs-2'
const LineChart = ({data,options}) => {
    const dates = Object.keys(data).sort((a, b) => {
        const dateA = new Date(a.split('-').reverse().join('-'));
        const dateB = new Date(b.split('-').reverse().join('-'));
        return dateA - dateB;
      });
      
    const incomeData = dates.map((date) => data[date].income);
    const outgoingData = dates.map((date) => data[date].outgoing);


    const lineDataSets ={
        labels: dates,
        datasets:[
            {
                label: "Income",
                data: incomeData,
                borderColor: "blue",
                fill:'start',
                backgroundColor: "rgba(0, 0, 255, 0.2)",
              },
              {
                label: "Outgoing",
                data: outgoingData,
                borderColor: "red",
                fill:'start',
                backgroundColor: "rgba(255, 0, 0, 0.2)",
              },
        ]
    }
  return (
    <div className='my-5 '>

        <Line options={options} data={lineDataSets} height={100} />
    </div>
  )
}

export default LineChart