"use client";
import { SessionProvider } from "next-auth/react";

const NextAuthProviderWraper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthProviderWraper;
