import React from 'react'

const MessageAuthorization = ({ message }: { message: string }): React.ReactElement => {
    
  return (
    <div className='bg-slate-100 p-2 w-full h-[50px] overflow-hidden flex justify-center items-center absolute top-[82%] right-[1%] tablet:top-[78%] tablet:right-0 desktop:top-[86%]'>
        <p className='text-red-500 font-bold text-sm tablet:text-xl'>{message}</p>
    </div>
  )
}

export default MessageAuthorization