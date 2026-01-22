import { queryDatabase } from '../../../db';

export async function GET(req) {

    try {

        const { searchParams } = new URL(req.url);
        const searched = searchParams.get("search") || "";


        let allDoctors = `
            SELECT D.[DoctorID]
                ,D.[UserID]
                ,D.[University]
                ,D.[Progeram]
                ,D.[Price]
                ,D.[Spcl]
                ,D.[DcrDesc]
                ,U.[FirstName]
                ,U.[LastName]
                ,U.[ImageURL]
            FROM [oulmsHospital].[dbo].[DOCTOR_MST] AS D
            INNER JOIN [oulmsHospital].[dbo].[USER_MST] AS U
            ON U.[UserId] = D.[UserID]
        `

        if (searched != "") {

            allDoctors += `WHERE U.[FirstName] LIKE '%${searched}%' OR U.[LastName] LIKE '%${searched}%'` 
        }

        const allDoctorsResult = await queryDatabase(allDoctors);

        return new Response(JSON.stringify(allDoctorsResult), {status: 200});

    } catch (err) {
        console.log("ERRR", err);
        return new Response(JSON.stringify({ error: 'Failed to fetch doctors' }), { status: 500 });
    }


}
