import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import { db } from "../firebase_config";
import firebase from "firebase";
import TodoListTimes from "./TodoListItems";
import Navbar from "./Navbar";
import { useAuth } from "../contexts/AuthContext";

export default function Todos() {
    const [todos, setTodos] = useState([]);
    const [todoInput, setTodoInput] = useState("");
    const { currentUser } = useAuth();

    useEffect(() => {
        getTodos();
    }, []);

    const getTodos = () => {
        db.collection("todos")
            .where("uid", "==", currentUser.uid)
            .orderBy("timeStamp", "desc")
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
        // use .doc(custom id value).set()

        if (todoInput === "") {
            return alert(
                'Todo field is empty!\nTry "Have to complete X thing"'
            );
        }

        db.collection("todos").add({
            isCompleted: false,
            timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
            uid: currentUser.uid,
            todo: todoInput,
        });
        setTodoInput("");
    };

    return (
        <>
            <section className="flex bg-white-light flex-col h-screen">
                <Navbar />
                <div className="flex flex-col justify-items-center items-center mt-8 text-black">
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
                            className="h-5/6 flex-wrap"
                        >
                            Add
                        </Button>
                    </form>
                    <div className="flex flex-col w-9/12 sm:w-4/5 md:w-10/12 lg:w-3/4">
                        <h2 className="self-start text-2xl font-medium my-2 tracking-wide">
                            Todos
                        </h2>
                        {todos.map((todoObject) => (
                            <TodoListTimes
                                key={todoObject.id}
                                todo={todoObject.todo}
                                id={todoObject.id}
                                isCompleted={todoObject.isCompleted}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
