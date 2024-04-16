import React from 'react';
import { getUsers } from "@/actions";
import SearchBox from "./components/SearchBox";

export default async function SearchPage() {

    const users = await getUsers();

    return (
        <div className="flex items-center justify-center w-full pt-20">
            <SearchBox users={users} />
        </div>
    )
}
