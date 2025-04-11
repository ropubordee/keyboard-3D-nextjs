import Image from 'next/image'
import React from 'react'
import { FaStar } from 'react-icons/fa'


interface ReviewCardProps {
    name : string
    imgSrc : string
    text : string
    starts : number

}


const ReviewCard = ({name,text,starts,imgSrc} : ReviewCardProps) => {
  return ( 
    <div className='w-64 h-40 flex flex-col bg-stone-800 rounded-xl gap-y-2 px-4 py-6 mr-4'>
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center justify-center gap-4">
            <Image src={imgSrc} alt='imageReview' height={35} width={35} className='rounded-full'/>
            <span>{name}</span>
        </div>
        <div className="flex items-center justify-center gap-4">
            <FaStar/>
            <span>{starts}</span>
        </div>
      </div>
      <p className='text-slate-300 text-sm'>{text}</p>
    </div>
  )
}

export default ReviewCard
