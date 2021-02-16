import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import { db } from "../firebase_config";
import firebase from "firebase";
import TodoListTimes from "./TodoListItems";
import Navbar from "./Navbar";

export default function Todos() {
    const [todos, setTodos] = useState([]);
    const [todoInput, setTodoInput] = useState("");

    useEffect(() => {
        getTodos();
    }, []);

    const getTodos = () => {
        db.collection("todos").onSnapshot((querySnapShot) => {
            setTodos(
                querySnapShot.docs.map((doc) => ({
                    id: doc.id,
                    todo: doc.data().todo,
                    isCompleted: doc.data().isCompleted,
                }))
            );
        });
        console.log("Get Todos");
    };

    const addTodo = (e) => {
        e.preventDefault();
        console.log("You are trying to add  todo");
        // use .doc(custom id value).set()
        db.collection("todos").add({
            isCompleted: false,
            timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
            todo: todoInput,
        });
        setTodoInput("");
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-col justify-items-center items-center">
                <h1 className="">Shareef Todo App</h1>
                <form action="">
                    <TextField
                        id="outlined-basic"
                        label="Write a Todo"
                        value={todoInput}
                        multiline
                        onChange={(e) => setTodoInput(e.target.value)}
                        variant="outlined"
                    />
                    <button
                        id="button"
                        type="submit"
                        variant="contained"
                        onClick={addTodo}
                        className="hidden"
                    ></button>
                </form>
                {todos.map((todoObject) => (
                    <TodoListTimes
                        key={todoObject.id}
                        todo={todoObject.todo}
                        id={todoObject.id}
                        isCompleted={todoObject.isCompleted}
                    />
                ))}
            </div>
        </>
    );
}
