import { Button, SignIn } from '@/components'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Sign In - Unity',
    description: 'Sign In to Unity.',
}

export default function SignInPage() {
    return (
        <section className="relative flex items-center justify-center w-full h-screen py-8 mx-auto overflow-hidden lg:py-0">
            <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center justify-center h-full max-w-2xl gap-20 mx-auto">
                    <div className="absolute flex items-center justify-between w-full px-5 top-5">
                        <Link href="/">
                            <Button variant="ghost">
                                <span>Home</span>
                            </Button>
                        </Link>
                        <Link href="/signup">
                            <Button variant="ghost">
                                <span>Sign Up</span>
                            </Button>
                        </Link>
                    </div>
                    <SignIn />
                </div>
            </div>
        </section>
    )
}
