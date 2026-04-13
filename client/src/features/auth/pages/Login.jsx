import logo from "@/assets/luminaLogo.svg"
import { Input, Button } from '@/shared/index.js'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <>
            <div className='min-[430px]:bg-linear-to-br from-[#f5f3ff] via-[#ede9fe] to-[#e0e7ff] min-h-screen'>

                <section className='max-[430px]:bg-[#F8F9FD]  py-4 px-7 flex gap-2'>
                    <img src={logo} alt="logo" className='w-6.5 min-[430px]:hidden' />
                    <p className='text-[#1D4ED8] text-2xl min-[600px]:text-3xl font-semibold min-[430px]:hidden'>Lumina</p>
                    <p className='text-[#1D4ED8] text-2xl min-[600px]:text-3xl font-semibold max-[430px]:hidden'>The Fluid Atelier</p>
                </section>

                <div className='overflow-y-auto relative overflow-hidden'>

                    <div className="absolute -top-40 -right-5 w-60 h-60 
              bg-[#9fb1f7] rounded-full min-[430px]:hidden"></div>

                    <div className="absolute bottom-5 -left-15 w-80 h-80
              bg-[#f5b1f7] rounded-full min-[430px]:hidden"></div>

                    <div className="max-w-107.5 m-auto px-7 pt-7 min-[430px]:pt-10 flex flex-col gap-8 max-[430px]:bg-white/30 max-[430px]:backdrop-blur-md bg-white max-[430px]:min-h-[calc(100vh-63.9875px)] h-124 min-[430px]:mt-5 rounded-lg">
                        <section>
                            <header className='flex flex-col gap-3 min-[430px]:text-center'>
                                <h2 className='text-[#282B51] text-4xl font-bold'>Welcome Back</h2>
                                <p className='text-[#555881] text-lg min-[430px]:hidden'>Enter your details to continue your conversations.</p>
                                <p className='text-[#555881] text-lg max-[430px]:hidden'>Enter your credentials to access your sanctuary</p>
                            </header>
                        </section>
                        <section>
                            <form className='flex flex-col gap-5'>

                                <div className='text-[#555881] flex flex-col gap-1 relative'>
                                    <label htmlFor="email" className='pl-3 font-semibold'>Email Address</label>
                                    <Input type="email" placeholder='name@example.com' id='email' className='px-5 py-3 rounded-full bg-[#F8F9FD] min-[430px]:bg-[#F1EFFF] border border-[#ECE9F9] outline-blue-500 focus:shadow-xs focus:shadow-blue-400 pr-12' />
                                </div>

                                <div className='text-[#555881] flex flex-col gap-1 relative'>
                                    <label htmlFor="password" className='pl-3 font-semibold'>Password</label>
                                    <Input type="password" placeholder='• • • • • • • •' id='password' className='px-5 py-3 rounded-full bg-[#F8F9FD] min-[430px]:bg-[#F1EFFF] border border-[#ECE9F9] outline-blue-500 focus:shadow-xs focus:shadow-blue-400 pr-12' />
                                </div>

                                <div className='mt-3 flex flex-col gap-3'>
                                    <Button className='bg-linear-to-r from-[#2c78f6] to-[#6094f7] min-[430px]:bg-[#0151AE]'>Log In</Button>
                                    <p className='text-center text-[#555881] font-semibold'>Don't have an account? <Link to={'/auth/register'} className='text-[#1D4ED8]'> Sign Up</Link></p>
                                </div>

                            </form>
                        </section>

                    </div>

                </div >
                <div className='text-[#9A9BBC] text-center text-sm py-5 max-[430px]:hidden'>
                    <p>"The quality of our conversations determines the quality of our</p>
                    <p>relationships."</p>
                </div>
            </div>
        </>
    )
}

export default Login