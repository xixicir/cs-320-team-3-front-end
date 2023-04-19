"use client";

import { useRouter } from "next/navigation";
import { deleteAuthToken } from "../auth";

export default function Page() {
  deleteAuthToken();
  const router = useRouter();
  router.push("/");
}
