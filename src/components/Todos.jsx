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
        db.collection("todos")
            .orderBy("timeStamp", "asc")
            .onSnapshot((querySnapShot) => {
                setTodos(
                    querySnapShot.docs.map((doc) => ({
                        id: doc.id,
                        todo: doc.data().todo,
                        isCompleted: doc.data().isCompleted,
                        timeStamp: doc.data().timeStamp,
                    }))
                );
            });
    };

    const addTodo = (e) => {
        e.preventDefault();
        console.log("You are trying to add  todo");
        // use .doc(custom id value).set()
        const { serverTimestamp } = firebase.firestore.FieldValue;

        db.collection("todos").add({
            isCompleted: false,
            timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
            // timeStamp: new Date(
            //     firebase.firestore.Timestamp.now().seconds * 1000
            // ).toLocaleDateString(),
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
                {console.log(
                    todos.sort((a, b) =>
                        new Date(a.timeStamp).getTime() >
                        new Date(b.timeStamp).getTime()
                            ? 1
                            : -1
                    )
                )}
            </div>
        </>
    );
}

// new Date(todo.timeStamp).getTime()
