import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import React from 'react'

const BackButton = ({URL}: {URL: string}) => {
  return (
    <>
        <Link to={URL} className="flex gap-2 items-center hover:underline"><ArrowLeft/> Back</Link>
    </>
  )
}

export default BackButton