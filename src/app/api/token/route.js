import { cookies } from 'next/headers';

export async function GET() {

    try {

        const cookieStore = await cookies();
        const tokens = cookieStore.get('token')?.value;
        
        return new Response(JSON.stringify({ token: tokens }), { status: 200 });

    } catch (err) {

        return new Response(JSON.stringify({ message: err }), { status: 500 });
    }

}