"use client";

import React from 'react'
import { User } from "@prisma/client";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/Command";
import Image from "next/image";


interface Props {
    users: User[] | null;
}

const SearchBox = ({ users }: Props) => {
    return (
        <div className="flex flex-col max-w-full w-full mx-auto items-center justify-center pb-8">
            <Command>
                <CommandInput
                    placeholder="Search for friends..."
                    className="w-full "
                />
                <CommandList className="max-h-full">
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        {users?.map((user) => (
                            <CommandItem className="w-full">
                                <div className="flex items-center justify-start w-full">
                                    <Image
                                        src={user.image! || user.profileImage!}
                                        alt={user.username!}
                                        width={1000}
                                        height={1000}
                                        className="w-6 h-6 rounded-full"
                                    />
                                    <div className="ml-2 flex flex-col items-start">
                                        <h6 className="text-gray-900 font-medium">
                                            {user.name}
                                        </h6>
                                        <p className="text-muted-foreground text-sm">
                                            @{user.username}
                                        </p>
                                    </div>
                                </div>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </Command>
        </div>
    )
}

export default SearchBox
