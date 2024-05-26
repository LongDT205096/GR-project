'use client';
import Link from 'next/link';
import React, { useState, useLayoutEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface Tab {
    name: string;
    url: string;
}

const Widget = () => {
    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState('Overview');
    const [underlineStyle, setUnderlineStyle] = useState<React.CSSProperties>({});
    const tabs: Tab[] = [
        { name: 'Overview', url: '/myspace/overview' },
        { name: 'Lists', url: '/myspace/lists' },
        { name: 'Ratings', url: '/myspace/ratings' },
        { name: 'Watchlist', url: '/myspace/mywatchlist' }
    ];
    const tabRefs = useRef<(HTMLDivElement | null)[]>([]);

    useLayoutEffect(() => {
        const currentTab = tabs.find(tab => tab.url === window.location.pathname);
        if (currentTab) {
            setSelectedTab(currentTab.name);
        }
    }, [tabs]);

    useLayoutEffect(() => {
        const currentIndex = tabs.findIndex(tab => tab.name === selectedTab);
        const currentTabElement = tabRefs.current[currentIndex];
        if (currentTabElement) {
            console.log(currentTabElement);
            setUnderlineStyle({
                left: currentTabElement.offsetLeft,
                width: currentTabElement.clientWidth,
                transition: 'left 0.3s ease, width 0.3s ease'
            });
        }
    }, [selectedTab]);

    const handleTabClick = (tab: Tab) => {
        setSelectedTab(tab.name);
        router.push(tab.url);
    };

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
                            <div
                                key={tab.name}
                                ref={(el) => { tabRefs.current[index] = el; }}
                                onClick={() => handleTabClick(tab)}
                                className={`tab-link cursor-pointer text-zinc-700 dark:text-zinc-300 hover:text-teal-500 ${selectedTab === tab.name ? 'active' : ''}`}
                            >
                                {tab.name}
                            </div>
                        ))}
                    </div>
                    <div className="underline" style={underlineStyle}></div>
                </div>
            </div>
        </div>
    );
};

export default Widget;
