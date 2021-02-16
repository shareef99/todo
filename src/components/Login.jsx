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
            {/* {console.log(emailRef.current.lastChild.firstChild.value, emailRef)} */}
            <Navbar />
            <div className="flex flex-col">
                <h2 className="mb-4">Log In</h2>
                {error && error}
                <form action="" autoComplete="off" onSubmit={handleSubmit}>
                    <div id="email">
                        <TextField
                            id="standard-basic"
                            type="email"
                            required
                            ref={emailRef}
                            label="Email"
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
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                    >
                        Log In
                    </Button>
                </form>
                <div>
                    <div className="mt-4 ">
                        <Link to="/forgot-password">Forgot password?</Link>
                    </div>
                    <div className="mt-2 ">
                        Need an account ? <Link to="/signup">Sign up</Link>
                    </div>
                </div>
            </div>
        </>
    );
}
