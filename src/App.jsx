import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";
import Todos from "./components/Todos";
import Home from "./components/Home";

function App() {
    return (
        <>
            <Router>
                <AuthProvider>
                    <Switch>
                        <PrivateRoute
                            exact
                            path="/dashboard"
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
                        <PrivateRoute
                            path="/todos"
                            component={Todos}
                        ></PrivateRoute>
                        <Route exact to="/" component={Home}></Route>
                    </Switch>
                </AuthProvider>
            </Router>
        </>
    );
}

export default App;
