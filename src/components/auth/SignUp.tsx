"use client";

import { AuthForm } from "@/components";
import Image from "next/image";

import Link from "next/link";

const SignUp = () => {

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
                    Sign Up to Unity
                </h1>
                <p className='max-w-xs mx-auto text-sm'>
                    Hey, Create an account to start sharing your posts with your friends.
                </p>

                <AuthForm />

                <p className='px-8 text-sm text-center text-zinc-700'>
                    Already a Member?{' '}
                    <Link href='/signin' className='text-sm font-medium transition hover:text-zinc-900'>
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default SignUp
