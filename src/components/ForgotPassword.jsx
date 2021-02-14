import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Login() {
    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setMessage("");
            setError("");
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage("Check your inbox for further instructions!");
        } catch {
            setError(
                "We don't have any user with this email... try checking your email"
            );
        }
        setLoading(false);
    }

    return (
        <>
            <div>
                <div>
                    <h2 className="text-center mb-4">Password Reset</h2>
                    {error && error}
                    {message && message}
                    {/* {currentUser.email} */}
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

                        <button
                            className="w-full"
                            type="submit"
                            disabled={loading}
                        >
                            Reset Password
                        </button>
                    </form>
                    <div className=" w-full text-center mt-4 ">
                        <Link to="/login">Log in</Link>
                    </div>
                </div>
            </div>
            <div className=" w-full text-center mt-2 ">
                Need an account ? <Link to="/signup">Sign up</Link>
            </div>
        </>
    );
}
