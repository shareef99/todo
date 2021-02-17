import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Signup from "./components/Signup";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import Todos from "./components/Todos";
import Home from "./components/Home";

function App() {
    return (
        <>
            <Router>
                <AuthProvider>
                    <Switch>
                        <Route exact path="/" component={Home}></Route>
                        <Route exact path="/signup" component={Signup}></Route>
                        <Route exact path="/login" component={Login}></Route>
                        <Route
                            exact
                            path="/forgot-password"
                            component={ForgotPassword}
                        ></Route>
                        <PrivateRoute
                            exact
                            path="/todos"
                            component={Todos}
                        ></PrivateRoute>
                    </Switch>
                </AuthProvider>
            </Router>
        </>
    );
}

export default App;
