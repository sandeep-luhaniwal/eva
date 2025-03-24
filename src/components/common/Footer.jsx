"use client"
import Link from "next/link"
import { FOOTER_PAGINATION_DATA_LIST } from "./Helper"
import { ArrowIcon } from "./Icons"

const Footer = () => {
    const year = () => new Date().getFullYear();
    return (
        <div className="bg-stratos py-14 md:py-16 lg:py-20">
            <div className="max-w-[1140px] px-4 mx-auto xl:px-0 xl:pt-[30px]">
                <div className="flex flex-col md:flex-row md:justify-between gap-4">
                    <div className="md:max-w-[420px]">
                        <h2 className="text-white font-bold text-4xl md:text-custom-md !leading-none">Eva Social</h2>
                        <p className="font-medium text-white text-base !leading-141 py-4">Supercharge Your Content Creation with AI</p>
                        <div className="flex gap-5 md:gap-3 lg:gap-4 flex-wrap">
                            {FOOTER_PAGINATION_DATA_LIST.map((obj, i) => {
                                return (
                                    <Link key={i} href={obj.url} className="font-medium text-white text-base !leading-141 hover:text-light-yellow duration-300">{obj.title}</Link>
                                )
                            })}
                        </div>
                    </div>
                    <div className="md:max-w-[340px] lg:max-w-[410px] pt-10 md:pt-0">
                        <p className="font-medium text-white text-base !leading-141 md:text-end">Stay Up-to-Date with the Latest Social Media Strategies and Insights</p>
                        <form className="flex w-full gap-4 pt-4 md:pt-6">
                            <input type="email" className="w-full rounded-[20px] px-6 outline-none" placeholder="Email" required />
                            <button className='py-3.5 text-nowrap group md:py-4 lg:py-5 font-medium px-8 md:px-9 lg:px-10 text-base leading-none text-parsley bg-light-yellow rounded-[20px] hover:bg-light-blue hover:text-white duration-300 flex items-center gap-1.5'>Sign Up <span className='duration-300 group-hover:translate-x-3'><ArrowIcon /></span></button>
                        </form>
                    </div>

                </div>
                <div className="border-t-[0.5px] border-[#c7c7c7] pt-7 md:pt-[34px] mt-12 md:mt-14 lg:mt-[60px]">
                    <p className="font-medium text-white text-base !leading-141">© {year()} Eva Social. All rights reserved.</p>
                </div>
            </div>

        </div>
    )
}

export default Footer