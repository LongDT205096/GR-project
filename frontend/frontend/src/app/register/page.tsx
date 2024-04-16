'use client'
import React, { useState } from "react";
import Link from "next/link";
import request from "../../utils/users";
import axios from "axios";

import { useRouter } from "next/navigation";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://127.0.0.1:8000/';


const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [re_password, setRePassword] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("danger");

    const router = useRouter();

    async function handleSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ email, password, re_password });

        await axios.post(request.fetchRegister, body, config)
            .then(response => {
                if (response.status === 201) {
                    setMessage("Register successful.");
                    setMessageType("success");
                    router.push("/login");
                } else {
                    setMessage("Register failed.");
                    setMessageType("danger");
                }
            })
    };

    return (
        <div className="w-full h-[100vh] flex justify-center items-center">
            <div className="bg-neutral-700 p-5 w-[75%] h-3/4 flex rounded-2xl shadow-lg max-w-3xl">
                <div className="sm:flex hidden w-1/2 h-full" style={{ background: "url(./assets/img/register.jpg)", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>

                </div>
                <div className="sm:w-1/2 w-full p-2 flex flex-col justify-center items-center">
                    <form onSubmit={handleSubmit} className="text-black">
                        <input
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                            required
                        />


                        <br />

                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                            required
                        />
                        <br />
                        <input
                            type="password"
                            placeholder="Re-enter Password"
                            value={re_password}
                            onChange={(e) => {
                                setRePassword(e.target.value);
                            }}
                            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                            required
                        />
                        <br />

                        <button className="w-full block bg-black hover:bg-black/75 focus:bg-black/50 text-white font-semibold rounded-lg px-4 py-3 mt-6" type="submit">
                            Register
                        </button>
                    </form>
                    <p className="my-3">Already have account ? <Link href={'/login'} className="font-bold">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;
