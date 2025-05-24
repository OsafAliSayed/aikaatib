"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { generateBlog } from "@/lib/api"
import { isAuthenticated } from "@/lib/auth"

export default function GenerateBlogPage() {
    const [title, setTitle] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [generatedContent, setGeneratedContent] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()
    
    // Double check authentication on client side
    useEffect(() => {
        if (!isAuthenticated()) {
            router.push("/signin")
        }
    }, [router])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        try {
            const data = await generateBlog(title)
            setGeneratedContent(data.content)
        } catch (err) {
            setError(err.message || "An error occurred while generating the blog")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen p-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Generate Blog</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="title">Blog Title</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter a title for your blog post"
                                disabled={isLoading}
                                required
                            />
                        </div>
                        <Button type="submit" disabled={isLoading} className="w-full">
                            {isLoading ? "Generating..." : "Generate Blog"}
                        </Button>
                    </form>

                    {error && (
                        <p className="text-red-500 text-sm">{error}</p>
                    )}

                    {generatedContent && (
                        <div className="mt-8">
                            <Label>Generated Content</Label>
                            <Textarea
                                value={generatedContent}
                                onChange={(e) => setGeneratedContent(e.target.value)}
                                className="min-h-[400px] font-mono"
                            />
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
