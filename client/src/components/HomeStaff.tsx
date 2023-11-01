import React from 'react'
import Loader from './Loader';

const HomeStaff = ({ token }: { token: string }): React.ReactElement => {
    return (
    <div className='flex justify-center items-center h-[90vh]'>
        {!token && <Loader /> }
    </div>
  )
}

export default HomeStaff