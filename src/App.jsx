import { TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { db } from "./firebase_config";
import firebase from "firebase";
import TodoListTimes from "./TodoListItems";

function App() {
    const [todoInput, setTodoInput] = useState("");
    const [todos, setTodos] = useState([]);
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
            <div className="flex flex-col justify-items-center items-center">
                <h1 className="">Shareef Todo App</h1>
                <form action="">
                    <TextField
                        id="outlined-basic"
                        label="Write a Todo"
                        value={todoInput}
                        onChange={(e) => setTodoInput(e.target.value)}
                        // onKeyDown={(e) => {
                        //     if (e.key == "Enter") {
                        //         setTodoInput(e.target.value);
                        //         console.log(todoInput);
                        //     }
                        // }}
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

export default App;
