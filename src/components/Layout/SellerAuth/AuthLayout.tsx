import React from 'react'

const AuthLayout = ({children}:{children: React.ReactNode}) => {
  return (
    <div className="flex justify-center items-center bg-seller-auth bg-cover bg-center h-full w-full max-[500px]:py-50 text-text-color">
      <div className={`w-3/5 flex justify-center min-[1173px]:justify-between p-6 min-[1173px]:grid grid-cols-2 rounded-2xl min-[1173px]:bg-footer-color`}>
        <div className='flex '>
          <div className={`hidden min-[1173px]:flex flex-col h-full space-y-5 px-5 `}>
            <h1 className='sm:text-3xl md:text-4xl xl:text-5xl font-extrabold leading-16'>Become A BajarHub Seller Today!</h1>
            <p className='sm:text-md md:text-md xl:text-xl  font-light'>Create a BajarHub seller account now and reach millions of customers!</p>
          </div>
        </div>
        <div className='flex justify-center'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout