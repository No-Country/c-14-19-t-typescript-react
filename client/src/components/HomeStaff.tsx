import { getSession } from '@/utils/getJwtSession';
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { useRouter } from 'next/navigation';

const HomeStaff = ({ token }: { token: string }): React.ReactElement => {
    return (
    <div className='flex justify-center items-center h-[90vh]'>
        {!token && <Loader /> }
    </div>
  )
}

export default HomeStaff