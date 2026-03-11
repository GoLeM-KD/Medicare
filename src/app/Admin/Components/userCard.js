import React from 'react'

export default function userCard() {
return (
    <div className="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-2xl space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
        <img className="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0" src="/no-profile.png" alt="Profile Pic"/>
        <div className="text-center space-y-2 sm:text-left">
            <div className="space-y-0.5">
                <p className="text-lg text-black font-semibold">
                        FirstName LastName
                </p>
                <p className="text-slate-500 font-medium">
                        Patient
                </p>
            </div>
        </div>
    </div>
  );
}