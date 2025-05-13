"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { login } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SignInPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()      
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        try {
            const data = await login({ username, password })
            
            if (data.access && data.refresh) {
                // Small delay to ensure tokens are stored before navigation
                setTimeout(() => {
                    router.push("/dashboard")
                }, 100)
            } else {
                setError("Invalid credentials")
            }
        } catch (err) {
            setError(err.message || "An error occurred during login")
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-center text-2xl">Sign In</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <Button type="submit" className="w-full">Sign In</Button>
                    </form>
                    <p className="text-sm text-center mt-4">
                        Don't have an account?{" "}
                        <Link href="/signup" className="text-blue-600 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
