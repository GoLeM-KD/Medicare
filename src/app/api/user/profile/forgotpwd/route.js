import { queryDatabase } from "../../../../db";

export async function POST(req) {

    try {

        const FormData = await req.formData();
        const newPassword = FormData.get("Npwd");
        const uid = FormData.get("uid");

        const updatePWDQry = `
            UPDATE [dbo].[USER_MST]
            SET [Pwd] = '${newPassword}'
            WHERE [UserId] = '${uid}'
        `;

        await queryDatabase(updatePWDQry);

        return new Response(JSON.stringify({success: true}), {status: 200});

    } catch(err) {

        console.log("FORGET PWD ERR...",err);
        return new Response(JSON.stringify({success:false, why:err}), {status:400});
    }
}