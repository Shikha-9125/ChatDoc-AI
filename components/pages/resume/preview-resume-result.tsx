import React from 'react'
import DrapAndDrop from './drag-and-drop'
import { NotebookPen } from 'lucide-react'

function PreviewResumeResult() {
  return (
    <>
      <div className='border h-full flex flex-col justify-center items-center bg-gray-100 rounded-lg'>
        <NotebookPen className='h-4 w-4' />
        <span>Select a pdf </span>
      </div>
      {/* <DrapAndDrop/> */}
    </>
  )
}

export default PreviewResumeResult