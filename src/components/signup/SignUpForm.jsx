

"use client";
import Image from "next/image";
import React, { useState } from "react";// Import the API function
import { ClosedeyeIcon, EyeIcon, FacebookIcon, GoogleIcon } from "../common/Icons";
import Link from "next/link";
import { registerUser } from "@/utils/api";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const session = useSession();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); 
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name) newErrors.name = "Full Name is required.";

    if (!formData.number) {
      newErrors.number = "Mobile Number is required.";
    } else if (!/^[6-9]\d{9}$/.test(formData.number)) {
      newErrors.number = "Invalid mobile number.";
    }

    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!formData.password) newErrors.password = "Password is required.";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm Password is required.";

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const response = await registerUser(formData);
    setLoading(false);

    if (response.error) {
      setMessage(response.error);
    } else {
      setMessage("Account created successfully!");
      router.push("/login");
      setFormData({ name: "", number: "", email: "", password: "", confirmPassword: "" }); 
    }
  };

  return (
    <div className='relative overflow-hidden'>
      <span className='block h-[831px] w-[831px] absolute select-none top-[-311px] left-[-80px] blur-[434px] bg-light-blue bg-opacity-50'></span>
      <span className='block h-[831px] w-[831px] absolute select-none top-[170px] left-[789px] blur-[434px] bg-light-yellow bg-opacity-90'></span>
      <div className="max-w-[988px] px-4 lg:px-0 mx-auto py-10">
        <div className="bg-white rounded-[20px] p-5 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-[45%_54.8%] items-center">
            <div className='lg:ps-5 lg:pe-10'>
              <h1 className="text-[#100F14] font-semibold text-3xl">Create an Account</h1>
              <p className="text-[#49475a] text-xs">Sign up to see more</p>

              {message && <p className="text-center text-green-600">{message}</p>}

              <form className="flex flex-col pt-4" onSubmit={handleSubmit}>
                <label className="text-[#9794AA] font-medium">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="p-3 border rounded text-[#686677] outline-none"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <small className="text-red-500">{errors.name}</small>}

                <label className="text-[#9794AA] font-medium pt-4">Mobile Number</label>
                <input
                  type="text"
                  name="number"
                  className="p-3 border rounded text-[#686677] outline-none"
                  placeholder="Enter your mobile number"
                  value={formData.number}
                  onChange={handleChange}
                />
                {errors.number && <small className="text-red-500">{errors.number}</small>}

                <label className="text-[#9794AA] font-medium pt-4">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="p-3 border rounded text-[#686677] outline-none"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <small className="text-red-500">{errors.email}</small>}

                <label className="text-[#9794AA] font-medium pt-4">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="p-3 w-full border rounded text-[#686677] outline-none"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <span className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeIcon /> : <ClosedeyeIcon />}
                  </span>
                </div>
                {errors.password && <small className="text-red-500">{errors.password}</small>}

                <label className="text-[#9794AA] font-medium pt-4">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    className="p-3 w-full border rounded text-[#686677] outline-none"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
                {errors.confirmPassword && <small className="text-red-500">{errors.confirmPassword}</small>}

                <button type="submit" className="mt-6 rounded-lg py-3 bg-light-blue hover:bg-light-yellow">
                  {loading ? "Creating Account..." : "Create an Account"}
                </button>
              </form>
              <div className="flex items-center w-full gap-4 py-4 lg:py-6">
                <span className='max-w-[370px] w-full h-[1px] bg-[#CBCAD7] bg-opacity-80'></span>
                <p className='text-[13px] text-[#686677] font-semibold !leading-133 text-nowrap'>Continue with</p>
                <span className='max-w-[370px] w-full h-[1px] bg-[#CBCAD7] bg-opacity-80'></span>
              </div>
              <div onClick={()=>signIn("google")} className='lg:p-3.5 font-medium p-3 border-[0.73px] flex justify-center cursor-pointer rounded text-[#686677] hover:border-light-blue duration-300'>
                <p className='text-[#19181F] font-semibold text-xs !leading-133 flex gap-3 items-center text-center'>Login with Google <span><GoogleIcon /></span></p>
              </div>
              <Link href={"/"} className='lg:p-3.5 font-medium p-3 mt-3.5 border-[0.73px] flex justify-center cursor-pointer rounded text-[#686677] hover:border-light-blue duration-300'>
                <p className='text-[#19181F] font-semibold text-xs !leading-133 flex gap-3 items-center text-center'>Login with Facebook <span><FacebookIcon /></span></p>
              </Link>
              <p className='pt-4 lg:pt-6 text-xs tracking-wide text-center text-dark-gray font-bold'>DAlready a member?  <Link className='text-[#3548AA] hover:text-light-blue duration-300' href={"/login"}>Login</Link></p>
            </div>
            <div className='hidden md:flex md:ps-6 lg:ps-0'>
              <Image src={"/assets/images/png/signup-img.png"} height={652} width={518} className='w-full rounded-[29px]' alt='signup' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
