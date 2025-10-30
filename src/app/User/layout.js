import { Margarine, Poppins } from "next/font/google";
import { cookies } from 'next/headers';
import { queryDatabase } from "../db";

import Foot from "../../compontents/Footer";
import NavBar from "./component/Navbar";

const poppa = Poppins({
  weight: ["100", "200", "400", "600", "700"],
  subsets: ["latin"],
});

export default async function UserLayout({ children }) {

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/auth/Login");
  }

  const userRoleQuery = `
    SELECT [Role]
    FROM [dbo].[USER_MST]
    WHERE [UserId] = '${token}'
    `;
  const userRoleResult = await queryDatabase(userRoleQuery);

  if (userRoleResult[0]?.Role !== "P") {
    redirect("/");
  }
  return (
    
    <div>
      <NavBar />
      {children}
      <Foot />
    </div>

  );
}
