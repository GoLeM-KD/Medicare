import { Poppins } from "next/font/google";
import NavBar from "./component/Navbar";

const poppa = Poppins({
  weight: ["100", "200", "400", "600", "700"],
  subsets: ["latin"],
});

export default async function UserLayout({ children }) {

  return (
    
    <div>
      <div className="fixed top-0 z-90 w-full">
        <NavBar />
      </div>
      {children}
      
    </div>

  );
}
