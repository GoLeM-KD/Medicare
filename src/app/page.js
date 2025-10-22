// SERVER COMPONENT (no 'use client')
import { cookies } from 'next/headers'
import {queryDatabase} from './db'

// dashboards
import UserDashboard from './User/page'
import AdminDashboard from './Admin/page'
import DoctorDashboard from './Doctor/page'

export default async function DashboardPage() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value || 'No token'

  const userRoleQuery = `SELECT [Role]
      FROM [dbo].[USER_MST]
      WHERE [UserId] = '${token}'
      `
  const userRoleResult = await queryDatabase(userRoleQuery);

  if(userRoleResult[0].Role ===  'A'){
    return <AdminDashboard token={token} />
  } else if (userRoleResult[0].Role === 'P') {
    return <UserDashboard token={token} />
  } else if (userRoleResult[0].Role === 'D') {
    return <DoctorDashboard token={token}/>
  }


  // Pass it down to a client component
 
}
