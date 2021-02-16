import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import Navbar from "./Navbar";

export default function Dashboard() {
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const history = useHistory();

    async function handleLogout() {
        setError("");
        try {
            await logout();
            history.push("/");
        } catch {
            setError("Failed to log out!");
        }
    }

    return (
        <>
            <Navbar />
            <div>
                <div>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && error}
                    <strong>Email: </strong> {currentUser.email}
                    <div>
                        <button>
                            <Link to="/update-profile">Update Profile</Link>
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-2">
                <button onClick={handleLogout}>Log out</button>
            </div>
        </>
    );
}
