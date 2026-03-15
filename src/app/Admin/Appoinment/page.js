"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";



export default function SearchAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");

  const router = useRouter();


  useEffect(() => {
    const getAppointments = async () => {
      const appointmentRequest = await fetch(
        search
          ? `../../api/admin/appointmentManagment?apt=${search}`
          : `../../api/admin/appointmentManagment`,
      );
      const appointmentResult = await appointmentRequest.json();
      console.log("APPOINTMENTS...", appointmentResult.Appointments);
      setAppointments(appointmentResult.Appointments);
    };

    getAppointments();
  }, [search]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {

        const formData = new FormData();
        formData.append("aptID", id)

        const requestDelete = await fetch(`../../api/admin/appointmentManagment`, {method : 'DELETE', body : formData})
        const respondDelete = await requestDelete.json();

        if(respondDelete.success) {
            Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
            });

            return router.push("/Admin/Appoinment");

        } else if (!respondDelete.success) {
            Swal.fire({
            title: "Oops!",
            text: `Appointment Deletion failed \n Error : ${respondDelete.ERROR}`,
            icon: "error",
            });
        }

      }
    });
  };
  return (
    <div className="mt-10 flex flex-col items-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Search Patient Appointment</h2>

      <input
        type="text"
        placeholder="Search patient name..."
        className="border p-2 w-[300px] md:w-w-[400px] rounded-[15px] text-[#000000] mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {/* -------- Rendering the appointments here ---- */}

      <div className="w-full flex flex-col md:flex-wrap md:flex-row gap-[15px] md:gap-[30px] items-center md:items-start justify-start md:justify-center">
        {/* -- User card -- */}
        {appointments.length > 0 ? (
          appointments.map((apt) => (
            <div className="w-[350px] bg-[#d7f2f5] flex flex-row items-center p-[10px] gap-[20px] rounded-[15px] shadow-2xl cursor-pointer" onClick={() => {handleDelete(apt.AptID)}}>
              {/* Image here */}
              <div className="w-[50px] h-[50px] rounde-full">
                <Image
                  src={apt.Pic || "/no-profile.png"}
                  alt="profileImage"
                  width={50}
                  height={50}
                  className="min-w-[50px] min-h-[50px] rounded-full"
                />
              </div>
              {/* Details here */}
              <div className="w-full flex flex-col justify-center items-start text-[16px]">
                <p className="font-bold">{apt.AptID}</p>
                <p>{apt.Name}</p>
                <p>{apt.DocName}</p>
                <p>
                  {new Date(apt.AptDateTime).toLocaleDateString("en-CA", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
