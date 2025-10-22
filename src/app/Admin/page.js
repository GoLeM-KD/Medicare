// app/Admin/page.js
import Link from 'next/link'

export default async function Page() {

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Link href="/Admin/registerMember">Register A Member</Link>
    </div>
  )
}
