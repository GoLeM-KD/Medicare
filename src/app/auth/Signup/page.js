"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function page() {
  const [pwd, setpwd] = useState("");
  const [cpwd, setcpwd] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");

  const [err, setErr] = useState(false);

  // Handdeling Loading screens
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();

  const handleRegister = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", pwd);
    formData.append("confirmPassword", cpwd);

    const res = await fetch("../../../api//auth/normal", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok && data.success == true) {
      router.push("/auth/Login");
    } else if (data.msg === "U") {
      alert("Username already exists");
    } else if (data.msg === "E") {
      alert("Email already exists");
    }

    setLoading(false);
  };
  return (
    <div className="flex justify-center items-center h-screen w-full bg-[#ffffff]">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-[400px] h-[500px] border-1 border-black flex flex-col justify-center items-center text-[#000000] gap-[10px]"
      >
        <h1 className="font-[30px] font-bold">Sign Up</h1>

        {err ? (
          <p className="text-red-500" id="error">
            {err}
          </p>
        ) : (
          ""
        )}

        <input
          type="text"
          placeholder="first Name"
          name="firstName"
          className="border-1 border-black rounded-[5px] h-[30px] w-[300px] pl-[10px]"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          type="text"
          placeholder="last Name"
          name="lastName"
          className="border-1 border-black rounded-[5px] h-[30px] w-[300px] pl-[10px]"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Username"
          name="username"
          className="border-1 border-black rounded-[5px] h-[30px] w-[300px] pl-[10px]"
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          name="email"
          className="border-1 border-black rounded-[5px] h-[30px] w-[300px] pl-[10px]"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          autoComplete="new-password"
          className="border-1 border-black rounded-[5px] h-[30px] w-[300px] pl-[10px]"
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
              if (
                !/[A-Z]/.test(e.target.value) ||
                !/[a-z]/.test(e.target.value) ||
                !/[0-9]/.test(e.target.value)
              ) {
                setErr(
                  "Password must contain at least one uppercase letter, one lowercase letter, and one number"
                );
              } else {
                setErr("");
              }
            }
          }}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          className="border-1 border-black rounded-[5px] h-[30px] w-[300px] pl-[10px]"
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

        {isLoading ? (
          <button
            type="button"
            className="w-[300px] h-[30px] rounded-[5px] bg-[#315b91] text-[#FFFFFF] cursor-pointer"
          >
            Loading...
          </button>
        ) : (
          <button
            type="button"
            className="w-[300px] h-[30px] rounded-[5px] bg-[#315b91] text-[#FFFFFF] cursor-pointer"
            onClick={handleRegister}
          >
            Sign Up
          </button>
        )}
      </form>
    </div>
  );
}
