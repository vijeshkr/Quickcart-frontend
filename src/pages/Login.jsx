import React from 'react'

export const Login = () => {
    return (
        <div id='login' className='bg-rose-100 h-screen'>
            <div className='mx-auto container p-4'>
                <div className='bg-white p-2 py-5 max-w-md mx-auto'>
                    <form action="">
                        <div>
                            <input className='border w-full outline-none p-2 focus:border-black' type="email" placeholder='Email' />
                        </div>
                        <div>
                            <input className='border w-full outline-none p-2 focus:border-black' type="password" placeholder='password' />
                        </div>
                        <button>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
