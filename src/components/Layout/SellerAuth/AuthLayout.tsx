import React from 'react'

const AuthLayout = ({children}:{children: React.ReactNode}) => {
  return (
    <div className="flex justify-center items-center h-full w-full max-[500px]:my-15">
      <div className={`w-3/5 flex items-center justify-center p-6 min-[1173px]:bg-red-400 min-[1173px]:grid grid-cols-2 rounded-2xl`}>
        <div className='flex items-center justify-center'>
          <div className={`hidden min-[1173px]:flex flex-col items-center justify-center p-7 space-y-5`}>
            <h1 className='sm:text-3xl md:text-4xl xl:text-5xl text-amber-50 font-extrabold leading-14'>Become A BajarHub Seller Today!</h1>
            <p className='sm:text-md md:text-md xl:text-xl text-amber-50 font-semibold'>Create a BajarHub seller account now and reach millions of customers!</p>
          </div>
        </div>
        <div className='flex justify-end'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout