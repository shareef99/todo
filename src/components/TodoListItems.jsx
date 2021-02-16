import React from "react";
import { ListItem, ListItemText, Button } from "@material-ui/core";
import { db } from "../firebase_config";

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
        <div>
            <ListItem>
                <ListItemText
                    className="mr-6"
                    primary={todo}
                    secondary={isCompleted ? "Completed" : "in progress"}
                />
                <Button onClick={toggleComplete}>
                    {isCompleted ? "UnDone" : "Done"}
                </Button>
                <Button onClick={deleteTodo}>X</Button>
            </ListItem>
        </div>
    );
}
