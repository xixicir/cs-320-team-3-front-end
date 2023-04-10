"use client"

import { deleteAuthToken } from "../auth"
import { useRouter } from 'next/navigation';

export default function Page() {
    deleteAuthToken()
    const router = useRouter()
    router.push("/")
}