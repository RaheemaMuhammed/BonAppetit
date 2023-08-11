import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getAnalytics } from '../../../Axios/Services/AdminServices'
import { Doughnut } from 'react-chartjs-2'
// import {Chart, ArcElement} from 'chart.js'
import 'chart.js/auto'
// Chart.register(ArcElement);
const Graphs = () => {
  const token =useSelector(state=>state.AdminReducer.accessToken)
  const [data,setData] = useState([])
  const [doughdata,setDoughdata] =useState({})

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
      },
    },
  },
    responsive: true,
  };
  const chartDatasets = {
      labels: ["Basic", 'Premium', 'With Private Recipe', 'No Private Recipe'],
      datasets: [
        {
          label:'basic',
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
  <div className="  w-full ">
    <p className='text-xl text-center my-3 font-medium'>Users</p>
    <div className='flex justify-center w-[100%] h-[45%]'>

    {doughdata && <Doughnut options={options} data ={chartDatasets}
    />}
    </div>
</div>
  
  )
}

export default Graphs