import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function Login() {
    const emailRef = useRef();
    const { resetPassword, currentUser } = useAuth();
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
            <section className="flex bg-white-light flex-col h-screen">
                <Navbar />
                <div className="m-auto max-w-95">
                    <h2 className="text-black text-center text-xl font-bold m-4">
                        Forgot password? No worries!
                    </h2>
                    <div className="flex flex-col items-center border-4 border-white shadow-lg rounded-md w-72 max-w-95 m-auto bg-white text-black mb-8">
                        {error && (
                            <p className="mt-4 bg-red-300 px-6 py-3 rounded-md text-red-900 text-lg">
                                {error}
                            </p>
                        )}
                        {message && (
                            <p className="mt-2 bg-red-300 px-6 py-3 rounded-md text-red-900 text-lg">
                                {message}
                            </p>
                        )}
                        <form
                            action=""
                            autoComplete="off"
                            onSubmit={handleSubmit}
                            className="flex flex-col space-y-2 items-center w-64 self-center my-4 max-w-95"
                        >
                            <div id="email">
                                <TextField
                                    className="w-full"
                                    id="standard-basic"
                                    type="email"
                                    required
                                    margin="dense"
                                    size="medium"
                                    ref={emailRef}
                                    placeholder="Email"
                                    variant="outlined"
                                />
                            </div>
                            <Button
                                variant="contained"
                                type="submit"
                                disabled={loading}
                            >
                                Reset
                            </Button>
                        </form>
                        <hr className="h-1 w-64 border-black mt-4" />
                        <div className="mt-4 text-center">
                            <Link
                                to="/login"
                                className="text-blue font-semibold"
                            >
                                Log in
                            </Link>
                        </div>
                        <div className="my-4 text-center">
                            Need an account?{" "}
                            <Link
                                to="/signup"
                                className="text-blue font-semibold"
                            >
                                Sign up
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
