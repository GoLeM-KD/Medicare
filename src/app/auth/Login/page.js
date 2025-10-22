'use client'
import Link from 'next/link'
import React, {useState} from 'react'
import { useRouter } from 'next/navigation'
function page() {

    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    //
    const router = useRouter();

    const handleLogin = async () => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        const res = await fetch("../../api/auth/login", {
            method: 'POST',
            body: formData
        });

        const data = await res.json();

        if (res.ok && (data.success == true)) {
            router.push('/');
        } else {
            alert(data.message || 'Login failed');
        }



    }
  return (
    <div className='flex justify-center items-center h-screen w-full bg-[#ffffff]'>
        <form onSubmit={(e) => e.preventDefault()} className='w-[400px] h-[300px] border-1 border-black flex flex-col justify-center items-center text-[#000000] gap-[10px]'>
            <h1 className='font-[30px]'>Login Page</h1>

            <input 
                type='text' 
                placeholder='Username or email' 
                name='username'
                className='border-1 border-black rounded-[5px] h-[30px] w-[300px] pl-[10px]'
                value={username}
                onChange={(e) => setusername(e.target.value)}  
            />
            <input 
                type='password' 
                placeholder='Password' 
                name='password' 
                className='border-1 border-black rounded-[5px] h-[30px] w-[300px] pl-[10px]'
                value={password}
                onChange={(e) => setpassword(e.target.value)}
            />

            <button type='button' className='w-[300px] h-[30px] rounded-[5px] bg-[#315b91] text-[#FFFFFF] cursor-pointer' onClick={handleLogin}>Login</button>

            <p>Don't Have an account? <Link href="/auth/Signup" className='text-[#5388cf]'>Sign Up</Link></p>
        </form>
    </div>
  )
}

export default page