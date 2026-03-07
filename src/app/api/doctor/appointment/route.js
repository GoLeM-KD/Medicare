import { queryDatabase } from "../../../db";
import { cookies } from 'next/headers';

export async function GET(req) {

    try {

        const { searchParams } = new URL(req.url);
        const cookieStore = await cookies();
        const tokens = cookieStore.get('token')?.value;
        const date = searchParams.get('dt');
        

        const getQry = `
            SELECT [AptID]
                ,[DoctorID]
                ,[PatientID]
                ,[Name]
                ,[Reason]
                ,[AptDateTime]
                ,[PostDateTime]
                ,[Status]
            FROM [dbo].[APPOINTMENT_DTL]
            WHERE CONVERT(DATE, [AptDateTime]) = '${date}' AND [DoctorID] = (SELECT D.[DoctorID] FROM [dbo].[DOCTOR_MST] AS D WHERE D.[UserID] = '${tokens}')
        `;
        console.log(date, "WHYY", tokens)
        const result = await queryDatabase(getQry);

        return new Response(JSON.stringify({datas: result}), {status : 200})

    } catch (err) {
        console.log("ERROR",err)
        return new Response(JSON.stringify({Error: err}), {status:500});
    }
}