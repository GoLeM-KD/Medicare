"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

function page() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  // handeling loadings
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok && data.success) {
      const redirectMap = {
        A: "/Admin",
        D: "/Doctor",
        P: "/User",
      };

      router.replace(redirectMap[data.role]);
    } else {
      alert(data.message || "Login failed");
    }

    setLoading(false);
  };

  const handelingForgotPwd = async () => {
    Swal.fire({
      title: "Enter your Email or Username",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Send OTP",
      confirmButtonColor: "#2E7DAF",
      showLoaderOnConfirm: true,
      preConfirm: async (Semail) => {
        try {
          const formData = new FormData();
          formData.append("emailOrUserName", Semail);

          const sendOTPReq = await fetch(`/api/auth/login/forgotpwd`, {
            method: "POST",
            body: formData,
          });

          const sendOTPResult = await sendOTPReq.json();

          if (sendOTPResult.success) {
            return Swal.fire({
              title: "Enter OTP",
              input: "text",
              inputAttributes: {
                autocapitalize: "off",
              },
              showCancelButton: true,
              confirmButtonText: "Verify",
              confirmButtonColor: "#2E7DAF",
              showLoaderOnConfirm: true,
              preConfirm: async (otp) => {
                const formDataS = new FormData();
                formDataS.append("userNameorEmail", Semail);
                formDataS.append("otp", otp);

                const enterOTPReq = await fetch(
                  `/api/auth/login/forgotpwd/verify`,
                  {
                    method: "POST",
                    body: formDataS,
                  }
                );

                const enterOTPReqResult = await enterOTPReq.json();

                if (enterOTPReq.ok && enterOTPReqResult.success) {
                  const redirectMap = {
                    A: "/Admin",
                    D: "/Doctor",
                    P: "/User",
                  };

                  return router.replace(redirectMap[enterOTPReqResult.role]);
                } else {
                  return Swal.fire({
                    title: "Error!",
                    text: `Entered OTP is incorrect! Try again later`,
                    icon: "error",
                    confirmButtonColor: "#993949",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      router.push("/");
                    }
                  });
                }
              },
            });
          } else if (!sendOTPResult.success && sendOTPResult.why === "WRONG") {
            Swal.showValidationMessage(
              "Please Enter the correct Email address or Password."
            );
          }
        } catch (error) {
          Swal.showValidationMessage(`
        Request failed: ${error}
      `);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };
  return (
    <div className="flex justify-center items-center h-screen w-full bg-[#ffffff]">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-[400px] h-[300px] border-1 border-black flex flex-col justify-center items-center text-[#000000] gap-[10px]"
      >
        <h1 className="font-[30px]">Login Page</h1>

        <input
          type="text"
          placeholder="Username or email"
          name="username"
          className="border-1 border-black rounded-[5px] h-[30px] w-[300px] pl-[10px]"
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="border-1 border-black rounded-[5px] h-[30px] w-[300px] pl-[10px]"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
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
            onClick={handleLogin}
          >
            Login
          </button>
        )}

        <button
          className="text-[#082c66] text-[14px] md:text-[16px] text-center md:text-left md:pl-[1vw] transition duration-300 hover:scale-105 hover:text-[#5388cf] cursor-pointer"
          onClick={handelingForgotPwd}
        >
          Forgotten Password?
        </button>

        <p>
          Don't Have an account?{" "}
          <Link href="/auth/Signup" className="text-[#5388cf]">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default page;
