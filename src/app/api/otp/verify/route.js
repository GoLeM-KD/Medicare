import { queryDatabase } from "../../../db";

export async function POST(req) {
  try {
    const FormData = await req.formData();
    const enteredOTP = FormData.get("otp");
    const email = FormData.get("email");

    const checkQry = `
            SELECT [OtpID]
                ,[ExpiresAt]
            FROM [dbo].[OTP_TRN]
            WHERE [Email] = '${email}' AND [Otp] = '${enteredOTP}' AND [IsUsed]=0 AND [ExpiresAt] > GETDATE()
        `;

    const checkQryResult = await queryDatabase(checkQry);

    let sts = false;

    if (checkQryResult.length === 1) {
      const updateOTP = `
                UPDATE [dbo].[OTP_TRN]
                SET [IsUsed] = 1
                WHERE [Email] = '${email}' AND [Otp] = '${enteredOTP}' AND [ExpiresAt] > GETDATE() AND [IsUsed] = 0
            `;
      await queryDatabase(updateOTP);
      sts = true;
    } else {
      // Ending session if user entered wrong OTP

      const updateIFNOTQRy = `
                UPDATE [dbo].[OTP_TRN]
                SET [IsUsed] = 1
                WHERE [Email] = '${email}' AND [IsUsed] = 0
            `;
      await queryDatabase(updateIFNOTQRy);
      sts = false;
    }

    return new Response(JSON.stringify({ success: sts, why: "WRONG" }), {
      status: 200,
    });
  } catch (err) {
    console.log("OTP VERIDY ERROR....", err);
    return new Response(JSON.stringify({ success: false, why: err }), {
      status: 500,
    });
  }
}
