import Image from 'next/image'
import React from 'react'
import { AUTOMADE_DATA_LIST } from './common/Helper'

const AutoMadeSocial = () => {
  return (
    <div className='bg-australian py-16 md:py-20 lg:pt-[110px] lg:pb-[95px]'>
      <div className="max-w-[1140px] px-4 mx-auto xl:px-0">
        <div className="flex flex-col md:flex-row md:justify-between md:gap-10 xl:gap-[66px] md:items-center">
          <div className='md:max-w-[463px] flex justify-center w-full'>
            <div className="flex justify-center mx-auto w-full px-10 md:p-0 relative">
              <Image src={"/assets/images/png/people-like.png"} alt='peopele' width={463} height={646} className='rounded-[20px] w-full' />
              <Image src={"/assets/images/png/chat-img.png"} alt='peopele' width={100} height={105} className='absolute w-20 md:w-[100px] -top-9 right-0 md:-right-10 lg:-right-12' />
              <Image src={"/assets/images/png/comment-img.png"} alt='peopele' width={100} height={105} className='absolute w-[172px] md:w-[272px] -bottom-8 xl:-bottom-10 start-4 md:-start-3 xl:-start-10' />
            </div>
          </div>
          <div className='max-w-[611px] pt-10 md:pt-0'>
            <p className='font-medium text-sm leading-none uppercase text-dark-purpple'>Why Choose Us</p>
            <h2 className="pt-4 !leading-147 text-3xl md:text-4xl lg:text-custom-xl text-parsley font-bold">
              Automate & Optimize Your Social Media Effortlessly
            </h2>
            <div className="pt-6 lg:pt-10">
              <div className="flex flex-col gap-5 xl:gap-8">
                {AUTOMADE_DATA_LIST.map((obj, i) => {
                  return (
                    <div key={i} className='flex gap-6 md:gap-8'>
                      <Image src={obj.image} alt='commetn' height={100} width={100} className='w-16 md:w-20 h-16 md:h-20 lg:w-[100px] lg:h-[100px' />
                      <div>
                        <h3 className='text-xl lg:text-2xl !leading-141 font-bold text-dark-purpple'>{obj.title}</h3>
                        <p className='pt-2 !leading-141 xl:pt-4 text-base text-dark-gray'>{obj.descrition}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>



      </div>
    </div>
  )
}

export default AutoMadeSocial
