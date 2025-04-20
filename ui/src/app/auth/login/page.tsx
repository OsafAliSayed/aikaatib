'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Pen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    async function onSubmit(event: React.FormEvent) {
        event.preventDefault();
        setIsLoading(true);

        // Add your authentication logic here
        setTimeout(() => {
            setIsLoading(false);
            router.push('/');
        }, 1000);
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center p-4"
            style={{
                background:
                    'radial-gradient(circle at center, rgba(76, 29, 149, 0.5) 0%, rgba(0, 0, 0, 1) 100%)',
            }}
        >
            <Card className="w-full max-w-md bg-black/40 backdrop-blur-xl border-purple-800/30">
                <CardHeader className="space-y-2 text-center">
                    <div className="flex items-center justify-center space-x-2 text-purple-300">
                        <Pen className="w-6 h-6" />
                        <span className="text-xl font-bold">AIKaatib</span>
                    </div>
                    <CardTitle className="text-2xl font-bold text-purple-100">
                        Welcome back
                    </CardTitle>
                    <CardDescription className="text-purple-300">
                        Enter your email to sign in to your account
                    </CardDescription>
                </CardHeader>
                <form onSubmit={onSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-purple-200">
                                Email
                            </Label>
                            <Input
                                id="email"
                                placeholder="m@example.com"
                                type="email"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                                disabled={isLoading}
                                required
                                className="bg-black/30 text-purple-100 placeholder:text-purple-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-purple-200">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                disabled={isLoading}
                                required
                                className="bg-black/30 text-purple-100"
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </Button>
                        <div className="text-sm text-center text-purple-400">
                            Don&apos;t have an account?{' '}
                            <Link
                                href="/auth/signup"
                                className="underline underline-offset-4 hover:text-purple-300"
                            >
                                Sign up
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
