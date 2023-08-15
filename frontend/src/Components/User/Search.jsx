import React, { useState,useEffect } from 'react'
import { Dropdown } from 'rsuite';
import { getSearchSuggestions } from '../../Axios/Services/UserServices';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAxios from '../../Axios/Instances/useAxios';

const Search = () => {
    const [value,setValue] =useState('')
    const token= useSelector(state=>state.UserReducer.accessToken)
    const [debouncedInputValue, setDebouncedInputValue] =useState('')
    const [suggestionList,setSuggestionList] =useState([])
    const [suggClicked,setSuggClicked] =useState(false)
    const [refresh,setRefresh]=useState(false)
    const navigate=useNavigate()
     const api=useAxios()
    const onChange =(evt)=>{

        setValue(evt.target.value)
        setSuggClicked(false)
        
    }
    
    const onSearch=(term)=>{
        if(term.length===0){
            toast.error('Enter a search query')
        }else{

        setSuggClicked(true)
          setValue(term)
          navigate(`/search/${term}`)
          setRefresh(!refresh)
         
          
            console.log(term,'searchinggg...');
        }
      
    }

    // for debouncing(limiting api call)
    useEffect(() => {
      const delayInputTimeoutId = setTimeout(() => {
        if(!suggestionList.includes(value)){
console.log(!suggestionList.includes(value))
            setDebouncedInputValue(value)
        }
      }, 500);
    
      return () => {
        clearTimeout(delayInputTimeoutId)
      }
    }, [value,500])
// to fetch the suggestions
    useEffect(() => {
      if(debouncedInputValue ){
        const fetchSuggestions= async()=>{
        try {
            const response = await getSearchSuggestions(api,debouncedInputValue)
            
            if(response?.status === 200){
                console.log(response?.payload);
                setSuggestionList(response?.payload)
            }else{
                console.log(response?.error);
            }
        } catch (error) {
            console.log(error);
        }
        
      }
    
      fetchSuggestions()
    }else{
        setSuggestionList([])
    }
     
    }, [debouncedInputValue])
    
       

    
  return (
    <div className='w-full'>
    
      <div className=" lg:mx-[9%] sm:mx-2 my-3 ">
            <div className="flex space-x-1">
                <input
                
                    type="text"
                    className="block w-full px-4 py-2 text-black bg-white border rounded-full focus:border-newPeach focus:ring-newPeach focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Search..."
                    value={ value}
                    onChange={onChange}

                   
                />
                {/* <Link to={}> */}
                
                <button className="px-4 text-white bg-btnColor rounded-full h-10 " onClick={()=>onSearch(value)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
                {/* </Link> */}
            </div>
            
        {!suggClicked && <>  {suggestionList?.length===0 ? '' :  <div className='absolute z-30 bg-newCoral p-2 w-max rounded-lg my-1'>
                {suggestionList?.map((item,index)=>{
                    return(
                        
                        
                        <p key={index} onClick={()=>onSearch(item)} className='my-1 cursor-pointer border-b-stone-700 hover:text-primary'>{item}</p>
                       
                    )
                })}


            </div>}
            </>
            }

        </div>
    </div>
  )
}

export default Search