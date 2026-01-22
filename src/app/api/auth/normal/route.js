import { RequestError } from 'mssql';
import { queryDatabase } from '../../../db';


let userNameForErrors = ""; // these variavles to save userName and the email globally to handle catch section errors
let emailForErrors = "";

// This is the Register function for Patients
// We are not allowing users to choose their roles when they are registering
// because that can be a security issue
// So all the users who are registering through this form will be Patients
// and only Admins can create other roles
export async function POST(req) {

    try {

        const FormData = await req.formData();
        const userName = FormData.get('username');
        userNameForErrors = userName;
        const email = FormData.get('email');
        emailForErrors = email;
        const password = FormData.get('password');
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
        

        // now we can insert the user to the database
        /* 
            In here we default the Role to 'P' which means Patient
            We gonna create another register form api for admins
            they only can choose the role when they are created by another admin or
            any roles
        */
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
                    'P'
                )
        `
        await queryDatabase(insertQry);
        return new Response(JSON.stringify({success: true, msg: 'done'}), {status: 200});

    } catch (err) {
        if (err.name === "RequestError") {

            // Check if the error is due to duplicate username or email
            const userNamecheckQry = `SELECT [UserName] FROM [oulmsHospital].[dbo].[USER_MST] WHERE [UserName] = '${userNameForErrors}'`;
            const emailcheckQry = `SELECT [Email] FROM [oulmsHospital].[dbo].[USER_MST] WHERE [Email] = '${emailForErrors}'`;
            const userNamecheckResult = await queryDatabase(userNamecheckQry);
            const emailcheckResult = await queryDatabase(emailcheckQry);

            if (userNamecheckResult.length > 0) {
                console.log("----------------- KAVIJA -----------------", err.name, "----");
                return new Response(
                JSON.stringify({ success: true, msg: 'U', KAVIJA: err}),
                { status: 400 }
                );
            } else if (emailcheckResult.length > 0) {
                console.log("----------------- KAVIJA -----------------", err.name, "----");
                return new Response(
                JSON.stringify({ success: true, msg: 'E', KAVIJA: err}),
                { status: 400 }
                );
            }

        }
        return new Response(JSON.stringify({ Error_Register: err.number, error: err.name }), { status: 500 });
    }
}

