import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import React from 'react'

export const metadata: Metadata = {
  title: 'EasyBank - Home'
}

const Home = (): React.ReactElement => {
  return (
    <div>
      <Navbar></Navbar>
    </div>
  )
}

export default Home