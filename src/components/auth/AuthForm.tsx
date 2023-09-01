'use client';

import { Button } from '@/components';
import { toast } from '@/hooks';
import { cn } from '@/lib/utils';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { FC, useState } from 'react';


interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string
}


const AuthForm: FC<AuthFormProps> = ({
    className,
    ...props
}) => {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleAuth = async () => {
        setIsLoading(true);

        try {
            await signIn('google');
        } catch (error) {
            toast({
                title: 'There was a problem.',
                description: 'There was an error signing in with Google.',
                variant: 'destructive',
            })
        } finally {
            setIsLoading(false);
            router.refresh();
            router.push('/');
        }
    };


    return (
        <div className={cn('flex justify-center my-2', className)}{...props}>
            <Button
                size='md'
                className='w-full bg-slate-900 text-slate-50 hover:bg-slate-800'
                onClick={handleAuth}
                isLoading={isLoading}
            >
                {isLoading ? null : <Image src="/svg/google.svg" alt="" width={50} height={50} className='w-4 h-4 mr-2' />}
                <span>Google</span>
            </Button>
        </div>
    )
}

export default AuthForm
