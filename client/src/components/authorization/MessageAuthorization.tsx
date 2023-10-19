import React from 'react'

const MessageAuthorization = ({ message }: { message: string }): React.ReactElement => {
    
  return (
    <div className='w-full h-[50px] flex justify-center items-center mt-7 absolute top-[82%] right-[1%] tablet:top-[78%] tablet:right-0 desktop:top-[86%]'>
        <p className='text-red-500 font-bold text-lg tablet:text-xl'>{message}</p>
    </div>
  )
}

export default MessageAuthorization