import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signUp, currentUser } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords don't match!");
        }
        try {
            setError("");
            setLoading(true);
            signUp(emailRef.current.value, passwordRef.current.value);
        } catch {
            setError("Failed to create account!");
        }
        setLoading(false);
    }

    return (
        <>
            <div>
                <div>
                    <h2 className="text-center mb-4">Sign up</h2>
                    {error && <span>{error}</span>}
                    {currentUser.email}
                    <form action="" onSubmit={handleSubmit}>
                        <div id="email">
                            <label htmlFor="">Email</label>
                            <input
                                type="email"
                                required
                                ref={emailRef}
                                className="border-black border-opacity-100 border-4"
                            />
                        </div>
                        <div id="password">
                            <label htmlFor="">Password</label>
                            <input type="password" required ref={passwordRef} />
                        </div>
                        <div id="passwordConfirm">
                            <label htmlFor="">Password confirmation</label>
                            <input
                                type="password"
                                required
                                ref={passwordConfirmRef}
                            />
                        </div>
                        <button
                            className="w-full"
                            type="submit"
                            disabled={loading}
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
            <div className=" w-full text-center mt-2 ">
                Already have an account ? login
            </div>
        </>
    );
}
