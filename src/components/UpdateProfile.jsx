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

        if (
            passwordRef.current.lastChild.firstChild.value !==
            passwordConfirmRef.current.lastChild.firstChild.value
        ) {
            return setError("Passwords don't match!");
        }

        const promises = [];

        if (emailRef.current.lastChild.firstChild.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value));
        }

        if (passwordRef.current.lastChild.firstChild.value) {
            promises.push(
                updatePassword(passwordRef.current.lastChild.firstChild.value)
            );
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
                    <h2 className="mb-4">Update Profile</h2>
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
                                placeholder="Leave blank to keep the same password"
                                type="password"
                                // required
                                ref={passwordRef}
                                autoComplete="current-password"
                            />
                        </div>
                        <div id="passwordConfirm">
                            <TextField
                                id="standard-password-confirm-input"
                                placeholder="Leave blank to keep the same password"
                                type="password"
                                // required
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
            <div className="mt-2 ">
                <Link to="/todos">Cancel</Link>
            </div>
        </>
    );
}
