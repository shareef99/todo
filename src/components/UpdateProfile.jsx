import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import Navbar from "./Navbar";

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
                    {/* {currentUser.email} */}
                    <form action="" onSubmit={handleSubmit}>
                        <div id="email">
                            <label htmlFor="">Email</label>
                            <input
                                type="email"
                                required
                                ref={emailRef}
                                defaultValue={currentUser.email}
                                className="border-black border-opacity-100 border-4"
                            />
                        </div>
                        <div id="password">
                            <label htmlFor="">Password</label>
                            <input
                                type="password"
                                required
                                ref={passwordRef}
                                placeholder="Leave blank to keep the same password"
                            />
                        </div>
                        <div id="passwordConfirm">
                            <label htmlFor="">Password confirmation</label>
                            <input
                                type="password"
                                required
                                ref={passwordConfirmRef}
                                placeholder="Leave blank to keep the same password"
                            />
                        </div>
                        <button
                            className="w-full"
                            type="submit"
                            disabled={loading}
                        >
                            Update
                        </button>
                    </form>
                </div>
            </div>
            <div className=" w-full text-center mt-2 ">
                <Link to="/">Cancel</Link>
            </div>
        </>
    );
}
