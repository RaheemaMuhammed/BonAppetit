import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getAnalytics } from '../../../Axios/Services/AdminServices'
import { Doughnut } from 'react-chartjs-2'
import 'chart.js/auto'
import BarChart from './BarChart'
const Graphs = () => {
  const token =useSelector(state=>state.AdminReducer.accessToken)
  const [data,setData] = useState([])
  const [doughdata,setDoughdata] =useState({})
  const [bardata,setbardata]=useState({})


  useEffect(() => {
   
    const fetchGraphData = async ()=>{
      try {
        const response = await getAnalytics(token)
        if(response.status==200){
          setDoughdata(response?.payload)
          console.log(response?.payload[0]);
          console.log(response?.payload);
          setData(response?.payload)
          console.log(data);
          console.log(doughdata,'///');
        }
      } catch (error) {
        console.log(error);
      
      }
    }
  
    fetchGraphData()
  }, [])
  useEffect(() => {
    setDoughdata(data[0])
    setbardata(data[1]?.category_recipe)
  
  }, [data]);
  const options = {
    title: {
      display: true,
      text:'Users'
      
  }, plugins: {
    title: {
      display: true,
      text: "Details of basic and premium users",
      align: "center",
      padding: {
        top: 10,
        bottom: 10,
      },
    },
    legend: {
      display: true,
      position: "top",
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMin: 100,
        suggestedMax: 50000

      },
    },
  },
    responsive: true,
  };
  const chartDatasets = {
      labels: ["Basic", 'Premium', 'With Private Recipe', 'No Private Recipe'],
      datasets: [
        {
          label:'Number of users',
          data: [
            doughdata?.basic || 0,
            doughdata?.premium || 0,
            doughdata?.with_private || 0,
            doughdata?.without_private || 0,
          ],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'],
        },
      ],

    }
  return (
  <div className="flex flex-col  w-full sm:grid sm:gap-5 sm:grid-cols-2 border p-2 h-[50%]">
    <div className='col-span-1'>
      {bardata && <BarChart options={options} data={bardata}/>}
    </div>
    <div className='col-span-1  '>
    <p className='text-2xl text-center my-3 font-medium'>Users</p>
<div className='flex items-center justify-center h-[80%]'>

    {doughdata && <Doughnut options={options} data ={chartDatasets} height={400}
    />}
</div>
    </div>
</div>
  
  )
}

export default Graphs