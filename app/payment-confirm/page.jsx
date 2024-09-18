'use client'
import Link from 'next/link'
import React from 'react'
import Lottie from "lottie-react"
import doneAnimation from '../../public/doneAnimation.json';

function PaymentConfirm() {
	return (
		<div className='flex flex-col items-center justify-center px-5 mt-4'>
			<Lottie style={{height: 350}} animationData={doneAnimation}/>
			<h2 className='text-[24px]'>Payment Successful !</h2>
			<h2 className='text-[17px] text-center mt-6 text-gray-500'>We sent an email with your
				order confirmation
				along with Digital Content</h2>
			<Link
				href="/"
				className=' p-3 mt-5  hover:bg-teal-500 hover:text-white transition	 duration-200 ease-in-out  border-teal-500 border-4 rounded-2xl'>
				Go to Home</Link>

		</div>
	)
}

export default PaymentConfirm