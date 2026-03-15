"use client";
import { useEffect, useState } from "react";
import { Mail, Stethoscope, FileText, Save } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [currentDetails, setCurrentDetails] = useState({});

  // Handeling Loading..
  const [isLoading, setLoading] = useState(false);
  const [isButtonLoading, setButtonLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const getCurrentDetails = async () => {
      setLoading(true);
      const getRequest = await fetch("../../api/doctor/profile");
      const respond = await getRequest.json();
      console.log("CURRENT DETAILS....", respond.details[0]);
      setCurrentDetails(respond.details[0]);
      setLoading(false);
    };

    getCurrentDetails();
  }, []);

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = async () => {
    setButtonLoading(true);
    console.log("CHANGD...", currentDetails);
    const formData = new FormData();
    formData.append("Fname", currentDetails.FirstName);
    formData.append("Lname", currentDetails.LastName);
    formData.append("Email", currentDetails.Email);
    formData.append("pn", currentDetails.PhoneNo);
    formData.append("spcl", currentDetails.Spcl);
    formData.append("Ln", currentDetails.LicenseNo);
    formData.append("yop", currentDetails.YearsOfEXP);
    formData.append("edu", currentDetails.Edu);
    formData.append("desc", currentDetails.DcrDesc);

    const PUTRequest = await fetch("../../api/doctor/profile", {
      method: "PUT",
      body: formData,
    });

    const respondPUT = await PUTRequest.json();

    if (respondPUT.success) {
      setButtonLoading(false);
      setIsEditing(false);
      return router.push("/Doctor/Profile");
      

    } else if (!respondPUT.success) {
      setButtonLoading(false);
      setIsEditing(false);
      Swal.fire({
        title: "Oops!",
        text: `Something went wrong! \n Error: ${respondPUT.ERROR}`,
        icon: "error",
      });
      return
    }
  };
  return (
    <div className="max-w-4xl mx-auto pr-[10px] md:pr-0 pl-[10px] md:pl-0 mb-[30px] mt-[30px] min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Doctor Profile
        </h1>
        <p className="text-gray-600">
          Manage your personal and professional information
        </p>
      </div>
      {!isLoading ? (
        <div className="bg-white border-2 border-blue-100 rounded-xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-blue-600 text-white px-8 py-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <Image
                  src={currentDetails.ImageURL || "/no-profile.png"}
                  alt="profileImage"
                  width={80}
                  height={80}
                  className="w-20 h-20 text-blue-600 rounded-full"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  {currentDetails.FirstName}
                </h2>
                <p className="text-blue-100">{currentDetails.LastName}</p>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-8">
            {!isEditing ? (
              // View Mode
              <div className="space-y-6">
                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-blue-600" />
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">
                        Email Address
                      </p>
                      <p className="font-medium text-gray-900">
                        {currentDetails.Email}
                      </p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Phone Number</p>
                      <p className="font-medium text-gray-900">
                        {currentDetails.PhoneNo || "Not-Updated"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-blue-600" />
                    Professional Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Specialty</p>
                      <p className="font-medium text-gray-900">
                        {currentDetails.Spcl || "Not-Updated"}
                      </p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">
                        License Number
                      </p>
                      <p className="font-medium text-gray-900">
                        {currentDetails.LicenseNo || "Not-Updated"}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">
                        Years of Experience
                      </p>
                      <p className="font-medium text-gray-900">
                        {currentDetails.YearsOfEXP || "Not-Updated"}
                      </p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Education</p>
                      <p className="font-medium text-gray-900">
                        {currentDetails.Edu || "Not-Updated"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Professional Bio
                  </h3>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-gray-900">
                      {currentDetails.DcrDesc || "No description"}
                    </p>
                  </div>
                </div>

                {/* Edit Button */}
                <div className="flex justify-end pt-4">
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Edit Profile
                  </Button>
                </div>
              </div>
            ) : (
              // Edit Mode
              <div className="space-y-6">
                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-blue-600" />
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="Fname">First Name</Label>
                      <Input
                        type="text"
                        id="Fname"
                        className="mt-1"
                        onChange={(e) =>
                          setCurrentDetails((prev) => ({
                            ...prev,
                            FirstName: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="Lname">Second Name</Label>
                      <Input
                        type="text"
                        id="Lname"
                        className="mt-1"
                        onChange={(e) =>
                          setCurrentDetails((prev) => ({
                            ...prev,
                            LastName: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        onChange={(e) =>
                          setCurrentDetails((prev) => ({
                            ...prev,
                            Email: e.target.value,
                          }))
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        className="mt-1"
                        onChange={(e) =>
                          setCurrentDetails((prev) => ({
                            ...prev,
                            PhoneNo: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-blue-600" />
                    Professional Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="specialty">Specialty</Label>
                      <Input
                        id="specialty"
                        className="mt-1"
                        type="text"
                        onChange={(e) =>
                          setCurrentDetails((prev) => ({
                            ...prev,
                            Spcl: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="license">License Number</Label>
                      <Input
                        id="license"
                        className="mt-1"
                        type="text"
                        onChange={(e) =>
                          setCurrentDetails((prev) => ({
                            ...prev,
                            LicenseNo: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Input
                        id="experience"
                        type="number"
                        className="mt-1"
                        onChange={(e) =>
                          setCurrentDetails((prev) => ({
                            ...prev,
                            YearsOfEXP: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="education">Education</Label>
                      <Input
                        id="education"
                        className="mt-1"
                        type="text"
                        onChange={(e) =>
                          setCurrentDetails((prev) => ({
                            ...prev,
                            Edu: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Professional Bio
                  </h3>
                  <Textarea
                    rows={4}
                    className="resize-none"
                    onChange={(e) =>
                      setCurrentDetails((prev) => ({
                        ...prev,
                        DcrDesc: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleChange}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-[25px]">Loading....</p>
      )}
      {/* Profile Card */}
    </div>
  );
}
