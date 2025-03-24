import React from 'react'
import { OVERVIEW_ACCOUNT_DATA_LIST } from './common/Helper'

const AccountReach = () => {
    return (
        <div className='max-w-[911px] mx-auto px-4 xl:px-0 py-14 md:py-16 lg:py-[71px] xl:pt-[75px]'>
            <div className="flex flex-col md:flex-row gap-6 md:gap-4 justify-between">
                {OVERVIEW_ACCOUNT_DATA_LIST.map((obj, i) => {
                    return (
                        <div key={i} className='flex flex-col items-center'>
                            <div className="flex gap-3 items-center">
                                <span>{obj.icon}</span>
                                <h3 className='text-5xl md:text-[54px] text-midnight font-bold leading-none'>{obj.title}</h3>
                            </div>
                            <p className='text-base md:text-[17px] !leading-133 text-dark-gray text-center pt-3'>{obj.descrpition}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AccountReach
