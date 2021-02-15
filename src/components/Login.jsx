import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push("/todos");
        } catch {
            setError("Failed to log in!");
        }
        setLoading(false);
    }

    return (
        <>
            <div>
                <div>
                    <h2 className="text-center mb-4">Log In</h2>
                    {error && error}
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
                        <div id="password">
                            <label htmlFor="">Password</label>
                            <input type="password" required ref={passwordRef} />
                        </div>

                        <button
                            className="w-full"
                            type="submit"
                            disabled={loading}
                        >
                            Log In
                        </button>
                    </form>
                    <div className=" w-full text-center mt-4 ">
                        <Link to="/forgot-password">Forgot password?</Link>
                    </div>
                </div>
            </div>
            <div className=" w-full text-center mt-2 ">
                Need an account ? <Link to="/signup">Sign up</Link>
            </div>
        </>
    );
}
