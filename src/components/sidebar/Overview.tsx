"use client";

import { Session } from 'next-auth';
import { FC, useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const data = [
    {
        name: "Jan",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Feb",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Mar",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Apr",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "May",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Jun",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
];

interface OverviewProps {
    session: Session | null;
    getCount: (days: number, userId: string) => Promise<{
        day: string;
        count: number | null;
    }[]>;
}

const Overview: FC<OverviewProps> = ({
    session,
    getCount
}) => {

    const [data, setData] = useState<{ day: string; count: number | null; }[]>([]);

    console.log("data", data);

    console.log("count>>>", getCount(7, session?.user.id!));

    const days = 7;

    useEffect(() => {
        if (session?.user) {
            try {
                getCount(days, session?.user?.id!)
                    .then((data) => {
                        setData(data);
                        console.log("data", data);
                    })
                    .catch((error) => {
                        console.error('Error fetching profile view counts:', error);
                    });
            } catch (error) {
                console.log("error getting overview data");
            }
        }
    }, [days, session?.user?.id, getCount, session?.user]);

    return (
        <div className="w-full p-4 lg:py-8">
            <BarChart data={data}>
                <XAxis
                    dataKey="day"
                    stroke="#888888"
                />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="count" fill="#000" radius={[4, 4, 0, 0]} />
            </BarChart>
        </div>
    )
}

export default Overview
