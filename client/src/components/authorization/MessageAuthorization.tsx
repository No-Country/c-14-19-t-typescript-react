import React from 'react'

const MessageAuthorization = ({ message }: { message: string }): React.ReactElement => {
    
  return (
    <div className='w-full h-[50px] flex justify-center items-center mt-7'>
        <p className='text-red-500 font-bold text-xl'>{message}</p>
    </div>
  )
}

export default MessageAuthorization