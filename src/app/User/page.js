import { redirect } from 'next/navigation'
import { queryDatabase } from '../db'
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function page() {


  return (
    <div className='flex flex-col gap-[10px]'>
      USERS Dashboard

      <Link href="/User/BookADoctor">Book a Doctor</Link>
    </div>
  )
}
