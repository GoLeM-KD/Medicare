import { queryDatabase } from "../../../db";

// Getting appointments for admins
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const searcched = searchParams.get("apt");

    let appointmentQry = `
            SELECT A.[AptID]
                ,CONCAT(U.FirstName , ' ', U.LastName) AS DocName
                ,A.[Name]
                ,A.[AptDateTime]
                ,A.[Status]
                ,Us.[ImageURL] AS Pic
            FROM [dbo].[APPOINTMENT_DTL] AS A
            INNER JOIN [dbo].[DOCTOR_MST] AS D
            ON A.[DoctorID] = D.[DoctorID]
            INNER JOIN [dbo].[USER_MST] AS U
            ON D.[UserID] = U.[UserId]
            INNER JOIN ( SELECT * FROM [dbo].[USER_MST]) AS Us
            ON Us.[UserId] = A.[PatientID]
        `;

    if (searcched) {
      appointmentQry += `WHERE [AptID] LIKE '%${searcched}%'`;
    }

    const appointments = await queryDatabase(appointmentQry);

    return new Response(JSON.stringify({ Appointments: appointments }), {
      status: 200,
    });
  } catch (err) {
    console.log("ADMIN APPOINTMENT...", err);
    return new Response(JSON.stringify({ ERROR: err }), { status: 500 });
  }
}

// Delete appointment
export async function DELETE(req) {
  try {

    const FormData = await req.formData();
    const aptID = FormData.get("aptID");

    const deleteQry = `
        DELETE FROM [dbo].[APPOINTMENT_DTL]
        WHERE [AptID] = '${aptID}'
    `;

    await queryDatabase(deleteQry);
    
    return new Response(JSON.stringify({success: true}), {status : 200})
  } catch (err) {
    console.log("ADMIN APPOINTMENT DELETE...", err);
    return new Response(JSON.stringify({ success: false, ERROR: err }), { status: 500 });
  }
}
