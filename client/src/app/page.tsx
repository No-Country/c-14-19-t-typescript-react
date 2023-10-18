import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import React from 'react'

export const metadata: Metadata = {
  title: 'EasyBank - Home'
}

const App = (): React.ReactElement => {
  return (
    <div>
      <Navbar />
    </div>
  )
}

export default App