import { Loader2 } from "lucide-react"
import React from 'react'

const Spinner = () => {
    return (
        <div className="flex items-center justify-center w-full h-screen bg-white/50 relative backdrop-blur-3xl z-[10000]">
            <Loader2 className="w-5 h-5 animate-spin" />
        </div>
    )
}

export default Spinner
