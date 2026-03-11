// app/Admin/page.js


export default async function Page() {

  return (
    <div>
      <div className="flex-col p-4 flex items-center justify-center w-full gap-5 auto md:flex-row">

        {/* Search Bar */}
        <div id="search-bar" className="flex items-center gap-2 w-auto md:w-auto " >
          <input type="text" placeholder="Search..." className="w-auto p-2 border border-gray-300 rounded-full "/>
        </div>

        {/* Filter Options */}
        <div className="flex flex-row p-4 items-center justify-center w-full gap-4 md:justify-start md:w-auto" id="filter-options" >
          <input type="checkbox" id="patients" value="Patients" defaultChecked ></input>
          <label for="patients">Patients</label>

          <input type="checkbox" id="doctors" value="Doctors"></input>
          <label for="doctors">Doctors</label>

          <input type="checkbox" id="admins" value="Admins"></input>
          <label for="admins">Admins</label>
        </div>      
      </div>




      <div className="p-4 grid grid-cols-1  lg:grid-cols-3 gap-4 md:grid-cols-2">
        {/* users */}
        <div className="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-2xl space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
          <img className="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0" src="/no-profile.png" alt="Profile Pic"/>
          <div className="text-center space-y-2 sm:text-left">
            <div className="space-y-0.5">
              <p className="text-lg text-black font-semibold">FirstName LastName</p>
              <p className="text-slate-500 font-medium">Patient</p>
            </div>
          </div>
        </div>
      </div>




    </div>
  )
}
