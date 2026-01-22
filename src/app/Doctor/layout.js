import { Poppins } from "next/font/google";
import Navbar from './components/Navbar';

const poppa = Poppins({
  weight: ["100","200","400","600", "700"],
  subsets: ["latin"],
});

export default async function DoctorLayout({children}) {


  return (
      <div
        className={poppa.className}
      >
        <Navbar/>
        {children}
      </div>
  );
}