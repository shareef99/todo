import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import TextField from "@material-ui/core/TextField";

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { currentUser, updatePassword, updateEmail } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();

        setError("");
        setLoading(true);

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords don't match!");
        }

        const promises = [];

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value));
        }

        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value));
        }

        Promise.all(promises)
            .then(() => {
                history.push("/dashboard");
            })
            .catch(setError("Failed to update account"))
            .finally(() => {
                setLoading(false);
            });

        setLoading(false);
    }

    return (
        <>
            <Navbar />
            <div>
                <div>
                    <h2 className="text-center mb-4">Update Profile</h2>
                    {error && <span>{error}</span>}
                    <form action="" onSubmit={handleSubmit}>
                        <div id="email">
                            <TextField
                                id="standard-basic"
                                type="email"
                                required
                                ref={emailRef}
                                label="Email"
                                defaultValue={currentUser.email}
                            />
                        </div>
                        <div id="password">
                            <TextField
                                id="standard-password-input"
                                placeholder="keep blank to keep the same password"
                                type="Password"
                                required
                                ref={passwordRef}
                                autoComplete="current-password"
                            />
                        </div>
                        <div id="passwordConfirm">
                            <TextField
                                id="standard-password-confirm-input"
                                placeholder="keep blank to keep the same password"
                                type="Password"
                                required
                                ref={passwordConfirmRef}
                                autoComplete="current-password"
                            />
                        </div>
                        <button type="submit" disabled={loading}>
                            Update
                        </button>
                    </form>
                </div>
            </div>
            <div className=" w-full text-center mt-2 ">
                <Link to="/todos">Cancel</Link>
            </div>
        </>
    );
}
