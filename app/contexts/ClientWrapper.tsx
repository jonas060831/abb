'use client';

import RsvpButton from "@/ui/RsvpButton/RsvpButton";
import { AuthProvider } from "./AuthContext";


export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <RsvpButton />
    </AuthProvider>
  );
}
