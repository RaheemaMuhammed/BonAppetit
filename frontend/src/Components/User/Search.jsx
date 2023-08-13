import React, { useState,useEffect } from 'react'
import { Dropdown } from 'rsuite';
import { getSearchSuggestions } from '../../Axios/Services/UserServices';
import { useSelector } from 'react-redux';

const Search = ({setSearch,search}) => {
    const [value,setValue] =useState('')
    const token= useSelector(state=>state.UserReducer.accessToken)
    const [debouncedInputValue, setDebouncedInputValue] =useState('')
    const [suggestionList,setSuggestionList] =useState([])
    const [suggClicked,setSuggClicked] =useState(false)
    
    const onChange =(evt)=>{
        setValue(evt.target.value)
        
    }
    const onSearch=(term)=>{
        setSuggClicked(true)
      setValue(term)
    
      
        console.log(term,'searchinggg...');
      
    }
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

    useEffect(() => {
      if(debouncedInputValue ){
        const fetchSuggestions= async()=>{
        try {
            const response = await getSearchSuggestions(token,debouncedInputValue)
            
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
                <button className="px-4 text-white bg-btnColor rounded-full " onClick={()=>{value && setSearch(!search);onSearch(value)}}>
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
            </div>
            
        {!suggClicked && <>  {suggestionList?.length===0 ? '' :  <div className='absolute z-30 bg-newCoral p-2 w-max rounded-lg my-1'>
                {suggestionList?.map((item,index)=>{
                    return(
                   <p key={index} onClick={()=>{onSearch(item);}} className='my-1 cursor-pointer border-b-stone-700 hover:text-primary'>{item}</p>
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