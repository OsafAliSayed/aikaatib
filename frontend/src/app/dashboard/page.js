"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
    const router = useRouter()

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold">Welcome to AI Kaatib</h1>
                <p className="text-gray-600">You’re successfully signed in.</p>
                <div className="flex flex-col gap-4">
                    <Button 
                        onClick={() => router.push('/generate-blog')}
                        className="bg-purple-600 hover:bg-purple-700"
                    >
                        Generate Blog
                    </Button>
                </div>
            </div>
        </div>
    )
}
