import { queryDatabase } from "../../../../../db";
import { NextResponse } from "next/server";

export async function POST(req) {

    try {

        const FormData = await req.formData();
        const otp = FormData.get("otp");
        const emailOrUserName = FormData.get("userNameorEmail");

        // Then we must check the OTP is corrected or not
        const validateOTP = `
            SELECT [OtpID]
                ,[Email]
                ,[Otp]
                ,[ExpiresAt]
            FROM [dbo].[OTP_TRN]
            WHERE [Email] = (SELECT [Email] FROM [dbo].[USER_MST] WHERE [UserName] = '${emailOrUserName}' OR [Email] = '${emailOrUserName}') 
                    AND [Otp] = '${otp}' AND [ExpiresAt] > GETDATE() AND [IsUsed] = 0
        `;

        const validateOTPResult = await queryDatabase(validateOTP);

        if(validateOTPResult.length === 1) {
            // Then we must update OTP table that OTP req has been used
            const updateOTPQry = `
                UPDATE [dbo].[OTP_TRN]
                SET [IsUsed] = 1
                WHERE [Email] = '${validateOTPResult[0].Email}' AND [IsUsed] = 0 AND [ExpiresAt] > GETDATE()
            `;

            await queryDatabase(updateOTPQry);

            const getUSerDetailsQry = `
                SELECT [UserId]
                    ,[FirstName]
                    ,[LastName]
                    ,[UserName]
                    ,[Pwd]
                    ,[Email]
                    ,[Role]
                FROM [oulmsHospital].[dbo].[USER_MST]
                WHERE [Email] = '${validateOTPResult[0].Email}'
            `;

            const getUserDetailsResult = await queryDatabase(getUSerDetailsQry);

            if (getUserDetailsResult.length === 1) {

                const res = NextResponse.json({
                    success: true,
                    role: getUserDetailsResult[0].Role,
                });

                res.cookies.set("token", getUserDetailsResult[0].UserId, {
                    httpOnly: true,
                    path: "/",
                    maxAge: 60 * 60, // this is the place that we controle our cookie timeout period, we must enter values in seconds
                    sameSite: "lax",
                    secure: process.env.NODE_ENV === "production",
                });

                res.cookies.set("role", getUserDetailsResult[0].Role, {
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
                    why: "WORNGIN",
                });
            }
        } else {

            const updateOTPIFNOTqry = `
                UPDATE [dbo].[OTP_TRN]
                SET [IsUsed] = 1
                WHERE [Email] = (SELECT [Email] FROM [dbo].[USER_MST] WHERE [UserName] = '${emailOrUserName}' OR [Email] = '${emailOrUserName}') AND [IsUsed] = 0
            `;

            await queryDatabase(updateOTPIFNOTqry);

            return new Response(JSON.stringify({success : false, why: 'WRONG'}), {status: 500})

        }

    } catch(err) {

        console.log("LOGIN VERIFY OTP...", err);
        return new Response(JSON.stringify({success: false, why: err}), {status: 400});
    }
}