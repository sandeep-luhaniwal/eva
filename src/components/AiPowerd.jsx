import React from 'react'
import { AIPOWERED_DATA_LIST } from './common/Helper'
import Image from 'next/image'

const AiPowerd = () => {
    return (
        <div className='max-w-[1140px] mx-auto px-4 xl:px-0 py-14 md:pt-16 lg:py-[74px] border-t border-[#c7c7c7]'>
            <h2 className='text-center !leading-147 text-3xl md:text-4xl lg:text-custom-xl text-midnight font-bold'><span className='text-light-blue
            '>Your AI-Powered</span> Social Media Workflow</h2>
            <p className='mx-auto max-w-[555px] text-lg md:text-xl !leading-133 text-stratos font-medium text-center pt-3'>Seamlessly manage your content creation, scheduling, and analytics with our AI-driven platform.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10 lg:gap-16">
                {AIPOWERED_DATA_LIST.map((obj, i) => {
                    return (
                        <div key={i}>
                            <div className="flex justify-center">
                                <Image src={obj.image} alt='comment' width={303} height={303} className='w-[303px]' />
                            </div>
                            <h3 className='text-xl lg:text-2xl !leading-141 font-bold text-dark-purpple pt-6 md:pt-8 lg:pt-10'>{obj.title}</h3>
                            <p className='pt-2 !leading-141 xl:pt-4 text-base text-dark-gray'>{obj.descrition}</p>
                        </div>
                    )
                })}
            </div>


        </div>
    )
}

export default AiPowerd
