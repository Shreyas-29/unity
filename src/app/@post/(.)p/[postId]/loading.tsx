import React from 'react';
import { Dialog, DialogContent } from '@/components';

const Loading = () => {
    return (
        <Dialog>
            <DialogContent className="z-[200]">
                <div className="w-full h-full max-w-5xl max-h-[550px] rounded-xl bg-white flex items-center justify-center">
                    <div className="grid grid-cols-12 w-full h-full rounded-xl gap-5">
                        <div className="h-full w-full col-span-7 rounded-lg bg-slate-200/50 animate-pulse"></div>
                        <div className="h-full w-full col-span-5 flex items-start flex-col justify-between">
                            <div className="space-y-16">
                                <div className="flex items-center justify-start w-full">
                                    <div className="w-10 h-10 rounded-full">
                                        <div className="w-10 h-10 rounded-full bg-slate-200/50 animate-pulse"></div>
                                    </div>
                                    <div className="space-y-1 pl-3">
                                        <div className="w-40 h-3 rounded-[4px] bg-slate-200/50 animate-pulse"></div>
                                        <div className="w-28 h-2 rounded-[4px] bg-slate-200/50 animate-pulse"></div>
                                    </div>
                                </div>
                                <div className="space-y-5">
                                    <div className="space-y-1 w-full ml-3">
                                        <div className="w-36 h-2.5 rounded-sm bg-slate-200/50 animate-pulse"></div>
                                        <div className="w-24 h-2 rounded-sm bg-slate-200/50 animate-pulse"></div>
                                    </div>
                                    <div className="space-y-1 w-full ml-3">
                                        <div className="w-36 h-2.5 rounded-sm bg-slate-200/50 animate-pulse"></div>
                                        <div className="w-24 h-2 rounded-sm bg-slate-200/50 animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2 w-full">
                                <div className="flex items-center justify-start w-full gap-4">
                                    <div className="w-6 h-6 bg-slate-200/50 animate-pulse rounded-full"></div>
                                    <div className="w-6 h-6 bg-slate-200/50 animate-pulse rounded-full"></div>
                                    <div className="w-6 h-6 bg-slate-200/50 animate-pulse rounded-full"></div>
                                </div>
                                <div className="w-9/12 h-3 bg-slate-200/50 animate-pulse rounded"></div>
                                <div className="w-1/2 h-3 bg-slate-200/50 animate-pulse rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default Loading
