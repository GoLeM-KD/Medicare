import { queryDatabase } from "../../../db";
import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    const FormData = await req.formData();
    const userName = FormData.get("username");
    const password = FormData.get("password");

    const usercheckQry01 = `
            SELECT [UserId]
                ,[FirstName]
                ,[LastName]
                ,[UserName]
                ,[Pwd]
                ,[Email]
                ,[Role]
            FROM [oulmsHospital].[dbo].[USER_MST]
            WHERE ([UserName] = '${userName}' OR [Email] = '${userName}') AND [Pwd] = '${password}'
        `;
    const usercheckResult = await queryDatabase(usercheckQry01);

    if (usercheckResult.length === 1) {
      const res = NextResponse.json({
        success: true,
        role: usercheckResult[0].Role,
      });

      res.cookies.set("token", usercheckResult[0].UserId, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60, // this is the place that we controle our cookie timeout period, we must enter values in seconds
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });

      res.cookies.set("role", usercheckResult[0].Role, {
        httpOnly: true, 
        path: "/",
        maxAge: 60 * 60,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
      return res;
    } else {
      return NextResponse.json({
        success: false,
        message: "Username or Password is incorrect",
      });
    }
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ Error: err.message }), {
      status: 500,
    });
  }
}
