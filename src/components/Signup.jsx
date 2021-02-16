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
            <Navbar />
            <div>
                {error && (
                    <p className="mt-2 bg-red-300 px-6 py-3 rounded-md text-red-900 text-lg">
                        {error}
                    </p>
                )}
                <form
                    action=""
                    onSubmit={handleSubmit}
                    className=" flex flex-col items-center space-y-2 mt-8"
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
                            type="Password"
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
                            type="Password"
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
                <div className="mt-4 text-center">
                    Already have an account ? <Link to="/login">Log in</Link>
                </div>
            </div>
        </>
    );
}
