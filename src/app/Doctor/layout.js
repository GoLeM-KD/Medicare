import { redirect } from 'next/navigation'
import { queryDatabase } from '../db'
import { cookies } from 'next/headers'
import { Poppins } from "next/font/google";

const poppa = Poppins({
  weight: ["100","200","400","600", "700"],
  subsets: ["latin"],
});

export default async function DoctorLayout({children}) {

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
  redirect('/auth/Login')
  }

  const userRoleQuery = `
  SELECT [Role]
  FROM [dbo].[USER_MST]
  WHERE [UserId] = '${token}'
  `
  const userRoleResult = await queryDatabase(userRoleQuery)

  if (userRoleResult[0]?.Role !== 'D') {
  redirect('/')
  }

  return (
      <div
        className={poppa.className}
      >
        {children}
      </div>
  );
}