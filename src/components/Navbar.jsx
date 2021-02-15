import React from "react";
import { makeStyles, Button, withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
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
    const { currentUser } = useAuth();
    return (
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
