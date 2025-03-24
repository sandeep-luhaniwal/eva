import Image from 'next/image'
import React from 'react'

const HowDone = () => {
    return (
        <div className='max-w-[1140px] mx-auto px-4 xl:px-0 pt-14 md:pt-16 lg:pt-20 xl:pt-[86px]'>
            <div className='flex flex-col items-center md:flex-row gap-6 h-full'>

                <div className='relative rounded-[20px] max-w-[510px] w-full md:w-[26%] h-full'>
                    <Image width={290} height={334} src='/assets/images/png/jeans-girl.png' alt='Middle Content' className='w-full md:h-[300px] object-cover lg:h-[334px] rounded-[20px]' />

                    {/* <p className='font-bold text-lg'>Schedule & [334px]mate Your Posts</p>
                    <button className='mt-4 bg-green-600 text-white px-4 py-2 rounded-lg'>Go to Dashboard →</button> */}
                </div>


                <div className='md:w-[45%] w-full max-w-[510px] h-full'>
                    <Image width={510} height={334} src='/assets/images/png/cake-girl.png' alt='Middle Content' className='max-w-[510px] w-full md:h-[300px]  object-cover lg:h-[334px] rounded-[20px]' />
                </div>

                {/* Right Box */}
                <div className='md:w-[26%] w-full max-w-[510px] h-full'>
                    <Image width={290} height={334} src='/assets/images/png/see-how.png' alt='Middle Content' className='w-full md:h-[300px] object-cover object-left lg:h-[334px] rounded-[20px]' />

                </div>
            </div>
        </div>
    )
}

export default HowDone
