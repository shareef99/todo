import React from "react";
import {
    ListItem,
    ListItemText,
    Button,
    IconButton,
    withStyles,
} from "@material-ui/core";
import { db } from "../firebase_config";
import DeleteIcon from "@material-ui/icons/Delete";

const green300 = "rgba(110, 231, 183, 1)";
const green400 = "rgba(52, 211, 153, 1)";
const red200 = "rgba(254, 202, 202,1)";
const red300 = "rgba(252, 165, 165, 1)";
const red400 = "rgba(248, 113, 113,1)";

const DeleteButton = withStyles((theme) => ({
    root: {
        color: red400,
        padding: "10px",
        "&:hover": {
            backgroundColor: red200,
        },
    },
}))(IconButton);

const DoneButton = withStyles((theme) => ({
    root: {
        backgroundColor: green300,
        "&:hover": {
            backgroundColor: green400,
        },
    },
}))(Button);

export default function TodoListItems({ todo, isCompleted, id }) {
    const toggleComplete = () => {
        db.collection("todos").doc(id).update({
            isCompleted: !isCompleted,
        });
    };

    const deleteTodo = () => {
        db.collection("todos").doc(id).delete();
    };

    return (
        <>
            <ListItem className="flex flex-col sm:flex-row">
                <ListItemText
                    className=" self-start"
                    primary={todo}
                    secondary={isCompleted ? "Completed" : "in progress"}
                />
                <div className="flex flex-row self-start sm:self-center space-x-4">
                    <DoneButton
                        onClick={toggleComplete}
                        variant="outlined"
                        className="h-8 self-center bg-red"
                    >
                        {isCompleted ? "UnDone" : "Done"}
                    </DoneButton>
                    <DeleteButton
                        // aria-label="delete"
                        className="hover:bg-red-300"
                    >
                        <DeleteIcon
                            onClick={deleteTodo}
                            className="self-center"
                            // aria-label="delete"
                        />
                    </DeleteButton>
                </div>
            </ListItem>
        </>
    );
}
