import React from 'react'
import Image from 'next/image'

export default function loading() {
  return (
    <div className='flex w-full h-[100vh] justify-center items-center'>
      <Image src="/loading.gif" alt='Loading Image' width={50} height={50}/>
    </div>
  )
}
