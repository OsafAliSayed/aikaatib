"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { isAuthenticated } from "@/lib/auth"

export default function DashboardPage() {
    const router = useRouter()

    // Double check authentication on client side
    useEffect(() => {
        if (!isAuthenticated()) {
            router.push("/signin")
        }
    }, [router])

    return (
        <DashboardLayout></DashboardLayout>
    )
}
