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
            <Navbar />
            <div className="flex flex-col  items-center mt-8">
                {error && (
                    <p className="mt-2 bg-red-300 px-6 py-3 rounded-md text-red-900 text-lg">
                        {error}
                    </p>
                )}
                <form
                    action=""
                    autoComplete="off"
                    onSubmit={handleSubmit}
                    className="flex flex-col space-y-2 items-center w-1/2 mt-6"
                >
                    <div id="email" className="w-1/2">
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
                    <div id="password" className="w-1/2">
                        <TextField
                            className="w-full"
                            id="standard-password-input"
                            type="password"
                            required
                            ref={passwordRef}
                            autoComplete="current-password"
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
                <div>
                    <div className="mt-4 text-center">
                        <Link to="/forgot-password">Forgot password?</Link>
                    </div>
                    <div className="mt-2 text-center">
                        Need an account ? <Link to="/signup">Sign up</Link>
                    </div>
                </div>
            </div>
        </>
    );
}
