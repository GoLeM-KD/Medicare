import { queryDatabase } from "../../../../db";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const FormData = await req.formData();
    const patientName = FormData.get("Pname");
    // had to format the date time to match sql datetime format
    const appointmentDate = FormData.get("dateAndTime");
    const formattedDateTime = appointmentDate.replace("T", " ") + ":00";
    //......
    const reason = FormData.get("reason");
    const doctorID = FormData.get("DoctorID");
    const userID = FormData.get("UserID");

    // Creating appointmentID by getting the count of existing appointments
    const appointmentCountResult = await queryDatabase(
      `SELECT * FROM [oulmsHospital].[dbo].[APPOINTMENT_DTL]`,
    );
    const appointmentCount = appointmentCountResult.length;
    let newAppointmentId;
    if (appointmentCount === 0) {
      newAppointmentId = `APT${String(appointmentCount + 1).padStart(5, "0")}`;
    } else {
      // now we must get the last userId from the database and increment it by 1
      const LastAppointment = await queryDatabase(
        `SELECT RIGHT(MAX([AptID]), 5) FROM [oulmsHospital].[dbo].[APPOINTMENT_DTL]`,
      );
      const LastAppointmentID = parseInt(LastAppointment[0][""]) + 1;
      newAppointmentId = `APT${String(LastAppointmentID).padStart(5, "0")}`;
    }
    //...............

    const submitAppointmentQuery = `
            INSERT INTO [oulmsHospital].[dbo].[APPOINTMENT_DTL]
                ([AptID]
                ,[DoctorID]
                ,[PatientID]
                ,[Name]
                ,[Reason]
                ,[AptDateTime]
                ,[Status])
            VALUES (
                '${newAppointmentId}',
                '${doctorID}',
                '${userID}',
                '${patientName}',
                '${reason}',
                '${formattedDateTime}',
                0
            )
        `;
    
    // Email configurations................................

    const doctorName = `
            SELECT CONCAT(U.[FirstName],' ',U.[LastName]) AS Name
            FROM [dbo].[USER_MST] AS U
            INNER JOIN [dbo].[DOCTOR_MST] AS D
            ON U.[UserId] = D.[UserID]
            WHERE U.[UserID] = (SELECT [UserID] FROM [dbo].[DOCTOR_MST] WHERE [DoctorID] = '${doctorID}')
        `;
    const userEmail = `
        SELECT [Email]
        FROM [dbo].[USER_MST]
        WHERE [UserId] = '${userID}'
    `;

    const userEmailResult = await queryDatabase(userEmail);
    const doctorNameResult = await queryDatabase(doctorName);

    console.log("date", appointmentDate);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    const dateTime = new Date(appointmentDate)
    await transporter.sendMail({
      to: userEmailResult[0].Email,
      subject: "MEDICARE APPOINTMENT DETAILS",
      text: `Your appointment details \n\n     Appointment ID: ${newAppointmentId}\n    Doctor Name: ${doctorNameResult[0].Name}\n     Date: ${dateTime.toISOString().split("T")[0]}\n     Time: ${dateTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}\n\\nThank you ${patientName} for connecting with us!`,
    });

    await queryDatabase(submitAppointmentQuery);
    return new Response(
      JSON.stringify({ message: "S", apt: newAppointmentId }),
      { status: 200 },
    );
  } catch (err) {
    console.log("ERROR...",err)
    return new Response(JSON.stringify({ message: "E" }), { status: 500 });
  }
}
