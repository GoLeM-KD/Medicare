import { queryDatabase } from "../../../db";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const tokens = cookieStore.get("token")?.value;

    const userRoleQuery = `SELECT [Role]
            FROM [dbo].[USER_MST]
            WHERE [UserId] = '${tokens}'
        `;
    const userRoleResult = await queryDatabase(userRoleQuery);

    return new Response(
      JSON.stringify({ role: userRoleResult[0]?.Role || null }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
