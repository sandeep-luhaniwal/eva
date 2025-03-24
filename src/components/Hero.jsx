import React from 'react'
import { ArrowWhiteIcon } from './common/Icons'

const Hero = () => {
    return (
        <div className='pt-14 md:pt-16 lg:pt-[78px] max-w-[1140px] mx-auto px-4 xl:px-0'>
            <h1 className='text-4xl md:text-5xl lg:text-6xl text-stratos pb-4 md:pb-5 font-extrabold text-center xl:px-20'>Elevate Your Social Media Strategy with <span className='text-light-purpple'> Eva Social</span></h1>
            <p className='mx-auto max-w-[820px] text-lg md:text-xl !leading-133 text-stratos font-medium text-center'>Streamline your content creation, scheduling, and analytics with our AI-driven platform. Manage all your social media accounts effortlessly in one place.</p>
            <div className='flex items-center mt-6 md:mt-7'>
                <button className='py-3.5 md:py-4 mx-auto font-medium px-4 md:px-[32px] text-base md:text-[17px] leading-none hover:text-parsley hover:bg-light-yellow rounded-[20px] bg-light-blue text-white duration-300 group flex items-center gap-1.5'>Sign Up Free <span  className='duration-300 group-hover:translate-x-3'><ArrowWhiteIcon /></span></button>
            </div>

        </div>
    )
}

export default Hero
