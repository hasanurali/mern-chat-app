import luminaLogo from "@/assets/luminaLogo.svg";
import { Input, Button } from '@/shared/index.js';
import sleekAbstractGlassSculptureLogo from "@/assets/SleekAbstractGlassSculpture.png";
import { Link } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { MdLockOutline } from 'react-icons/md';
import { FiMail } from 'react-icons/fi';
import { IoCallOutline } from "react-icons/io5";
import AuthFeatureCard from '../components/AuthFeatureCard'
import { GoShieldLock } from "react-icons/go";
import { TbMessageBolt } from "react-icons/tb";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AuthLoader from "../components/AuthLoader";
import { register as registerUser } from "../services/authService"
import { toast } from "react-toastify";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, reset, setError, formState: { errors, isDirty, isSubmitting } } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
    },
  })

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  };

  const onSubmit = async (data) => {
    try {
      const res = await registerUser(data)
      console.log(res.data)
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
      <div className='bg-linear-to-br from-[#f5f3ff] via-[#ede9fe] to-[#e0e7ff] min-h-screen pb-10 min-[1200px]:pb-5'>

        {/* Header */}
        <section className='py-4 min-[600px]:py-7 px-7 min-[600px]:px-15 flex gap-2 max-[770px]:bg-[#F8F9FD]'>
          <img src={luminaLogo} alt="logo.svg" className='w-6.5 min-[600px]:w-10 min-[770px]:hidden' />
          <p className='text-[#1D4ED8] text-2xl min-[600px]:text-3xl font-semibold min-[770px]:hidden'>Lumina</p>
          <p className='text-[#1D4ED8] text-2xl min-[600px]:text-3xl font-semibold hidden min-[770px]:block'>The Fluid Atelier</p>
        </section>

        <div className='min-[1200px]:flex max-[770px]:min-h-screen min-[770px]:h-fit min-[1200px]:px-20'>

          {/* Left Image */}
          <div className='hidden min-[1200px]:block relative'>
            <img className='w-screen h-175 mt-10 rounded-l-4xl object-cover' src={sleekAbstractGlassSculptureLogo} alt="Sculpture.png" />
            <div className='text-white absolute left-10 bottom-10'>
              <h2 className='text-3xl font-bold pb-3'>Lumina</h2>
              <p className='text-lg pr-35 min-[1300px]:pr-50 min-[1350px]:pr-65 min-[1420px]:pr-80'>Enter a sanctuary of connection. Experience the next evolution of desktop communication, where design meets dialogue.</p>
            </div>
          </div>

          {/* Form Container */}
          <div className='max-[1200px]:max-w-192.5 min-[1200px]:min-w-120 px-7 min-[600px]:px-15
           min-[1200px]:px-10 pt-7 min-[600px]:pt-15 min-[1200px]:pt-9 flex flex-col gap-6
           min-[600px]:gap-10 min-[1200px]:gap-6 overflow-y-auto pb-10 min-[1200px]:pb-5
           relative overflow-hidden min-[770px]:bg-[#F8F9FD] max-[1200px]:rounded-xl
           min-[1200px]:rounded-r-4xl max-[1199px]:m-auto min-[770px]:mt-20 min-[1200px]:mt-10'>

            {/* Background Effects */}
            <div className="absolute top-8 right-8 w-24 h-24 bg-purple-300/30 rounded-full blur-2xl min-[770px]:hidden"></div>
            <div className="absolute bottom-16 left-8 w-32 h-32 bg-indigo-300/30 rounded-full blur-2xl min-[770px]:hidden"></div>
            <div className="absolute bottom-8 right-16 w-20 h-20 bg-pink-200/20 rounded-full blur-xl min-[770px]:hidden"></div>


            {/* Title */}
            <section>
              <header className='flex flex-col gap-3 min-[600px]:gap-5'>
                <h2 className='text-[#282B51] text-4xl min-[600px]:text-5xl min-[1200px]:text-4xl font-bold'>Join Lumina</h2>
                <p className='text-[#555881] text-lg min-[600px]:text-xl min-[1200px]:text-lg'>Step into an ethereal space of fluid conversations.</p>
              </header>
            </section>

            {/* Form */}
            <section>
              <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>


                {/* Name */}
                <div className='text-[#555881] flex flex-col gap-1 min-[600px]:gap-2 relative'>
                  <label htmlFor="name" className='pl-3 font-semibold min-[600px]:text-lg min-[1200px]:text-md'>Full Name</label>
                  <Input {...register('name', {
                    required: "Name is required",
                    minLength: { value: 3, message: "Name must be at least 3 characters" },
                    maxLength: { value: 30, message: "Name must be under 30 characters" },
                    pattern: {
                      value: /^[A-Za-z ]+$/,
                      message: "Only letters are allowed",
                    },
                    validate: (v) =>
                      v.trim().length > 0 || "Name cannot be empty spaces",
                  })}
                    type="text"
                    placeholder='Alex Rivers'
                    id='name'
                    className='px-3 py-3 rounded-full bg-[#F8F9FD] min-[770px]:bg-[#F1EFFF] border border-[#ECE9F9] outline-blue-500 focus:shadow-xs focus:shadow-blue-400 pl-11' />
                  {errors.name && <span className="px-10 text-red-500 text-sm absolute -bottom-5 -left-7">• {errors.name.message}</span>}
                  <FaRegUser className='absolute top-10.5 min-[600px]:top-12.5 left-4' size={20} />
                </div>

                {/* Phone */}
                <div className='text-[#555881] flex flex-col gap-1 min-[600px]:gap-2 relative'>
                  <label htmlFor="phone" className='pl-3 font-semibold min-[600px]:text-lg min-[1200px]:text-md'>Phone No</label>
                  <Input {...register('phone', {
                    required: "Phone No is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Phone number must be exactly 10 digits",
                    },
                  })}
                    type="tel"
                    placeholder='000-000-0000'
                    id='phone'
                    className='px-3 py-3 rounded-full bg-[#F8F9FD] min-[770px]:bg-[#F1EFFF] border border-[#ECE9F9] outline-blue-500 focus:shadow-xs focus:shadow-blue-400 pl-11' />
                  {errors.phone && <span className="px-10 text-red-500 text-sm absolute -bottom-5 -left-7">• {errors.phone.message}</span>}
                  <IoCallOutline className='absolute top-10.5 min-[600px]:top-12.5 left-4' size={20} />
                </div>

                {/* Email */}
                <div className='text-[#555881] flex flex-col gap-1 min-[600px]:gap-2 relative'>
                  <label htmlFor="email" className='pl-3 font-semibold min-[600px]:text-lg min-[1200px]:text-md'>Email Address</label>
                  <Input {...register('email', {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
                    }
                  })}
                    type="email"
                    placeholder='alex@lumina.com'
                    id='email'
                    className='px-3 py-3 rounded-full bg-[#F8F9FD] min-[770px]:bg-[#F1EFFF] border border-[#ECE9F9] outline-blue-500 focus:shadow-xs focus:shadow-blue-400 pl-11' />
                  {errors.email && <span className="px-10 text-red-500 text-sm absolute -bottom-5 -left-7">• {errors.email.message}</span>}
                  <FiMail className='absolute top-10.5 min-[600px]:top-12.5 left-4' size={20} />
                </div>

                {/* Password */}
                <div className='text-[#555881] flex flex-col gap-1 min-[600px]:gap-2 relative'>
                  <label htmlFor="password" className='pl-3 font-semibold min-[600px]:text-lg min-[1200px]:text-md'>Password</label>
                  <Input {...register('password', {
                    required: "Password is required",
                    minLength: { value: 8, message: "Password must be at least 8 characters" },
                    validate: {
                      hasUpper: (v) => /[A-Z]/.test(v) || "Must contain uppercase",
                      hasLower: (v) => /[a-z]/.test(v) || "Must contain lowercase",
                      hasNumber: (v) => /[0-9]/.test(v) || "Must contain number",
                      hasSpecial: (v) => /[@$!%*?&]/.test(v) || "Must contain special character",
                    }
                  })}
                    type={showPassword ? "text" : "password"}
                    placeholder='• • • • • • • •'
                    id='password'
                    className='px-3 py-3 rounded-full bg-[#F8F9FD] min-[770px]:bg-[#F1EFFF] border border-[#ECE9F9] outline-blue-500 focus:shadow-xs focus:shadow-blue-400 pl-11 pr-10' />
                  {errors.password && <span className="px-10 text-red-500 text-sm absolute -bottom-5 -left-7">• {errors.password.message}</span>}
                  <MdLockOutline className='absolute top-10.5 min-[600px]:top-12.5 left-4' size={20} />

                  {showPassword ? (
                    <FaRegEye onClick={handleShowPassword} className="absolute right-4 bottom-3.5 cursor-pointer" size={20} />
                  ) : (
                    <FaRegEyeSlash onClick={handleShowPassword} className="absolute right-4 bottom-3.5 cursor-pointer" size={20} />
                  )}
                </div>

                {/* Submit */}
                <div className='mt-3 flex flex-col gap-3'>
                  <Button type="submit" disabled={isSubmitting || !isDirty} className='bg-linear-to-r from-[#2c78f6] to-[#6094f7] min-[770px]:bg-[#0155B7] flex justify-center'>{isSubmitting ? <AuthLoader /> : "Create Account"}</Button>
                  <p className='text-center text-[#555881] font-semibold'>Already have an account? <Link to={'/auth/login'} className='text-[#1D4ED8]'>Log in</Link></p>
                </div>

              </form>
            </section>

            {/* Features */}
            <section className='mt-5 flex gap-4 min-[770px]:hidden'>
              <AuthFeatureCard icon={<TbMessageBolt size={22} color='#8E3A8A' />} title='High-Speed Messaging' />
              <AuthFeatureCard icon={<GoShieldLock size={22} color='#0050D4' />} title='End-to-End Privacy' bg='bg-[#E0E0FF]' circleColor='bg-[#CAD2FB]' circlePosition='-top-6 -right-6' />
            </section>

          </div>
        </div>
      </div>
    </>
  )
}


export default Register