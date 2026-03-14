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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-t from-[#749bc2] to-[#f7f4eb]">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-[350px] h-[400px] bg-white rounded-2xl shadow-xl flex flex-col justify-center items-center text-[#000000] gap-[10px]"
      >
        <h1 className="text-2xl font-bold text-center text-dark blue-800 mb-6">Login</h1>

        <input
          type="text"
          placeholder="Username or email"
          name="username"
          className="border-3 border-[#749bc2] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-dark-blue"
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="border-3 border-[#749bc2] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-dark-blue"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />

        {isLoading ? (
          <button
            type="button"
            className="w-[150px] bg-[#749bc2] hover:bg-[#2b376b] text-white font-bold p-2 rounded-lg transition"
          >
            Loading...
          </button>
        ) : (
          <button
            type="button"
            className="w-[150px] bg-[#749bc2] hover:bg-[#2b376b] text-white font-bold p-2 rounded-lg transition"
            onClick={handleLogin}
          >
            Login
          </button>
        )}

        <button
          className="text-sm text-dark blue-500 hover:underline text-right"
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
