"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import { ClosedeyeIcon, EyeIcon } from '../common/Icons';
import Link from 'next/link';
import axios from "axios";
import { useRouter } from "next/navigation";

const LogInForm = () => {
    const [formData, setFormData] = useState({
        emailOrNumber: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' }); 
    };

    const isMobileNumber = /^[6-9]/.test(formData.emailOrNumber);

    const validateForm = () => {
        let newErrors = {};

        if (!formData.emailOrNumber) {
            newErrors.emailOrNumber = "Email or mobile number is required.";
        } else if (
            !/\S+@\S+\.\S+/.test(formData.emailOrNumber) && 
            !/^[6-9][0-9]{9}$/.test(formData.emailOrNumber) 
        ) {
            newErrors.emailOrNumber = "Invalid email or mobile number format.";
        }

        if (!formData.password) {
            newErrors.password = "Password is required.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const payload = {
                emailOrNumber: formData.emailOrNumber, 
                password: formData.password
            };

            const res = await axios.post("http://localhost:5000/api/users/login", payload);

            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                
                window.dispatchEvent(new Event("authChange"));
            
                router.push("/dashboard");
            }
        } catch (error) {
            setErrors({ form: error.response?.data?.message || "Login Failed" });
        }
    };

    return (
        <div className='relative overflow-hidden'>
            <div className="max-w-[988px] px-4 lg:px-0 mx-auto py-10">
                <div className="bg-white rounded-[20px] p-5 relative z-20">
                    <div className="grid grid-cols-1 md:grid-cols-[45%_54.8%] items-center">
                        <div className='lg:ps-5 lg:pe-10'>
                            <h1 className='text-[#100F14] font-semibold text-3xl leading-none'>Welcome back!</h1>
                            <p className='pt-0.5 text-[#49475a] text-xs leading-none'>Login to access all your data</p>

                          
                            <form className='flex flex-col pt-4 lg:pt-6 xl:pt-8' onSubmit={handleSubmit}>
                                <label className='text-[#9794AA] font-medium pb-0.5' htmlFor="emailOrNumber">Email or Mobile Number</label>
                                <div className="relative">
                                    {isMobileNumber && (
                                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#686677]">
                                            +91
                                        </span>
                                    )}
                                    <input
                                        type="text"
                                        name="emailOrNumber"
                                        id="emailOrNumber"
                                        className={`lg:p-3.5 font-medium p-3 border-[0.73px] rounded text-[#686677] hover:border-light-blue outline-none w-full ${
                                            isMobileNumber ? "!ps-10" : "" // Add padding if +91 is shown
                                        }`}
                                        placeholder='Enter your email or mobile number'
                                        value={formData.emailOrNumber}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.emailOrNumber && <small className="text-red-500">{errors.emailOrNumber}</small>}

                                <label className='text-[#9794AA] pb-0.5 font-medium pt-4' htmlFor="password">Password</label>
                                <div className='relative'>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        id="password"
                                        className='lg:p-3.5 w-full p-3 font-medium border-[0.73px] rounded text-[#686677] hover:border-light-blue outline-none'
                                        placeholder='Enter your password'
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <span
                                        className='absolute top-1/2 right-0 cursor-pointer -translate-y-1/2 pe-3'
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeIcon /> : <ClosedeyeIcon />}
                                    </span>
                                </div>
                                {errors.password && <small className="text-red-500">{errors.password}</small>}

                                {errors.form && <small className="text-red-500 mt-2">{errors.form}</small>}

                                <input
                                    type="submit"
                                    className='text-sm font-medium mt-6 rounded-[14px] py-3 bg-light-blue duration-300 hover:bg-light-yellow cursor-pointer lg:py-3.5'
                                    value={"Login"}
                                />
                            </form>

                            <p className='pt-4 lg:pt-6 text-xs tracking-wide text-center text-dark-gray font-bold'>
                                Don’t have an account?{" "}
                                <Link className='text-[#3548AA] hover:text-light-blue duration-300' href={"/signup"}>
                                    Register
                                </Link>
                            </p>
                        </div>

                        <div className='hidden md:flex md:ps-6 lg:ps-0'>
                            <Image
                                src={"/assets/images/png/login-bg-img.png"}
                                height={652}
                                width={518}
                                className='w-full rounded-[29px]'
                                alt='login'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogInForm;