import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import { db } from "../firebase_config";
import firebase from "firebase";
import TodoListTimes from "./TodoListItems";
import Navbar from "./Navbar";
import { useAuth } from "../contexts/AuthContext";

export default function Todos() {
    const [todos, setTodos] = useState([]);
    const [completedTodos, setCompletedTodos] = useState([]);
    const [incompleteTodos, setIncompleteTodos] = useState([]);
    const [todoInput, setTodoInput] = useState("");
    const { currentUser } = useAuth();

    useEffect(() => {
        function getTodos(todoState, setFunction) {
            db.collection("todos")
                .where("uid", "==", currentUser.uid)
                .where("isCompleted", "==", todoState)
                .orderBy("timeStamp", "desc")
                .onSnapshot((querySnapShot) => {
                    setFunction(
                        querySnapShot.docs.map((doc) => ({
                            id: doc.id,
                            todo: doc.data().todo,
                            isCompleted: doc.data().isCompleted,
                            timeStamp: doc.data().timeStamp,
                            date: doc.data().date,
                        }))
                    );
                });
        }

        getTodos(true, setCompletedTodos);
        getTodos(false, setIncompleteTodos);
    }, []);

    const addTodo = (e) => {
        e.preventDefault();
        // use .doc(custom id value).set()

        if (todoInput === "") {
            return alert(
                'Todo field is empty!\nTry "Have to complete X thing"'
            );
        }

        db.collection("todos").add({
            isCompleted: false,
            timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
            date: new Date(
                firebase.firestore.Timestamp.now().seconds * 1000
            ).toLocaleDateString(),
            uid: currentUser.uid,
            todo: todoInput,
            completedAt: null,
        });
        setTodoInput("");
    };

    return (
        <>
            <section className="flex bg-white-light flex-col h-screen">
                <Navbar />
                <div className="flex flex-col justify-items-center items-center mt-8 text-black bg-white-light">
                    <form
                        action=""
                        className="m-4 flex flex-row justify-center items-center space-x-4 max-w-9/10"
                    >
                        <TextField
                            className="w-64"
                            id="outlined-basic"
                            label="Add a todo"
                            multiline
                            value={todoInput}
                            onChange={(e) => setTodoInput(e.target.value)}
                            variant="outlined"
                        />
                        <Button
                            id="button"
                            type="submit"
                            variant="contained"
                            onClick={addTodo}
                            className="h-12 flex-wrap"
                        >
                            Add
                        </Button>
                    </form>

                    {incompleteTodos.length > 0 && (
                        <div className="flex flex-col w-9/12 sm:w-4/5 md:w-10/12 lg:w-3/4">
                            <h2 className="self-start text-2xl font-medium my-2 tracking-wide">
                                Todos
                            </h2>
                            {incompleteTodos.map((todoObject) => (
                                <TodoListTimes
                                    key={todoObject.id}
                                    todo={todoObject.todo}
                                    id={todoObject.id}
                                    isCompleted={todoObject.isCompleted}
                                    createdAt={todoObject.date}
                                    completedAt={todoObject.completedAt}
                                />
                            ))}
                        </div>
                    )}
                    {completedTodos.length > 0 && (
                        <div className="flex flex-col w-9/12 sm:w-4/5 md:w-10/12 lg:w-3/4 ">
                            <h2 className="self-start text-2xl font-medium my-2 tracking-wide">
                                Completed Todos
                            </h2>
                            {completedTodos.map((todoObject) => (
                                <TodoListTimes
                                    key={todoObject.id}
                                    todo={todoObject.todo}
                                    id={todoObject.id}
                                    isCompleted={todoObject.isCompleted}
                                    createdAt={todoObject.date}
                                    completedAt={todoObject.completedAt}
                                />
                            ))}
                        </div>
                    )}
                    {completedTodos.length === 0 &&
                        incompleteTodos.length === 0 && (
                            <div
                                className="flex flex-col w-9/12 sm:w-4/5
                                md:w-10/12 lg:w-3/4"
                            >
                                <p className="self-center text-center text-2xl font-medium my-2 tracking-wide">
                                    Welcome!
                                    <br />
                                    looks like your todo list is empty!
                                    <br />
                                    Add todo and start doing
                                </p>
                            </div>
                        )}
                </div>
            </section>
        </>
    );
}
