import { queryDatabase } from '../../../../db';

export async function GET(req) {

    try {
        const { searchParams } = new URL(req.url);
        const searched = searchParams.get("DoctorID") || "";

        const doctorDetailsQuery = `
            SELECT D.[DoctorID]
                ,D.[UserID]
                ,D.[University]
                ,D.[Progeram]
                ,D.[Price]
                ,D.[Spcl]
                ,D.[DcrDesc]
                ,CAST(U.[FirstName] AS VARCHAR(MAX)) + ' ' + CAST(U.[LastName] AS VARCHAR(MAX)) AS name
            FROM [oulmsHospital].[dbo].[DOCTOR_MST] AS D
            INNER JOIN [oulmsHospital].[dbo].[USER_MST] AS U
            ON U.[UserId] = D.[UserID]
            WHERE D.[DoctorID] = '${searched}'
        `;
        const doctorDetailsResult = await queryDatabase(doctorDetailsQuery);
        
        return new Response(JSON.stringify(doctorDetailsResult), {status: 200});

    } catch (err) {

        return new Response(JSON.stringify({ error: 'Failed to fetch doctor details' }), { status: 500 });
    }

}