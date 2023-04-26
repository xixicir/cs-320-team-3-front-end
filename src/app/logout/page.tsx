"use client";

import { useRouter } from "next/navigation";
import { deleteAuthToken } from "../auth";
import React, { useEffect, useState } from "react";

const LogoutPage = () => {
  
  const router = useRouter();

  useEffect(() => {
    deleteAuthToken();
    router.push("/");
  }, []);

  return (<div>

  </div>)
}

export default function Page() {
  return <LogoutPage />
}
