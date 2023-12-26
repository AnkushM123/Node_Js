import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import Edit from "./components/edit";
import Login from "./components/login";
import Employee from "./components/employee";
import Register from "./components/register";
import ForgotPassword from "./components/forgotPassword";
import SetPassword from "./components/setPassword";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/protectedRoute";

function App() {

    return (

        <>
            <ToastContainer></ToastContainer>
            <Router>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={<Login />}
                    />

                    <Route
                        path="/employee"
                        element={<ProtectedRoute Component={Employee} />}
                    />

                    <Route
                        path="/edit/:id"
                        element={<ProtectedRoute Component={Edit} />}
                    />

                    <Route
                        path="/register"
                        element={<Register />}
                    />

                    <Route
                        path="/forgotPassword"
                        element={<ForgotPassword />}
                    />

                    <Route
                        path="/setPassword"
                        element={<SetPassword />}
                    />


                </Routes>
            </Router>
        </>

    );
}

export default App;