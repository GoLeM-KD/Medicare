import { queryDatabase } from "../../../db";
import { cookies } from 'next/headers';

export async function GET(req) {

    try {

        const { searchParams } = new URL(req.url);
        const nameOrIDorUserName = searchParams.get("search") || "";
        const selectedRole = searchParams.get("role") || "";
        // We get the userID of the current admin to get users except that current admin
        const cookieStore = await cookies();
        const tokens = cookieStore.get('token')?.value;

        let getUserQry = `
            SELECT [UserId]
                ,[FirstName]
                ,[LastName]
                ,[UserName]
                ,[Email]
                ,[Role]
                ,[ImageURL]
            FROM [dbo].[USER_MST]
            WHERE [UserId] != '${tokens}'
        `;

        if(nameOrIDorUserName && !selectedRole) {

            getUserQry += `AND [UserId] LIKE '%${nameOrIDorUserName}%' OR [UserName] LIKE '%${nameOrIDorUserName}%' OR [FirstName] LIKE '%${nameOrIDorUserName}%' OR [LastName] LIKE '%${nameOrIDorUserName}%'`;

        } else if (!nameOrIDorUserName && selectedRole) {

            getUserQry += `AND [Role] = '${selectedRole}'`;

        } else if (nameOrIDorUserName && selectedRole) {

            getUserQry +=`AND [UserId] LIKE '%${nameOrIDorUserName}%' OR [UserName] LIKE '%${nameOrIDorUserName}%' OR [FirstName] LIKE '%${nameOrIDorUserName}%' OR [LastName] LIKE '%${nameOrIDorUserName}%' AND [Role] = '${selectedRole}}'`;

        }

        const usersResult = await queryDatabase(getUserQry);

        return new Response(JSON.stringify({users: usersResult}), {status: 200});

    } catch (err) {

        console.log("ADMIN GET USERS...", err);
        return new Response(JSON.stringify({Error: err}), {status: 500});
    } 
}

export async function DELETE(req) {

    try {

        const FormData = await req.formData();
        const uid = FormData.get("UID");

        const qry = `
            DELETE FROM [dbo].[USER_MST]
            WHERE [UserId] = '${uid}'
        `;

        await queryDatabase(qry);

        return new Response(JSON.stringify({success : true}), {status : 200});

    } catch (err) {

        console.log("ADMIN DELETE...", err);
        return new Response(JSON.stringify({success: false, ERROR : err}), {status : 500});
    }
}