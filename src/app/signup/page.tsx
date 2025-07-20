import { signup } from './actions'
import Link from 'next/link'
import { BarChart } from 'lucide-react'

export default function SignupPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-muted">
            <div className="w-full max-w-sm p-6 mx-4 space-y-6 bg-background rounded-xl shadow-lg sm:p-8">
                <div className="flex flex-col items-center space-y-2 text-center">
                    <Link href="/" className="inline-flex items-center justify-center mb-2">
                        <BarChart className="w-8 h-8 text-primary" />
                    </Link>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Create an account
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your email and password to get started
                    </p>
                </div>
                <form className="space-y-4">
                    <div className="grid gap-2">
                        <label
                            htmlFor="email"
                            className="text-sm font-medium leading-none"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="name@example.com"
                            required
                            className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border rounded-md border-input ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                    </div>
                    <div className="grid gap-2">
                        <label
                            htmlFor="password"
                            className="text-sm font-medium leading-none"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border rounded-md border-input ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                    </div>
                    <div className="flex flex-col pt-2 space-y-2">
                        <button
                            formAction={signup}
                            className="inline-flex items-center justify-center w-full h-10 px-4 py-2 text-sm font-medium transition-colors rounded-md whitespace-nowrap text-primary-foreground bg-primary hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
                <p className="px-8 text-sm text-center text-muted-foreground">
                    Already have an account?{' '}
                    <Link
                        href="/login"
                        className="underline underline-offset-4 hover:text-primary"
                    >
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    )
}


