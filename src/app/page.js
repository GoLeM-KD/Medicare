'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchRole = async () => {
      const response = await fetch('/api/token/checkToken');
      const data = await response.json();
      setRole(data.role);
    };
    fetchRole();
  }, []);

  
  useEffect(() => {
    if (role === "A") {
      router.push("/Admin");
    } else if (role === "P") {
      router.push("/User");
    } else if (role === "D") {
      router.push("/Doctor");
    }
  }, [role, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p>Entering...</p>
    </div>
  );
}
