import { Loader } from 'lucide-react'
import React from 'react'

function LoadingPage() {
  return (
    <div className='flex items-center w-full justify-center h-screen flex-col'>
        <Loader className='h-4 w-4 animate-spin'/>
        <span className='text-sm mt-1'>Page loading...</span>
    </div>
  )
}

export default LoadingPage