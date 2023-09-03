import Image from 'next/image'

const Loader = () => {
    return (
        <div className="flex items-center justify-center w-full h-screen bg-white/50 relative backdrop-blur-3xl z-[1000]">
            <div className="flex items-center justify-center w-full h-full">
                <Image
                    src="/icons/logo.svg"
                    alt=""
                    width={500}
                    height={500}
                    className="w-12 h-12 object-cover"
                />
                <div className="absolute inset-x-0 bottom-5 flex flex-col items-center justify-center w-full mb-10 sm:pb-0">
                    <Image
                        src="/icons/unity.svg"
                        alt=""
                        width={500}
                        height={500}
                        className="w-auto h-8 object-cover"
                    />
                    <div className="text-base text-center mx-auto w-full mt-1.5 text-slate-500">
                        from <span className="font-bold text-slate-900">
                            Shreyas
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loader
