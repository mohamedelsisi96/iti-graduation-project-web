"use client";

import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar/page";

export default function NavbarWrapper() {
  const pathname = usePathname();
  //   const buyerPathRegex = /^\/buyer\/\d+$/;
  //   const buyerPaths = ["/buyer", "/buyer/dashboard", "/buyer/courses"];

  //   const isBuyerPath =
  //     buyerPaths.includes(pathname) || buyerPathRegex.test(pathname);
  const isBuyerPath = pathname.startsWith("/buyer");
  return isBuyerPath ? "" : <Navbar />;
}
