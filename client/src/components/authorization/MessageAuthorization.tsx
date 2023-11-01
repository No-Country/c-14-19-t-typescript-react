import React from 'react'

const MessageAuthorization = ({ message }: { message: string }): React.ReactElement => {
    
  return (
    <div className='bg-slate-100 p-2 w-full h-[50px] overflow-hidden flex justify-center items-center mt-5 text-center'>
        <p className='text-red-500 font-bold text-sm tablet:text-xl'>{message}</p>
    </div>
  )
}

export default MessageAuthorization