import React from "react";
import {
    AppBar,
    Typography,
    makeStyles,
    Button,
    Toolbar,
    withStyles,
} from "@material-ui/core";

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
    return (
        <>
            <AppBar
                position="sticky"
                className="flex flex-row items-center bg-blue-400"
                color="transparent"
            >
                <Toolbar className="w-full justify-between">
                    <Typography variant="h6" className="block">
                        Todos
                    </Typography>
                    <div className="space-x-4">
                        <CustomButton className="bg-blue-300">
                            Log in
                        </CustomButton>
                        <CustomButton variant="outlined">Sign up</CustomButton>
                    </div>
                </Toolbar>
            </AppBar>
        </>
    );
}
