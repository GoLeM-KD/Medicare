import { queryDatabase } from "../../../../db";
import nodemailer from "nodemailer";


function generateOTP(length = 6) {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req) {

    try {

        const FormData = await req.formData();
        const emailOrUName = FormData.get("emailOrUserName");

        // before generate an OTP and insert it into the database we must check the email
        const checkEmail = `
            SELECT [UserId]
                ,[Email]
            FROM [dbo].[USER_MST]
            WHERE [UserName] = '${emailOrUName}' OR [Email] = '${emailOrUName}'
        `;

        const checkEmailResult = await queryDatabase(checkEmail);

        if(checkEmailResult.length === 1) {

            const otp = generateOTP();

            const insertOTP = `
                INSERT INTO [dbo].[OTP_TRN]
                    ([Email]
                    ,[Otp])
                VALUES (
                    '${checkEmailResult[0].Email}',
                    '${otp}'
                )
            `;

            await queryDatabase(insertOTP);

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS,
                },
            });

            await transporter.sendMail({
                to: checkEmailResult[0].Email,
                subject: "MEDICARE OTP SERVICE",
                text: `---------------------------------\n\nYour OTP for Login is ${otp}\n PLEASE DO NOT SHARE THIS WITH ANYONE!!!\n\n---------------------------------`,
            });

            return new Response(JSON.stringify({success: true}), {status: 200});
        } else {

            return new Response(JSON.stringify({success:false, why:'WRONG'}), {status : 500});
        }
    } catch(err) {

        console.log("LOGIN FORGOT PWD...",err);
        return new Response(JSON.stringify({success: false, why:err}), {status:400});
    }

}