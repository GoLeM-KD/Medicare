import { queryDatabase } from "../../db";
import nodemailer from "nodemailer";

// OTP generator function
function generateOTP(length = 6) {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Have to validate the entered email with the cuurent user's email
export async function POST(req) {
  try {
    const FormData = await req.formData();
    const email = FormData.get("email");
    const uid = FormData.get("uid");
    const otp = generateOTP();

    // before send the OTP we must check the Email that entered is correct or not with userID
    const validateEmail = `
      SELECT [UserId]
        FROM [dbo].[USER_MST]
        WHERE [UserId] = '${uid}' AND [Email] = '${email}'
    `;

    const validateEmailResult = await queryDatabase(validateEmail);

    if (validateEmailResult.length === 1) {
      const insertOTPQry = `
          INSERT INTO [dbo].[OTP_TRN]
            ([Email]
            ,[Otp])
          VALUES (
              '${email}',
              '${otp}'
          )
          `;

      await queryDatabase(insertOTPQry);

      console.log("OTP....", otp);

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        to: email,
        subject: "MEDICARE OTP SERVICE",
        text: `---------------------------------\n\nYour OTP is ${otp}\n PLEASE DO NOT SHARE THIS WITH ANYONE!!!\n\n---------------------------------`,
      });

      return new Response(JSON.stringify({ success: true }), { status: 200 });

    } else {
      return new Response(JSON.stringify({success:false, why: 'WRONG'}),{status: 500});
    }

  } catch (err) {

    return new Response(JSON.stringify({success: false, Error: err}), {status: 500});
  }
}
