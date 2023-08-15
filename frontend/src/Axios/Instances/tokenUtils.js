import React from 'react'
import { useSelector } from 'react-redux'


export const getTokens = () => {
   const accessToken =useSelector(state=>state.UserReducer.accessToken)
   const refreshToken =useSelector(state=>state.UserReducer.refreshToken)
   return {accessToken,refreshToken}
}

