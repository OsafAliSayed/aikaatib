"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { login } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Navbar from "@/components/common/navbar"

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
        <main className="min-h-screen bg-gradient-to-br from-background to-background/80 overflow-hidden">
            <div className="relative z-10">
                <Navbar />
                {/* sign in form */}
                <div className="min-h-screen flex items-center justify-center bg-background p-4">
                    <Card className="w-full max-w-sm border border-border bg-card shadow-lg">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-center text-2xl font-bold">Sign In</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div className="space-y-2">
                                    <Label htmlFor="username" className="text-sm font-medium">Username</Label>
                                    <Input
                                        id="username"
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="bg-input border-input"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="bg-input border-input"
                                        required
                                    />
                                </div>
                                {error && <p className="text-destructive text-sm">{error}</p>}
                                <Button
                                    type="submit"
                                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                                >
                                    Sign In
                                </Button>
                            </form>
                            <p className="text-sm text-center mt-4 text-muted-foreground">
                                Don't have an account?{" "}
                                <Link href="/signup" className="text-purple-400 hover:text-purple-300 hover:underline transition-colors">
                                    Sign Up
                                </Link>
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Background particle effect */}
            <div className="fixed inset-0 z-0 opacity-30">
                <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-500/30 rounded-full blur-3xl"></div>
                <div className="absolute top-1/3 -right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-40 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
            </div>
        </main>

    )
}
