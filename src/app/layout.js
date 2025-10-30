import { Margarine, Poppins } from "next/font/google";

import Foot from "../compontents/Footer";
import NavBar from "./component/Navbar";

const poppa = Poppins({
  weight: ["100", "200", "400", "600", "700"],
  subsets: ["latin"],
});

export default async function UserLayout({ children }) {
  return (
    <html>
      <body className={poppa.className}>
        <div>
          <NavBar />
          {children}
          <Foot />
        </div>
      </body>
    </html>
  );
}
