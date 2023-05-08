"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getManagerData, getUserData, isLoggedIn } from "../auth";

export default function Page() {
  const router = useRouter();
  const [managerData, setManagerData] = useState<any>(null);
  useEffect(() => {
    async function go() {
      if (!isLoggedIn()) {
        router.push("/login");
        return;
      }
      const managerData = await getManagerData();
      setManagerData(managerData);
    }
    go();
  }, []);

  if (managerData === null) {
    return <div>Loading...</div>;
  }

  return <div>{JSON.stringify(managerData)}</div>
}