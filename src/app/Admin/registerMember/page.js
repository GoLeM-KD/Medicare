'use client'
import React,{useState} from 'react'
import { useRouter } from 'next/navigation';

export default function page() {

    const [pwd, setpwd] = useState('');
    const [cpwd, setcpwd] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setusername] = useState('');
    const [email, setemail] = useState('');

    // role states
    const [role, setRole] = useState('P');

    
    const [err, setErr] = useState(false);

    const router = useRouter();

    const handleRegister = async () => {

        if (!firstName || !lastName || !username || !email || !pwd || !cpwd) {
            setErr("All fields are required");
            return;
        }

        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', pwd);
        formData.append('confirmPassword', cpwd);
        formData.append('role', role);

        const res = await fetch("../../../api//auth/admin", {
            method: 'POST',
            body: formData
        });

        const data = await res.json();
        if (res.ok && (data.success == true)) {
            alert('Member Registered Successfully');

        } else if (data.message === 'U') {
            alert('Username already exists');
        } else if (data.message === 'E') {
            alert('Email already exists');
        }



    }

  return (
    <div className='flex justify-center items-center h-screen w-full bg-[#ffffff]'>
        <form onSubmit={(e) => e.preventDefault()} className='w-[500px] h-[600px] border-1 border-black flex flex-col justify-center items-center text-[#000000] gap-[20px]'>
            <h1 className='font-[30px] font-bold'>Register A Member</h1>

            {err ? <p className='text-red-500' id='error'>{err}</p> : ""}

            <input 
                type='text' 
                placeholder='first Name' 
                name='firstName'
                className='border-1 border-black rounded-[5px] h-[30px] w-[300px] pl-[10px]'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)} 
            />

            <input 
                type='text' 
                placeholder='last Name' 
                name='lastName' 
                className='border-1 border-black rounded-[5px] h-[30px] w-[300px] pl-[10px]'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)} 
            />
            
            <input 
                type='text' 
                placeholder='Username' 
                name='username' 
                className='border-1 border-black rounded-[5px] h-[30px] w-[300px] pl-[10px]'
                value={username}
                onChange={(e) => setusername(e.target.value)} 
            />

            <input 
                type='email' 
                placeholder='Email' 
                name='email' 
                className='border-1 border-black rounded-[5px] h-[30px] w-[300px] pl-[10px]'
                value={email}
                onChange={(e) => setemail(e.target.value)} 
            />

            <input 
                type='password' 
                placeholder='Password' 
                name='password' 
                className='border-1 border-black rounded-[5px] h-[30px] w-[300px] pl-[10px]'
                value={pwd}
                onChange={(e) => {
                    setpwd(e.target.value);
                    if (e.target.value.length < 8) {
                        setErr("Password must be at least 8 characters long");

                    } 
                    
                    if (e.target.value.length > 8) {
                        setErr("Password must be in 8 characters long");

                    } 
                    
                    if (e.target.value.length === 8) {
                        
                        if(!/[A-Z]/.test(e.target.value) || !/[a-z]/.test(e.target.value) || !/[0-9]/.test(e.target.value)) {
                            setErr("Password must contain at least one uppercase letter, one lowercase letter, and one number");

                        } else {
                            setErr("");
                        }
                    }
                }} 
            />

            <input 
                type='password' 
                placeholder='Confirm Password' 
                name='confirmPassword' 
                className='border-1 border-black rounded-[5px] h-[30px] w-[300px] pl-[10px]' 
                value={cpwd}
                onChange={(e) => {
                    setcpwd(e.target.value);
                    if (pwd !== e.target.value) {
                        setErr("Confirm Password does not match!!");
                        
                    } else {
                        setErr("");
                    }

                }}
            />

            <div className='flex flex-row justify-between items-center w-[400px]'>
                
                <input type='radio' value='A' name='role' onClick={() => setRole('A')}/> Admin
                <input type='radio' value='D' name='role' onClick={() => setRole('D')}/> Doctor
                <input type='radio' value='N' name='role' onClick={() => setRole('N')}/> Nurse
                <input type='radio' value='P' name='role' defaultChecked onClick={() => setRole('P')}/> Patient
            
            </div>

            <button type='button' className='w-[300px] h-[30px] rounded-[5px] bg-[#315b91] text-[#FFFFFF] cursor-pointer' onClick={handleRegister}>Sign Up</button>
        </form>
    </div>
  )
}
