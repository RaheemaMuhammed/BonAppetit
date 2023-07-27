import React from 'react'
import {GiWallet} from 'react-icons/gi'

const Wallet = () => {
  return (
    <div>
  <div className='mt-14 border rounded-md shadow-md mx-32 my-3'>
    <p className='text-center mt-8 font-semibold text-3xl'>Your Wallet Balance</p>
    <div className='my-8 h-20 flex flex-col items-center justify-center'>
      <p className='text-center text-2xl font-bold'>₹100</p>
      <div className='bg-btnColor hover:bg-primary  rounded-md w-auto px-3 py-1 mt-3'>
        <p className='text-white cursor-pointer hover:text-black text-center'>Redeem Now</p>
      </div>
    </div>
  </div>
</div>

  )
}

export default Wallet