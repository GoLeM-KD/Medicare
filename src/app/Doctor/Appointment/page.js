'use client'
import React, { useEffect, useRef, useState } from 'react'

export default function page() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const getAppointments = async () => {

            const respond = await fetch('../../api/doctor/appointment');
            const result = await respond.json();
            console.log("ADOOOOO",result.datas);
            setAppointments(result.datas);

        }

        getAppointments()
    },[])
  return (
    <div>page</div>
  )
}
