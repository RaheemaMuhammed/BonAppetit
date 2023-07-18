import React from 'react'
import animation from '../assets/animation.json';
import Lottie from 'lottie-react'
import { Link } from 'react-router-dom';
const Banner = () => {
  

  return (
    <>
            <hr className="my-6 border-btnColor mb-0 mt-0 sm:mx-auto h-" />

     <section className='w-[100%] bg-primary'> <div className="grid px-4 mx-auto lg:max-w-7xl md:items-center sm:flex md:flex md:px-8 max-w-screen-xl gap-4 py-8 lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 ">

    <div className="mr-auto place-self-center lg:col-span-7">
        <h1 className="max-w-2xl mb-4 text-3xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl ">CookBookEarn!</h1>
        <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-base dark:text-gray-400">Connect, Create, and Explore Culinary Delights. <br />
Share, Discover, and Earn with Your Recipes.</p>
        <Link to={'/login'} className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-btnColor rounded-lg bg-newPeach hover:bg-btnColor hover:text-primary focus:ring-4 focus:ring-primary dark:focus:ring-primary">
        
            Start Your Flavourful Journey.
            <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule ="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </Link>
       
    </div>
    <div className="hidden sm:mt-0 sm:col-span-5 sm:flex md:mt-0 md:col-span-5 md:flex lg:mt-0 lg:col-span-5 lg:flex">
    <div className='w-[500px]'>
  <Lottie animationData={animation}  />
</div>

    </div>                
</div>
</section>
    </>
   
   
  )
}

export default Banner