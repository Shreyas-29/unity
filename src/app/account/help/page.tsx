import { Button, Label, RadioGroup, RadioGroupItem, Sidebar, Switch } from '@/components';
import { getAuthSession } from '@/lib/auth';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';


export default async function UserHelpPage({
    params
}: {
    params: { userId: string }
}) {

    return (
        <div className="relative flex flex-col items-start justify-start w-full h-full p-8 mx-auto md:ml-32 lg:ml-0 lg:p-8 md:px-4">
            <div className="flex items-center justify-start w-full my-4 lg:hidden">
                <Link href="/account">
                    <Button variant="outline" size="md" className="bg-transparent">
                        <ChevronLeft className="w-5 h-5 mr-1 text-current" />
                        <span>Back</span>
                    </Button>
                </Link>
            </div>
            <div className="flex items-center justify-start w-full">
                <h2 className="text-xl font-semibold text-slate-900 lg:text-2xl">
                    Help
                </h2>
            </div>
            <div className="flex flex-col items-start justify-start w-full h-full mt-4 gap-y-4">
                <div className="flex items-center justify-between w-full py-2">
                    <Label htmlFor="help">
                        <span className="font-medium text-slate-800">
                            Help center
                        </span>
                    </Label>
                    <ChevronRight className="w-5 h-5 mr-1 text-current" />
                </div>
                <div className="flex items-center justify-between w-full py-2">
                    <Label htmlFor="account">
                        <span className="font-medium text-slate-800">
                            Account status
                        </span>
                    </Label>
                    <ChevronRight className="w-5 h-5 mr-1 text-current" />
                </div>
                <div className="flex items-center justify-between w-full py-2">
                    <Label htmlFor="privacy">
                        <span className="font-medium text-slate-800">
                            Privacy and safety
                        </span>
                    </Label>
                    <ChevronRight className="w-5 h-5 mr-1 text-current" />
                </div>
                <div className="flex items-center justify-between w-full py-2">
                    <Label htmlFor="support">
                        <span className="font-medium text-slate-800">
                            Supprt requests
                        </span>
                    </Label>
                    <ChevronRight className="w-5 h-5 mr-1 text-current" />
                </div>
            </div>
        </div>
    )
}
