import React, { useRef, useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import { TextField, Button } from "@material-ui/core";

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signUp, currentUser } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords don't match!");
        }
        try {
            setError("");
            setLoading(true);
            await signUp(
                emailRef.current.lastChild.firstChild.value,
                passwordRef.current.lastChild.firstChild.value
            );
            history.push("/todos");
        } catch {
            setError("Failed to create account!");
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
                        Welcome to Todos
                    </h2>
                    <div className="flex flex-col items-center border border-black rounded-md w-72 m-auto bg-white text-black mb-6">
                        {error && (
                            <p className="mt-2 bg-red-300 px-6 py-3 rounded-md text-red-900 text-lg">
                                {error}
                            </p>
                        )}
                        <form
                            action=""
                            onSubmit={handleSubmit}
                            className=" flex flex-col items-center space-y-2 my-4"
                        >
                            <div id="email">
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
                            <div id="password">
                                <TextField
                                    id="standard-password-input"
                                    type="password"
                                    required
                                    ref={passwordRef}
                                    autoComplete="current-password"
                                    className="w-full"
                                    placeholder="Password"
                                    margin="dense"
                                    size="medium"
                                    variant="outlined"
                                />
                            </div>
                            <div id="passwordConfirm">
                                <TextField
                                    id="standard-password-confirm-input"
                                    type="password"
                                    required
                                    ref={passwordConfirmRef}
                                    autoComplete="current-password"
                                    className="w-full"
                                    placeholder="Confirm Password"
                                    margin="dense"
                                    size="medium"
                                    variant="outlined"
                                />
                            </div>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={loading}
                            >
                                Sign Up
                            </Button>
                        </form>
                        <hr className="h-1 w-64 border-black mt-4" />
                        <div className="my-4 text-center">
                            Already have an account ?{" "}
                            <Link
                                to="/login"
                                className="text-blue font-semibold"
                            >
                                Log in
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
