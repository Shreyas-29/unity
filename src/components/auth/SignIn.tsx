"use client";

import { AuthForm } from "@/components";
import Image from "next/image";

import Link from "next/link";

const SignIn = () => {

    return (
        <div className='container mx-auto flex w-full flex-col items-center justify-center space-y-6 sm:w-[400px]'>
            <div className='flex flex-col space-y-5 text-center'>
                <Image
                    src="/icons/logo.svg"
                    alt=""
                    width={60}
                    height={60}
                    className="object-cover w-16 h-16 mx-auto"
                />
                <h1 className='text-2xl font-semibold tracking-tight'>
                    Welcome back to Unity
                </h1>
                <p className='max-w-xs mx-auto text-sm'>
                    {/* By continuing, you are setting up a Unity account and agree to our Terms of Service and Privacy Policy. */}
                    Nice to see you, Sign In and start sharing your photos with the world.
                </p>

                <AuthForm />

                <p className='px-8 text-sm text-center text-zinc-700'>
                    New to Unity?{' '}
                    <Link href='/signup' className='text-sm font-medium transition hover:text-zinc-900'>
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default SignIn
