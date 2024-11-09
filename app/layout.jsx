import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import CreateEventDrawer from "@/components/createEventDrawer";

export const metadata = {
  title: "Plannr",
  description: "Scheduling the Meetings and Dates App",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
      <head>
          <link rel="icon" href="/logo1.png" type="image/png" className="border-radius=5px" />  
        </head>
        <body className={inter.className}>
          <Header />
          <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {children}
          </main>
          <footer className="py-12 bg-blue-200 ">
            <div className=" container mx-auto px-4 text-center text-2xl  ">
              <p className="mb-5 xl:mb-0">Your Ultimate Planning Partner </p>
            </div>
          </footer>
          <CreateEventDrawer />
        </body>
      </html>
    </ClerkProvider>
  );
}
