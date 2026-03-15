import { queryDatabase } from "../../../db";
import { cookies } from "next/headers";

/* 
    This GET function being used to get
    the Doctor's current details
    thats all this do
*/
export async function GET() {
  try {
    const cookieStore = await cookies();
    const tokens = cookieStore.get("token")?.value;
    const getdetailsQuery = `
        SELECT D.[DoctorID]
            ,D.[UserID]
            ,D.[Progeram] AS Edu
            ,D.[Spcl]
            ,D.[DcrDesc]
            ,D.[PhoneNo]
            ,[LicenseNo]
            ,D.[YearsOfEXP]
            ,U.[FirstName] 
            ,U.[LastName]
            ,U.[ImageURL]
            ,U.[Email]
        FROM [dbo].[DOCTOR_MST] AS D
        INNER JOIN [dbo].[USER_MST] AS U
        ON D.[UserId] = U.[UserID]
        WHERE U.[UserID] = '${tokens}'
    `;

    const detailsX = await queryDatabase(getdetailsQuery);

    return new Response(JSON.stringify({details : detailsX}), {status : 200});
  } catch (err) {
    console.log("DOCTOR PROFILE GET...", err);
    return new Response(JSON.stringify({ ERROR: err }), { status : 500 });
  }
}

/* 
    This PUT function to Upadate the details
    through the Doctor's profile
*/
export async function PUT(req) {

    try {

        const FormData = await req.formData();
        const firstName = FormData.get("Fname");
        const lastName = FormData.get("Lname");
        const email = FormData.get("Email");
        const phoneNo = FormData.get("pn");
        const spcl = FormData.get("spcl");
        const Lnumber = FormData.get("Ln");
        const yop = FormData.get("yop");
        const education = FormData.get("edu");
        const description = FormData.get("desc");

        // For userID
        const cookieStore = await cookies();
        const tokens = cookieStore.get("token")?.value;

        const query = `
            UPDATE [dbo].[USER_MST]
            SET [FirstName] = '${firstName}'
                ,[LastName] = '${lastName}'
                ,[Email] = '${email}'
            WHERE [UserId] = '${tokens}';

            UPDATE [dbo].[DOCTOR_MST]
            SET [Progeram] = '${education}'
                ,[Spcl] = '${spcl}'
                ,[DcrDesc] = '${description}'
                ,[PhoneNo] = '${phoneNo}'
                ,[LicenseNo] = '${Lnumber}'
                ,[YearsOfEXP] = '${yop}'
            WHERE [UserID] = '${tokens}';
        `;

        await queryDatabase(query);

        return new Response(JSON.stringify({success: true}), {status : 200});


    } catch(err) {

        console.log("DOCTOR PROFILE PUT...",err);
        return new Response(JSON.stringify({success: false, ERROR: err}), {status : 422});

    }
}
