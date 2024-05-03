"use client"

import Notlogin from '@/components/Notlogin';
import MySpace from '@/components/MySpace';
import { checkAuthenticated } from '@/actions/auth';
import { useState, useEffect } from 'react';

const MySpacePage = () => {
    const [user, setUser] = useState(false);
    useEffect(() => { const fetchData = async () => {
        const isAuthenticated = await checkAuthenticated();
        setUser(isAuthenticated as boolean);
    };  
        fetchData();
    }, []);

    return (
        <div className='h-[100vh]  w-full overflow-hidden'>
            { user ?(<MySpace/>):(<Notlogin/>)}
        </div>
    )
}

export default MySpacePage;
