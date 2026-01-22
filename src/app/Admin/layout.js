import { Poppins } from "next/font/google";

const poppa = Poppins({
  weight: ["100","200","400","600", "700"],
  subsets: ["latin"],
});

export default async function AdminLayout({children}) {
  return (
      <div
        className={poppa.className}
      >
        {children}
      </div>
  );
}