import React from 'react'
import 'chart.js/auto'
import { Bar } from 'react-chartjs-2'
const BarChart = ({data,options}) => {


    const barDataSets ={
        labels: Object.keys(data),
        datasets:[
            {
            label:'Number of recipes',
                data: Object.values(data),
            }
        ]
    }
  return (
    <div>

        <Bar options={options} data={barDataSets} height={250}/>
    </div>
  )
}

export default BarChart