import React from 'react'
import * as motion from "framer-motion/client"

function Hero() {
  return (
    <section className="">
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen ">
    <div className="mx-auto max-w-xl text-center  mt-16">
      <motion.h1 
      initial={{x: -100 , opacity:0}}
      animate={{x: 0 , opacity:1}}
      transition={{duration: 0.5 , delay:0}}
      className="text-3xl font-extrabold sm:text-5xl">
       All Your Digital Products
        <strong className="font-extrabold text-primary sm:block"> Is One Click Away </strong>
      </motion.h1>

      <motion.p
        initial={{x: -100 , opacity:0}}
        animate={{x: 0 , opacity:1}}
        transition={{duration: 0.5 , delay:0.5}}
      className="mt-4 sm:text-xl/relaxed">
       Start Exploring State Of The Art Assets Now!
      </motion.p>

      <motion.div 
       initial={{x: -100 , opacity:0}}
       animate={{x: 0 , opacity:1}}
       transition={{duration: 0.5 , delay:1}}
      className="mt-8 flex flex-wrap justify-center gap-4">
       <button
    class="relative inline-flex items-center justify-center px-5 py-2.5 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded shadow-xl group hover:ring-0 hover:ring-purple-500">
    <span class="absolute inset-0 w-full h-full bg-gradient-to-br from-teal-400 via-teal-600"></span>
    <span
      class="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
    <span class="relative text-white text-base font-semibold">Get Start</span>
  </button>
  <button
    class="relative rounded px-5 py-2.5 overflow-hidden group shadow-lg hover:bg-gradient-to-r hover:from-primary hover:to-teal-600 hover:text-white hover:ring-2 hover:ring-offset-2 hover:ring-indigo-400 transition-all ease-out duration-300">
    <span
      class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
    <span class="relative text-base font-semibold ">Learn More</span>
  </button>
      </motion.div>
    </div>
  </div>
</section>
  )
}

export default Hero
