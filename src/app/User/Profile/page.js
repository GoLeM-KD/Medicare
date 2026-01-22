"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function page() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [uid, setUID] = useState("");
  const [image, setImage] = useState(null); // Because exsisting Image exsisting as a link
  const [preview, setPreviewImage] = useState(null); // to show the preview of the image to User
  const [imageUpload, setImageUpload] = useState(null);

  // Changing password section
  const [oldPassword, setOldPassword] = useState("");
  const [newPassowrd, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassowrd] = useState("");
  const [ErrorPwd, setErrorPWd] = useState("");

  // Handeling Loadings
  const [isLoadingSave, setLoadingSaving] = useState(false);

  // Loading all exsisting data
  const LoadData = async () => {
    const dataReq = await fetch("../../api/token/checkToken");
    const userData = await dataReq.json();

    console.log(userData.datas.FirstName, "NAMEEEE");
    setFirstName(userData.datas.FirstName || "");
    setLastName(userData.datas.LastName || "");
    setUserName(userData.datas.UserName || "");
    setEmail(userData.datas.Email || "");
    setImage(userData.datas.ImageURL || null);
    setUID(userData.token);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassowrd("");
    setErrorPWd("");
    setLoadingSaving(false);
  };
  // for setting up the preview
  useEffect(() => {
    if (!imageUpload) {
      setPreviewImage(null);
      return;
    }

    const previewUrl = URL.createObjectURL(image);
    setPreviewImage(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [imageUpload]);

  useEffect(() => {
    LoadData();
  }, []);

  // Handeling the submitting
  const handelingUpload = async () => {
    setLoadingSaving(true);
    const formData = new FormData();
    formData.append("fName", firstName);
    formData.append("lName", lastName);
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("uid", uid);
    formData.append("image", image);
    formData.append("Opwd", newPassowrd ? oldPassword: '');
    formData.append("Npwd", newPassowrd ? newPassowrd : '');

    Swal.fire({
      title: "Input the Password to save changes",
      input: "password",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Save",
      confirmButtonColor: "#2E7DAF",
      showLoaderOnConfirm: true,
      preConfirm: async (password) => {
        try {
          const pwdCheckReq = await fetch(
            `../../api/user/profile?uid=${uid}&pwd=${password}`
          );
          const pwdResult = await pwdCheckReq.json();

          // If password correct
          if (pwdResult.success) {
            const updateReq = await fetch(`../../api/user/profile`, {
              method: "PUT",
              body: formData,
            });

            const updateResult = await updateReq.json();

            if (updateResult.success) {
              return Swal.fire({
                title: "Saved!",
                text: "Changes have been saved.",
                icon: "success",
                confirmButtonColor: "#538648ff",
              }).then((result) => {
                if (result.isConfirmed) {
                  router.push("/User");
                }
              });
            } else if(!updateResult.success && updateResult.why === "WRONGPWD"){

              return Swal.fire({
                title: "Error!",
                text: `Incorrect old password in password change section...`,
                icon: "error",
                confirmButtonColor: "#993949",
              }).then((result) => {
                if (result.isConfirmed) {
                  LoadData();
                }
              });

            }else {
              return Swal.fire({
                title: "Error!",
                text: `Some thing went wrong...\nError: ${updateResult.Error}`,
                icon: "error",
                confirmButtonColor: "#993949",
              }).then((result) => {
                if (result.isConfirmed) {
                  LoadData();
                }
              });
            }
          } else if (!pwdResult.success && pwdResult.why === "P") {
            return Swal.fire({
              title: "Incorrect!",
              text: `Password is incorrect`,
              icon: "error",
              confirmButtonColor: "#993949",
            }).then((result) => {
              if (result.isConfirmed) {
                LoadData();
              }
            });
          } else {
            return Swal.fire({
              title: "Error!",
              text: `Something went wrong...\nError: ${pwdCheckReq.why}`,
              icon: "error",
              confirmButtonColor: "#993949",
            }).then((result) => {
              if (result.isConfirmed) {
                LoadData();
              }
            });
          }
          // End password check IF
        } catch (error) {
          Swal.showValidationMessage(`
        Request failed: ${error}
      `);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
    setLoadingSaving(false);
  };

  // Handelling forgotten password
  const handelingForgotPwd = async () => {
    Swal.fire({
      title: "Enter your Email",
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
          formData.append("email", Semail);
          formData.append("uid", uid);

          const sendOTPReq = await fetch(`../../api/otp`, {
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
                formDataS.append("email", Semail);
                formDataS.append("otp", otp);

                const enterOTPReq = await fetch(`../../api/otp/verify`, {
                  method: "POST",
                  body: formDataS,
                });

                const enterOTPReqResult = await enterOTPReq.json();

                if (enterOTPReqResult.success) {
                  return Swal.fire({
                    title: "Enter new Password",
                    html: `
                    <input type='password' placeholder="New Password" id="swl-pwd" class="swal2-input"/></br>
                    <input type='password' placeholder="Confirm Password" id="swl-Cpwd" class="swal2-input"/>
                    `,
                    showCancelButton: true,
                    confirmButtonText: "Update",
                    confirmButtonColor: "#2E7DAF",
                    showLoaderOnConfirm: true,
                    preConfirm: async () => {
                      const pwdInput = document.getElementById("swl-pwd");
                      const cpwdInput = document.getElementById("swl-Cpwd");

                      const password = pwdInput.value;
                      const cpwd = cpwdInput.value;

                      pwdInput.style.border = "";
                      cpwdInput.style.border = "";

                      if (!password || !cpwd) {
                        Swal.showValidationMessage(
                          "Both password fields are required"
                        );
                        return false;
                      }

                      if (password !== cpwd) {
                        cpwdInput.style.border = "2px solid red";
                        Swal.showValidationMessage("Passwords do not match");
                        return false;
                      }

                      if (password === cpwd) {
                        const pwdForm = new FormData();
                        pwdForm.append("Npwd", password);
                        pwdForm.append("uid", uid);

                        const updatePWDReq = await fetch(
                          `../../api/user/profile/forgotpwd`,
                          {
                            method: "POST",
                            body: pwdForm,
                          }
                        );

                        const updatePWDReqResult = await updatePWDReq.json();

                        if (updatePWDReqResult.success) {
                          return Swal.fire({
                            title: "Updated!",
                            text: "Password has been updated!",
                            icon: "success",
                            confirmButtonColor: "#538648ff",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              router.push("/User");
                            }
                          });
                        } else {
                          return Swal.fire({
                            title: "Error!",
                            text: `Something went wrong...\n ERRPR: ${updatePWDReqResult.why}`,
                            icon: "error",
                            confirmButtonColor: "#993949",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              LoadData();
                            }
                          });
                        }
                      }
                    },
                  });
                } else if (
                  !enterOTPReqResult.success &&
                  enterOTPReqResult.why === "WRONG"
                ) {
                  return Swal.fire({
                    title: "INCOORECT!",
                    text: `Entered OTP is wrong!! Session ended!`,
                    icon: "error",
                    confirmButtonColor: "#993949",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      LoadData();
                    }
                  });
                } else {
                  return Swal.fire({
                    title: "Error!",
                    text: `Oops Something went wrong...\nERROR: ${enterOTPReqResult.why}`,
                    icon: "error",
                    confirmButtonColor: "#993949",
                  }).then(async (result) => {
                    if (result.isConfirmed) {
                      const sessionEndForm = new FormData();
                      sessionEndForm.append("email");

                      await fetch(`../../api/otp/verify`, {
                        method: "PUT",
                        body: sessionEndForm,
                      });

                      LoadData();
                    }
                  });
                }
              },
            });
          } else if (!sendOTPResult.success && sendOTPResult.why === "WRONG") {
            Swal.showValidationMessage(
              "Please Enter the correct Email address."
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
    <form
      className="w-full bg-[#91C8E4] flex flex-col pt-[8vh] md:pt-[9vh] pb-[2vh] md:pb-[4vh] items-center"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="w-[300px] md:w-[67.71vw] border-b-1 border-black flex flex-col md:flex-row md:flex-wrap items-center md:justify-center gap-[2vh] md-[2vw] pt-[2vh] pb-[2vh]">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <Image
              src={imageUpload ? preview : image ? image : "/no-profile.png"}
              width={300}
              height={300}
              alt="profile-Image"
              className="w-[300px] h-[300px] rounded-full bg-[#000000]"
            />
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-[300px] bg-[#faf3cd] rounded-[15px] border-1 border-black z-90 text-[14px] md:text-[16px] flex flex-col gap-[1vh]">
            <DropdownMenuItem className="pl-[20px]">
              <Link
                href={image ? image : "/no-profile.png"}
                target="__blank"
                className="hover:font-bold"
              >
                View the Image
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-[#000000] h-px w-full" />

            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="pl-[20px]"
            >
              <label
                htmlFor="imageUpload"
                className="cursor-pointer hover:font-bold"
              >
                Change the picture
              </label>

              <input
                id="imageUpload"
                type="file"
                className="hidden"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  setImageUpload(e.target.files[0]);
                }}
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex flex-col gap-[1vh]">
          <div className="flex flex-col md:flex-row gap-[1vh] md:gap-[1vw]">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-[300px] h-[50px] border-1 border-black rounded-[5px] pl-[5px] focus:border-3 focus:border-black"
            />
            <input
              type="text"
              placeholder="Second Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-[300px] h-[50px] border-1 border-black rounded-[5px] pl-[5px] focus:border-3 focus:border-black"
            />
          </div>

          <input
            type="text"
            placeholder="User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-[300px] h-[50px] border-1 border-black rounded-[5px] pl-[5px] focus:border-3 focus:border-black"
          />
        </div>
      </div>
      {/* Second Section */}
      <div className="w-[300px] md:w-[67.71vw] border-t-1 border-black flex flex-col md:flex-row md:flex-wrap items-center md:justify-center gap-[2vh] md-[2vw] pt-[2vh] pb-[2vh]">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-[300px] md:w-[600px] h-[50px] border-1 border-black rounded-[5px] pl-[5px] focus:border-3 focus:border-black"
        />

        <div className="w-full flex flex-col gap-[1vh]">
          <p
            className={
              ErrorPwd
                ? "text-red-500 text-[14px] md:text-[16px] text-center"
                : "text-[#000000] text-[14px] md:text-[16px] text-center md:text-left md:pl-[1vw]"
            }
          >
            {ErrorPwd || "Do You Want to change the Password?"}
          </p>

          <div className="w-full flex flex-col md:flex-row md:pl-[1px] md:pr-[1px] items-center md:justify-center gap-[1vh] md:gap-[1vw]">
            <input
              type="password"
              placeholder="Old Password"
              autoComplete="new-password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-[300px] h-[50px] border-1 border-black rounded-[5px] pl-[5px] focus:border-3 focus:border-black"
            />

            <input
              type="password"
              placeholder="New Password"
              value={newPassowrd}
              onChange={(e) => {
                setNewPassword(e.target.value);
                if (!e.target.value) {
                  setErrorPWd("");
                }
              }}
              className="w-[300px] h-[50px] border-1 border-black rounded-[5px] pl-[5px] focus:border-3 focus:border-black"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassowrd(e.target.value);
                if (newPassowrd != e.target.value) {
                  setErrorPWd(
                    "New Password and Confirm Password does not match!"
                  );
                } else {
                  setErrorPWd("");
                }
              }}
              className="w-[300px] h-[50px] border-1 border-black rounded-[5px] pl-[5px] focus:border-3 focus:border-black"
            />
          </div>
        </div>

        <button
          className="text-[#082c66] text-[14px] md:text-[16px] text-center md:text-left md:pl-[1vw] transition duration-300 hover:scale-105 hover:text-[#623ef0] cursor-pointer"
          onClick={handelingForgotPwd}
        >
          Forgotten password?
        </button>
      </div>

      <div className="w-full flex flex-col md:flex-wrap md:flex-row items-center md:justify-center gap-[2vh] md:gap-[2vw]">
        {isLoadingSave ? (
          <div className="w-[300px] h-[50px] bg-[#2E7DAF] text-[#FFFFFF] cursor-not-allowed text-[16px] rounded-[5px] flex justify-center items-center">
            Loading...
          </div>
        ) : ErrorPwd || ((oldPassword && !newPassowrd) || (newPassowrd && !confirmPassword)) ? (
          <div className="w-[300px] h-[50px] bg-[#42423e] text-[#807f7a] cursor-not-allowed text-[16px] rounded-[5px] flex justify-center items-center">
            Save
          </div>
        ) : (
          <button
            type="button"
            className="w-[300px] h-[50px] bg-[#2E7DAF] text-[#FFFFFF] cursor-pointer text-[16px] rounded-[5px] transition duration-300 hover:scale-105 active:scale-100"
            onClick={handelingUpload}
          >
            Save
          </button>
        )}

        <button
          type="button"
          className="w-[300px] h-[50px] bg-[#8c3030] text-[#FFFFFF] cursor-pointer text-[16px] rounded-[5px] duration-300 hover:scale-105 active:scale-100"
          onClick={LoadData}
        >
          Clear
        </button>
      </div>
    </form>
  );
}
