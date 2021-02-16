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
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
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

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return currentUser ? (
        <header className="bg-blue-400 shadow-lg border-b-4 border-blue-300 flex flex-shrink-0 w-full">
            <div className="container flex flex-row justify-between items-center py-2 text-white">
                <h6 className="text-xl font-semibold">
                    <Link to="/todos">Todos</Link>
                </h6>
                {auth && (
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>
                                <Link to="dashboard">Profile</Link>
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>Log out</MenuItem>
                        </Menu>
                    </div>
                )}
            </div>
        </header>
    ) : (
        <header className="bg-blue-400 shadow-lg border-b-4 border-blue-300 flex flex-shrink-0 w-full">
            <div className="container flex flex-row justify-between items-center py-2 text-white">
                <h6 className="text-xl font-semibold">
                    <Link to="/todos">Todos</Link>
                </h6>
                <div className="space-x-4">
                    <CustomButton className="bg-blue-300">
                        {/* <Link to={`${currentUser ? "/" : "/login"}`}> */}
                        {/* {currentUser ? "Log out" : "Log in"} */}
                        {/* </Link> */}
                        <Link to="/login">Log in</Link>
                    </CustomButton>
                    <CustomButton variant="outlined" className="shadow-inner">
                        <Link to="/signup">Sign up</Link>
                    </CustomButton>
                </div>
            </div>
        </header>
    );
}
