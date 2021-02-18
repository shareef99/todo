import React, { useRef, useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import { TextField, Button } from "@material-ui/core";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login, currentUser } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(
                emailRef.current.lastChild.firstChild.value,
                passwordRef.current.lastChild.firstChild.value
            );
            history.push("/todos");
        } catch {
            setError("Failed to log in!");
        }
        setLoading(false);
    }

    useEffect(() => {
        if (currentUser) {
            history.push("/todos");
            alert(`You are already login\nEmail: ${currentUser.email}`);
        }
    }, []);

    return (
        <>
            <section className="flex bg-white-light flex-col h-screen">
                <Navbar />
                <div className="m-auto">
                    <h2 className="text-black text-center text-xl font-bold m-4">
                        Log in to Todos
                    </h2>
                    <div className="flex flex-col items-center border border-black rounded-md w-72 m-auto bg-white text-black mb-8">
                        {error && (
                            <p className="mt-2 bg-red-300 px-6 py-3 rounded-md text-red-900 text-lg">
                                {error}
                            </p>
                        )}
                        <form
                            action=""
                            autoComplete="off"
                            onSubmit={handleSubmit}
                            className="flex flex-col space-y-2 items-center w-64 self-center mt-6"
                        >
                            <div id="email" className="w-full">
                                <TextField
                                    id="standard-basic"
                                    type="email"
                                    required
                                    ref={emailRef}
                                    className="w-full"
                                    placeholder="Email"
                                    margin="dense"
                                    size="medium"
                                    variant="outlined"
                                />
                            </div>
                            <div id="password" className="w-full">
                                <TextField
                                    className="w-full"
                                    id="standard-password-input"
                                    type="password"
                                    required
                                    ref={passwordRef}
                                    placeholder="Password"
                                    margin="dense"
                                    size="medium"
                                    variant="outlined"
                                />
                            </div>
                            <div>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={loading}
                                >
                                    Log In
                                </Button>
                            </div>
                        </form>
                        <hr className="h-1 w-64 border-black mt-4" />
                        <div>
                            <div className="mt-4 text-center">
                                <Link
                                    to="/forgot-password"
                                    className="text-blue font-semibold"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="my-2 text-center">
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
                </div>
            </section>
        </>
    );
}
