import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import TextField from "@material-ui/core/TextField";

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
            await resetPassword(emailRef.current.lastChild.firstChild.value);
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
            <Navbar></Navbar>
            <div>
                <div>
                    <h2 className="text-center mb-4">Password Reset</h2>
                    {error && error}
                    {message && message}
                    {/* {currentUser.email} */}
                    <form action="" onSubmit={handleSubmit}>
                        <div id="email">
                            <TextField
                                id="standard-basic"
                                type="email"
                                required
                                ref={emailRef}
                                label="Email"
                            />
                        </div>
                        <button type="submit" disabled={loading}>
                            Reset Password
                        </button>
                    </form>
                    <div className="mt-4 ">
                        <Link to="/login">Log in</Link>
                    </div>
                </div>
            </div>
            <div className="mt-2 ">
                Need an account ? <Link to="/signup">Sign up</Link>
            </div>
        </>
    );
}
