"use client"
import React, { useState, useEffect } from 'react';
import { PAGINATION_DATA_LIST } from './Helper';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowIcon, ClosedIcon, MenuIcon } from './Icons';
import { useRouter } from 'next/navigation';

const NavBar = () => {
    const [openNav, setOpenNav] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            setIsAuthenticated(!!token);
        };
    
        checkAuth(); 
    
        const handleAuthChange = () => checkAuth();
        window.addEventListener("authChange", handleAuthChange);
    
        return () => {
            window.removeEventListener("authChange", handleAuthChange);
        };
    }, []);
    

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user'); 
        setIsAuthenticated(false); 
        router.push('/login');
    };

    return (
        <div className="border-b border-light-gray">
            <div className='max-w-[1140px] mx-auto px-4 xl:px-0 py-2.5'>
                <div className="flex justify-between">
                    <Link className='hidden sm:flex' href={"/"}>
                        <Image src="/assets/images/png/page-logo.png" height={80} width={237} alt='page-logo' className='h-[60px] hidden sm:flex md:h-20 w-auto' />
                    </Link>
                    <Link className='sm:hidden' href={"/"}>
                        <Image src="/assets/images/png/mobile-logo.png" height={80} width={237} alt='page-logo' className='h-[60px] md:h-20 w-auto' />
                    </Link>
                    <div className="flex gap-5 md:gap-7 items-center">
                        <div className="hidden lg:flex items-center gap-5 md:gap-7 xl:gap-[38px]">
                            {PAGINATION_DATA_LIST.map((obj, i) => (
                                <Link key={i} href={"/"} className='duration-300 hover:text-light-blue font-semibold text-base !leading-none'>
                                    {obj.title}
                                </Link>
                            ))}
                        </div>
                        <div className='flex items-center'>
                            {!isAuthenticated ? (
                                <Link href={"/signup"} className='py-3.5 group md:py-4 mx-auto font-medium px-4 md:px-[34px] text-base md:text-[17px] leading-none text-parsley bg-light-yellow rounded-[20px] hover:bg-light-blue hover:text-white duration-300 flex items-center gap-1.5'>
                                    Sign Up Free <span className='duration-300 group-hover:translate-x-3'><ArrowIcon /></span>
                                </Link>
                            ) : (
                                <button
                                    onClick={handleLogout}
                                    className='py-3.5 group md:py-4 mx-auto font-medium px-4 md:px-[34px] text-base md:text-[17px] leading-none text-parsley bg-light-yellow rounded-[20px] hover:bg-light-blue hover:text-white duration-300 flex items-center gap-1.5'
                                >
                                    Logout
                                </button>
                            )}
                        </div>
                        <div className='cursor-pointer lg:hidden' onClick={() => setOpenNav(true)}>
                            <MenuIcon />
                        </div>
                    </div>
                </div>
                <div className={`w-full h-full min-h-screen lg:hidden bg-light-blue text-white flex justify-center items-center duration-300 top-0 fixed z-[100] ${openNav ? "left-0" : "left-full"}`}>
                    <div className="flex flex-col justify-center items-center gap-5 md:gap-7 xl:gap-[38px]">
                        {PAGINATION_DATA_LIST.map((obj, i) => (
                            <Link key={i} href={"/"} className='duration-300 hover:text-black font-semibold text-base sm:text-lg md:text-xl !leading-none'>
                                {obj.title}
                            </Link>
                        ))}
                    </div>
                    <div className='cursor-pointer absolute top-3 right-3' onClick={() => setOpenNav(false)}>
                        <ClosedIcon />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
