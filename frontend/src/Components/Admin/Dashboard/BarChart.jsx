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
    <p className='text-2xl text-center my-3 font-medium'>Recipes</p>

        <Bar options={options} data={barDataSets} height={250}/>
    </div>
  )
}

export default BarChart