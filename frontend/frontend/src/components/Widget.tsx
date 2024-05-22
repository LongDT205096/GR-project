'use client'
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';

interface Tab {
    name: string;
    url: string;
}

const Widget = () => {
    const [selectedTab, setSelectedTab] = useState('Overview');
    const [underlineStyle, setUnderlineStyle] = useState<React.CSSProperties>({});
    const tabs: Tab[] = [
        { name: 'Overview', url: '/myspace/overview' },
        { name: 'Lists', url: '/myspace/lists' },
        { name: 'Ratings', url: '/myspace/ratings' },
        { name: 'Watchlist', url: '/myspace/mywatchlist' }
    ];
    const tabRefs = useRef<(HTMLAnchorElement | null)[]>([]);

    useEffect(() => {
        const currentIndex = tabs.findIndex(tab => tab.name === selectedTab);
        const currentTab = tabRefs.current[currentIndex];
        if (currentTab) {
            setUnderlineStyle({
                left: currentTab.offsetLeft,
                width: currentTab.clientWidth
            });
        }
    }, [selectedTab]);

    return (
        <div>
            <div className="bg-white p-3 border-t-4 border-green-400">
                <div className="flex items-center space-x-4">
                    <div>
                        <h1 className="text-zinc-700 text-2xl font-bold">helloworld!</h1>
                        <p className="text-zinc-700">Member since March 2024</p>
                    </div>
                </div>
                <div className="flex space-x-8 mt-4">
                    <div className="text-center">
                        <div className="text-zinc-700 text-2xl font-bold">0%</div>
                        <p className="text-zinc-700">Average Movie Score</p>
                    </div>
                </div>
            </div>
            <div className="bg-white dark:bg-zinc-800 p-4">
                <div className="relative flex justify-center items-center border-b border-zinc-300 dark:border-zinc-700 pb-2">
                    <div className="flex space-x-4">
                        {tabs.map((tab, index) => (
                            <Link
                                key={tab.name}
                                href={tab.url}
                                ref={(el: HTMLAnchorElement | null) => {tabRefs.current[index] = el}}
                                onClick={() => {
                                    setSelectedTab(tab.name);
                                }}
                                className={`tab-link text-zinc-700 dark:text-zinc-300 hover:text-teal-500 ${selectedTab === tab.name ? 'active' : ''
                                    }`}
                            >
                                {tab.name}
                            </Link>
                        ))}
                    </div>
                    <div className="underline" style={underlineStyle}></div>
                </div>
            </div>
        </div>
    );
};

export default Widget;
