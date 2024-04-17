"use client"

import Notlogin from '@/components/Notlogin';
import ProfilePage from '@/components/ProfilePage';
import { checkAuthenticated } from '@/actions/auth';
import { useState, useEffect } from 'react';

const MySpace = () => {
    const [user, setUser] = useState(false);
    useEffect(() => {
        setUser(checkAuthenticated());
    }, []);

    console.log(user);
    return (
        <div className='h-[100vh]  w-full overflow-hidden'>
            { user ?(<ProfilePage/>):(<Notlogin/>)}
        </div>
    )
}

export default MySpace
