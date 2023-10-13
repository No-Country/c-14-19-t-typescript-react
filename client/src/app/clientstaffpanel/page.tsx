import React from 'react'
import Link from 'next/link'
import { nunito } from '@/fonts/fonts'

const page = (): React.ReactElement => {
    return (
        <div className={`${nunito.className} h-screen flex flex-col items-center border-4 border-blue-300 bg-green-50`}>
            <div className='h-2/5 tablet:h-2/4 tablet:text-4xl desktop:text-6xl text-3xl flex items-center'>
                <h2 className=''>Bienvenido de vuelta "x"</h2>
            </div>

            <div className='flex flex-col tablet:flex-row tablet:gap-20 gap-7 font-light text-center'>
                <Link className='border rounded-md desktop:text-4xl desktop:p-5  border-black text-3xl p-2 bg-green-400' href='/register'>Registar cliente</Link>
                <Link className='border rounded-md desktop:text-4xl desktop:p-5 border-black text-3xl p-2 bg-green-400' href='/clientsearch'>Buscar cliente</Link>
            </div>
        </div>
    )
}

export default page