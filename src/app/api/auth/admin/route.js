import { queryDatabase } from '../../../db';
import { NextResponse } from 'next/server';

export async function POST(req) {

    try {
        const FormData = await req.formData();
        const userName = FormData.get('username');
        const email = FormData.get('email');
        const password = FormData.get('password');
        const role = FormData.get('role') || 'P';
        const firstName = FormData.get('firstName') || "";
        const lastName = FormData.get('lastName') || "";

        // before insert the query we check the length of the USER_MST becaause thats how I decided to create the UserId
        const userCountResult = await queryDatabase(`SELECT * FROM [oulmsHospital].[dbo].[USER_MST]`);
        const userCount = userCountResult.length;
        let newUserId;
        if (userCount === 0) {
            newUserId = `UID${String(userCount + 1).padStart(5, '0')}`;
        } else {
            // now we must get the last userId from the database and increment it by 1
            const LastUser = await queryDatabase(`SELECT RIGHT(MAX([UserId]), 5) FROM [oulmsHospital].[dbo].[USER_MST]`)
            const lastUserIdNumber = parseInt(LastUser[0]['']) + 1;
            newUserId = `UID${String(lastUserIdNumber).padStart(5, '0')}`;
        }

        // now we can insert the user to the USER_MST
        const insertQry = `
            INSERT INTO [oulmsHospital].[dbo].[USER_MST]
                    ([UserId]
                    ,[FirstName]
                    ,[LastName]
                    ,[UserName]
                    ,[Pwd]
                    ,[Email]
                    ,[Role])
                VALUES (
                    '${newUserId}',
                    '${firstName}',
                    '${lastName}',
                    '${userName}',
                    '${password}',
                    '${email}',
                    '${role}'
                )
        `
        await queryDatabase(insertQry);

        // if the newly registered user is a doctor or a nurse we must add him into the DOCTOR_MST or NURSE_MST
        if (role === 'D') {
            const DoctorCountResult = await queryDatabase(`SELECT * FROM [oulmsHospital].[dbo].[DOCTOR_MST]`);
            const DoctorCount = DoctorCountResult.length;
            let DoctorID;
            if (DoctorCount === 0) {
                DoctorID = `DCT${String(DoctorCount + 1).padStart(5, '0')}`;
            } else {
                // now we must get the last userId from the database and increment it by 1
                const LastDoctor = await queryDatabase(`SELECT RIGHT(MAX([DoctorID]), 5) FROM [oulmsHospital].[dbo].[DOCTOR_MST]`)
                const lastDoctorIdNumber = parseInt(LastDoctor[0]['']) + 1;
                DoctorID = `DCT${String(lastDoctorIdNumber).padStart(5, '0')}`;
            }
                
            const insertDoctorTable = `
                INSERT INTO [oulmsHospital].[dbo].[DOCTOR_MST]
                    ([DoctorID]
                    ,[UserID]
                    )
                VALUES (
                    '${DoctorID}',
                    '${newUserId}'

                )
            `
            await queryDatabase(insertDoctorTable);
        } else if (role === 'N') {
            const NurseCountResult = await queryDatabase(`SELECT * FROM [oulmsHospital].[dbo].[NURSE_MST]`);
            const NurseCount = NurseCountResult.length;
            let NurseID;
            if (NurseCount === 0) {
                NurseID = `NRS${String(NurseCount + 1).padStart(5, '0')}`;
            } else {
                const LastNurse = await queryDatabase(`SELECT RIGHT(MAX([NurseID]), 5) FROM [oulmsHospital].[dbo].[NURSE_MST]`);
                const LastNurseIdNumber = parseInt(LastNurse[0]['']) + 1;
                NurseID = `NRS${String(LastNurseIdNumber).padStart(5, '0')}`;
            }

            const insertNurseTable = `
                INSERT INTO [oulmsHospital].[dbo].[NURSE_MST]
                    ([NurseID]
                    ,[UserID]
                    )
                VALUES (
                    '${NurseID}',
                    '${newUserId}'
                )
            `

            await queryDatabase(insertNurseTable);
        }
        return NextResponse.json({ success: true, message: 'done' });



    } catch (err) {
        if (err.name === "RequestError") {

            // Check if the error is due to duplicate username or email
            const userNamecheckQry = `SELECT [UserName] FROM [oulmsHospital].[dbo].[USER_MST] WHERE [UserName] = '${userNameForErrors}'`;
            const emailcheckQry = `SELECT [Email] FROM [oulmsHospital].[dbo].[USER_MST] WHERE [Email] = '${emailForErrors}'`;
            const userNamecheckResult = await queryDatabase(userNamecheckQry);
            const emailcheckResult = await queryDatabase(emailcheckQry);

            if (userNamecheckResult.length > 0) {
                return new Response(
                    JSON.stringify({ success: true, msg: 'U' }),
                    { status: 400 }
                );
            } else if (emailcheckResult.length > 0) {
                return new Response(
                    JSON.stringify({ success: true, msg: 'E' }),
                    { status: 400 }
                );
            }

        }
        return new Response(JSON.stringify({ Error_Register: err.number, error: err.name }), { status: 500 });
    }
}
