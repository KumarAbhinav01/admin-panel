"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Login from "@/components/Login";
import Cookies from "js-cookie";

export default function Home() {

  const router = useRouter();  
  useEffect(() => {
    const isLoggedIn = Cookies.get('loggedIn');
    if (!isLoggedIn) {
      router.push('/login', { scroll: false })
    } else {
      router.push('/dashboard', { scroll: false })
    }
  }, [router]);

  return (
      <Login/>
  );
}