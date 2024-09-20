import Navbar from "@/component/navbar";
import Sidebar from "@/component/sideBar";
import { AuthProvider } from "@/Context/AuthContext";
import SidebarProvider from "@/Context/sideBarContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {

  return (
    <SidebarProvider>
    <AuthProvider>
      <Navbar />
      <Sidebar />
      <Component {...pageProps} />
    </AuthProvider>
  </SidebarProvider>
  );
}
