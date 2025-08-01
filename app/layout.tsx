"use client";
import "./globals.css";
import { Figtree } from "next/font/google";
import Sidebar from "./components/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import MobileGuard from "./components/MobileGuard"; // 👈 import it

const font = Figtree({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body className={font.className}>
          <ToastContainer />
          <MobileGuard>
            {" "}
            {/* 👈 wraps entire UI */}
            <div className="h-screen w-full bg-black flex">
              <div className="h-full w-1/5 md:flex-col lg:flex-col">
                <Sidebar />
              </div>
              <div className="h-full w-4/5 ml-4 m-2">{children}</div>
            </div>
          </MobileGuard>
        </body>
      </html>
    </Provider>
  );
}
