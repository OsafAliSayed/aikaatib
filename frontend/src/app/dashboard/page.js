"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/Navbar"

export default function DashboardPage() {
    const router = useRouter()

    const handleSignOut = () => {
        // Clear tokens or auth data here if needed

        router.push("/signin")
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold">Welcome to AI Kaatib</h1>
                <p className="text-gray-600">You’re successfully signed in.</p>
                <Button onClick={handleSignOut}>Sign Out</Button>
            </div>
        </div>
    )
}
