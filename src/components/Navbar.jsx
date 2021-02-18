import React, { useState } from "react";
import {
    makeStyles,
    Button,
    withStyles,
    IconButton,
    Menu,
    MenuItem,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const hoverColor = "rgba(147, 197, 253, 1);";
const CustomButton = withStyles((theme) => ({
    root: {
        "&:hover": {
            backgroundColor: hoverColor,
        },
    },
}))(Button);

const useStyles = makeStyles((theme) => ({}));

export default function Navbar() {
    const classes = useStyles();
    const { currentUser, logout } = useAuth();
    const [error, setError] = useState("");
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
        <header className="bg-blue-light text-white shadow-lg border-b-4 border-blue flex flex-shrink-0 w-full">
            <div className="container flex flex-row justify-between items-center py-2 text-white">
                <h6 className="text-xl font-semibold">
                    <Link to="/todos">Todos</Link>
                </h6>
                <div className="space-x-4">
                    {currentUser ? (
                        <CustomButton
                            className="bg-blue-300"
                            onClick={handleLogout}
                            variant="outlined"
                        >
                            Log out
                        </CustomButton>
                    ) : (
                        <>
                            <CustomButton className="bg-blue-300">
                                <Link to="/login">Log in</Link>
                            </CustomButton>
                            <CustomButton
                                variant="outlined"
                                className="shadow-inner"
                            >
                                <Link to="/signup">Sign up</Link>
                            </CustomButton>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
