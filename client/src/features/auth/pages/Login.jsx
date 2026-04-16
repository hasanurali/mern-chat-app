import logo from "@/assets/luminaLogo.svg";
import { Input, Button } from '@/shared/index.js';
import { Link } from 'react-router-dom';
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import AuthLoader from "../components/AuthLoader";
import { login } from "../services/authService"
import { toast } from "react-toastify"

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, reset, setError, formState: { errors, isDirty, isSubmitting } } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    };

    const onSubmit = async (data) => {
        try {
            const res = await login(data)
            console.log(res)
            reset()
        } catch (error) {

            const errorData = error?.response?.data;
            if (errorData.errors?.length) {
                errorData?.errors?.forEach((e) => {
                    setError(e.path, {
                        type: "server",
                        message: e.msg,
                    });
                });

            } else {
                toast.error(errorData?.message || errorData)
            }
        }
    };

    return (
        <>
            <div className='min-[430px]:bg-linear-to-br from-[#f5f3ff] via-[#ede9fe] to-[#e0e7ff] min-h-screen'>

                {/* Header */}
                <section className='max-[430px]:bg-[#F8F9FD]  py-4 px-7 flex gap-2'>
                    <img src={logo} alt="logo" className='w-6.5 min-[430px]:hidden' />
                    <p className='text-[#1D4ED8] text-2xl min-[600px]:text-3xl font-semibold min-[430px]:hidden'>Lumina</p>
                    <p className='text-[#1D4ED8] text-2xl min-[600px]:text-3xl font-semibold max-[430px]:hidden'>The Fluid Atelier</p>
                </section>

                <div className='overflow-y-auto relative overflow-hidden'>

                    {/* Background Effects */}
                    <div className="absolute -top-40 -right-5 w-60 h-60 bg-[#9fb1f7] rounded-full min-[430px]:hidden"></div>
                    <div className="absolute bottom-5 -left-15 w-80 h-80bg-[#f5b1f7] rounded-full min-[430px]:hidden"></div>

                    {/* Form Container */}
                    <div className="max-w-107.5 m-auto px-7 pt-7 min-[430px]:pt-10 flex flex-col gap-8 max-[430px]:bg-white/30
                     max-[430px]:backdrop-blur-md bg-white max-[430px]:min-h-[calc(100vh-63.9875px)] h-124 min-[430px]:mt-5 rounded-lg">

                        {/* Title */}
                        <section>
                            <header className='flex flex-col gap-3 min-[430px]:text-center'>
                                <h2 className='text-[#282B51] text-4xl font-bold'>Welcome Back</h2>
                                <p className='text-[#555881] text-lg min-[430px]:hidden'>Enter your details to continue your conversations.</p>
                                <p className='text-[#555881] text-lg max-[430px]:hidden'>Enter your credentials to access your sanctuary.</p>
                            </header>
                        </section>

                        {/* Form */}
                        <section>
                            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>

                                {/* Email */}
                                <div className='text-[#555881] flex flex-col gap-1 relative'>
                                    <label htmlFor="email" className='pl-3 font-semibold'>Email Address</label>
                                    <Input {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Invalid email",
                                        }
                                    })}
                                        type="email"
                                        placeholder='name@example.com'
                                        id='email'
                                        className='px-5 py-3 rounded-full bg-[#F8F9FD] min-[430px]:bg-[#F1EFFF] border border-[#ECE9F9] outline-blue-500 focus:shadow-xs focus:shadow-blue-400 pr-12' />
                                    {errors.email && <span className="px-10 text-red-500 text-sm absolute -bottom-5 -left-7">• {errors.email.message}</span>}
                                </div>

                                {/* Password */}
                                <div className='text-[#555881] flex flex-col gap-1 relative'>
                                    <label htmlFor="password" className='pl-3 font-semibold'>Password</label>
                                    <Input {...register("password", {
                                        required: "Password is required"
                                    })}
                                        type={showPassword ? "text" : "password"}
                                        placeholder='• • • • • • • •'
                                        id='password'
                                        className='px-5 py-3 rounded-full bg-[#F8F9FD] min-[430px]:bg-[#F1EFFF] border border-[#ECE9F9] outline-blue-500 focus:shadow-xs focus:shadow-blue-400 pr-12' />
                                    {errors.password && <span className="px-10 text-red-500 text-sm absolute -bottom-5 -left-7">• {errors.password.message}</span>}
                                    {showPassword ? <FaRegEye onClick={handleShowPassword} className="absolute right-4 bottom-3.5 cursor-pointer" size={20} /> :
                                        <FaRegEyeSlash onClick={handleShowPassword} className="absolute right-4 bottom-3.5 cursor-pointer" size={20} />}
                                </div>

                                {/* Submit */}
                                <div className='mt-3 flex flex-col gap-3'>
                                    <Button type="submit" disabled={isSubmitting || !isDirty} className='bg-linear-to-r from-[#2c78f6] to-[#6094f7] min-[430px]:bg-[#0151AE] flex justify-center'>{isSubmitting ? <AuthLoader /> : "Log In"}</Button>
                                    <p className='text-center text-[#555881] font-semibold'>Don't have an account? <Link to={'/auth/register'} className='text-[#1D4ED8]'> Sign Up</Link></p>
                                </div>

                            </form>
                        </section>
                    </div>
                </div >

                {/* Feature paragraph */}
                <div className='text-[#9A9BBC] text-center text-sm py-5 max-[430px]:hidden'>
                    <p>"The quality of our conversations determines the quality of our</p>
                    <p>relationships."</p>
                </div>
            </div>
        </>
    )
}

export default Login