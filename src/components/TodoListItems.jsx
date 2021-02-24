import React from "react";
import { ListItem, ListItemText } from "@material-ui/core";
import { db } from "../firebase_config";
import DeleteIcon from "@material-ui/icons/Delete";

export default function TodoListItems({ todo, isCompleted, id, createdAt }) {
    const date = createdAt;
    let shareef = date;

    const toggleComplete = () => {
        db.collection("todos").doc(id).update({
            isCompleted: !isCompleted,
        });
    };

    const deleteTodo = () => {
        db.collection("todos")
            .doc(id)
            .delete()
            .then(() => {
                console.log("Document successfully deleted!");
            })
            .catch((error) => {
                console.error("Error removing document: ", error);
            });
    };

    return (
        <>
            <ListItem className="flex flex-col sm:flex-row">
                <ListItemText
                    className="self-start"
                    primary={todo}
                    secondary={`${
                        isCompleted ? "Completed" : "In progress"
                    } || ${createdAt ? `created at: ${createdAt}` : ""}`}
                />
                {/* progress */}
                <div className="flex flex-row items-center justify-center self-start sm:self-center space-x-4">
                    <button
                        onClick={toggleComplete}
                        variant="outlined"
                        className="border py-1 px-3 rounded bg-white-light text-black font-medium text-md tracking-wide hover:bg-white transition duration-300 ease-in"
                        title={isCompleted ? "incomplete" : "Completed"}
                    >
                        {isCompleted ? "UnDone" : "Done"}
                    </button>
                    <button
                        className="text-red p-2 rounded-full hover:bg-red-300 transition duration-300 ease-in-out"
                        title="delete"
                        onClick={deleteTodo}
                    >
                        <DeleteIcon className="self-center" />
                    </button>
                </div>
            </ListItem>
        </>
    );
}
