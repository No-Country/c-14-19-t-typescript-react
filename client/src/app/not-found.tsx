import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'Page 404 not found',
}

const Error404 = (): React.ReactElement => {
  return (
    <div>Error404</div>
  )
}

export default Error404