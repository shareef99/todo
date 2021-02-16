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
                <h2 className="mb-4">Sign up</h2>
                {error && <span>{error}</span>}
                <form action="" onSubmit={handleSubmit} className="space-y-4">
                    <div id="email">
                        <TextField
                            id="standard-basic"
                            label="Email"
                            type="email"
                            required
                            ref={emailRef}
                        />
                    </div>
                    <div id="password">
                        <TextField
                            id="standard-password-input"
                            label="Password"
                            type="Password"
                            required
                            ref={passwordRef}
                            autoComplete="current-password"
                        />
                    </div>
                    <div id="passwordConfirm">
                        <TextField
                            id="standard-password-confirm-input"
                            label="Confirm Password"
                            type="Password"
                            required
                            ref={passwordConfirmRef}
                            autoComplete="current-password"
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
                <div className="mt-4">
                    Already have an account ? <Link to="/login">Log in</Link>
                </div>
            </div>
        </>
    );
}
