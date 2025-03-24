import React from 'react'
import { ArrowBlueIcon, ArrowIcon } from './common/Icons'
import Image from 'next/image'

const ContactUs = () => {
    return (
        <div className='max-w-[1140px] mx-auto px-4 xl:px-0 pt-14 md:pt-16 lg:pt-[93px]'>
            <p className='text-center font-medium text-sm leading-none uppercase text-dark-purpple'>Contact Us</p>
            <h2 className="pt-4 !leading-147 text-3xl md:text-4xl lg:text-custom-xl text-parsley font-bold text-center pb-8 md:pb-10">
                Get in Touch and Take the First Step Towards Social Media Success
            </h2>
            <button className='py-3.5 md:py-4 mx-auto lg:py-5 font-medium px-8 md:px-9 lg:px-10 text-lg md:text-xl leading-none text-parsley bg-light-yellow rounded-[20px] group hover:bg-light-blue hover:text-white duration-300 flex items-center gap-1.5'>Contact Us <span className='duration-300 group-hover:translate-x-3'><ArrowIcon /></span></button>
            <div className='mt-14 md:mt-16 lg:mt-[84px] rounded-tl-[20px] rounded-tr-[20px] bg-light-blue'>
                <div className="flex flex-col md:flex-row items-center justify-between py-9 md:pt-10 lg:pt-[45px] px-4 md:px-10 lg:px-14 xl:px-[94px] xl:pe-16">
                    <div className="max-w-[480px] order-2 md:order-1">
                        <h2 className='!leading-147 text-3xl md:text-4xl lg:text-custom-xl text-white font-bold'>
                            AI-Driven Analytics &
                            Performance Insights
                        </h2>
                        <p className='text-white !leading-162 text-base py-4 md:py-5'>Make data-driven decisions with powerful AI-powered analytics. Track engagement, monitor trends, and optimize your content strategy effortlessly.</p>
                        <button className='py-3.5 md:py-4 lg:py-5 font-medium px-8 md:px-9 lg:px-10 text-lg md:text-xl leading-none text-parsley group bg-light-yellow rounded-[20px] hover:bg-white hover:text-light-blue duration-300 flex items-center gap-1.5'>Get Started <span className='duration-300 group-hover:translate-x-3'><ArrowBlueIcon /></span></button>
                    </div>
                    <div className="pb-8 md:pt-0 md:order-2">
                        <Image src={"/assets/images/png/escommerce.png"} height={399} width={345} alt='ecommarce' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactUs
