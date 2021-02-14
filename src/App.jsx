import { TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { db } from "./firebase_config";
import firebase from "firebase";
import TodoListTimes from "./components/TodoListItems";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";

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
            <Router>
                <AuthProvider>
                    <Switch>
                        <PrivateRoute
                            exact
                            path="/"
                            component={Dashboard}
                        ></PrivateRoute>
                        <PrivateRoute
                            path="/update-profile"
                            component={UpdateProfile}
                        ></PrivateRoute>
                        <Route path="/signup" component={Signup}></Route>
                        <Route exact path="/login" component={Login}></Route>
                        <Route
                            exact
                            path="/forgot-password"
                            component={ForgotPassword}
                        ></Route>
                    </Switch>
                </AuthProvider>
            </Router>
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
            </div>
        </>
    );
}

export default App;
