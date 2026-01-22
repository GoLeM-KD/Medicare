import { queryDatabase } from "../../../db";
import { UPLOAD_TO } from "../../cloudinary/cloudinary";

// This get does check the password before save the changes
export async function GET(req) {

    try {

        const { searchParams } = new URL(req.url);
        const userID = searchParams.get("uid");
        const pwd = searchParams.get("pwd");

        const searchQuery = `
            SELECT [UserId]
            FROM [dbo].[USER_MST]
            WHERE [UserId] = '${userID}' AND [Pwd] = '${pwd}'
        `;

        const qryResult = await queryDatabase(searchQuery);

        let sts = false;

        if(qryResult.length === 1) {
            
            sts = true;
        } else {
            sts = false;
        }

        return new Response(JSON.stringify({success: sts, why: 'P'}), {status: 200});

    } catch(err) {

        return new Response(JSON.stringify({success: false, why: err}), {status: 500});
    }
}


export async function PUT(req) {
  try {
    const FormData = await req.formData();
    const userName = FormData.get("userName")?.trim() || "";
    const firstName = FormData.get("fName")?.trim() || "";
    const lastname = FormData.get("lName")?.trim() || "";
    const email = FormData.get("email")?.trim() || "";
    const ImageFile = FormData.get("image");
    const userId = FormData.get("uid");
    const oldPassword = FormData.get("Opwd");
    const newPwd = FormData.get("Npwd");
    let imageURL;

    if (ImageFile && ImageFile.size > 0) {
      imageURL = await UPLOAD_TO(ImageFile);
      console.log("FILE..");
    } else {
      imageURL = ImageFile;
      console.log("URL...");
    }

    if (oldPassword && newPwd) {
      console.log("PASSWORD CHANGING....")
      // first we must validate the password
      const validatePwd = `
        SELECT [UserId]
              ,[Pwd]
          FROM [dbo].[USER_MST]
          WHERE [UserId] = '${userId}'
      `;
      
      const validatePWdResult = await queryDatabase(validatePwd);

      if (validatePWdResult.length === 1) {

        if(validatePWdResult[0].Pwd == oldPassword) {
          console.log("ITS CONFIRMED...")
          const updateIFPwd = `
            UPDATE [dbo].[USER_MST]
            SET [FirstName] = '${firstName}'
                ,[LastName] = '${lastname}'
                ,[UserName] = '${userName}'
                ,[Email] = '${email}'
                ,[ImageURL] = '${imageURL}'
                ,[Pwd] = '${newPwd}'
            WHERE [UserId] = '${userId}'
          `;

          await queryDatabase(updateIFPwd);

        } else {

          return new Response(JSON.stringify({success : false, why: 'WRONGPWD'}), {status : 500});
        } 
      }
    } else {
      console.log("PASSWORD NOT CHNGNG...")
      const updateQuery = `
              UPDATE [dbo].[USER_MST]
              SET [FirstName] = '${firstName}'
                  ,[LastName] = '${lastname}'
                  ,[UserName] = '${userName}'
                  ,[Email] = '${email}'
                  ,[ImageURL] = '${imageURL}'
              WHERE [UserId] = '${userId}'
          `;

      queryDatabase(updateQuery);
    }


    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (err) {
    console.log(err, "ERROR............... IMAGE");
    return new Response(JSON.stringify({ success: false, Error: err }), {
      status: 500,
    });
  }
}
