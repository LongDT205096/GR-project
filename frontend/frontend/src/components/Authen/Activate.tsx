'use client';
import React, { useState } from 'react';
import Link from 'next/link';

import { activate } from '../actions/auth';

const Activate = ({ uid, token }: { uid: string, token: string }) => {
    const [verified, setVerified] = useState(false);

    const handleActivate = () => {
        const res = activate(uid, token);
        setVerified(true);
    };

    if (verified) {
        return <Link href='/auth/login' />
    }

    return (
        <section className="border-red-500 min-h-screen flex items-center justify-center">
            <div className="bg-neutral-700 p-5 flex rounded-2xl shadow-lg w-[95%] mx-auto md:max-w-md items-center justify-center">
                <div className="w-full px-5">
                    <div className="mt-6 text-black">
                        <div className="text-2xl block text-white text-center">Verify account.</div>
                        <button onClick={handleActivate}
                            className="text-center w-full block bg-black hover:bg-black/75 focus:bg-black/50 text-white font-semibold rounded-lg
                px-4 py-3 mt-6"
                        >
                            Activate
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Activate;
