
"use client"
import { signIn, useSession } from 'next-auth/react'
import React from 'react'

const LoginButton = () => {
    const session = useSession();
    console.log(session)
    return (
        <div>
            <button onClick={() => signIn("google")}>login with google</button>
        </div>
    )
}

export default LoginButton