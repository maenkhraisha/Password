import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Login from "./components/Login";
import ForgetPassword from "./components/ForgetPassword";
import ResetPassword from "./components/ResetPassword";
import RequireAuth from "./RequireAuth";
import About from "./components/About";
import PasswordsList from "./components/PasswordsList";
import PersistLogin from "./PersistLogin";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/forgetPassword" element={<ForgetPassword />} />
                    <Route path="/resetPassword/:token" element={<ResetPassword />} />
                    <Route element={<PersistLogin />}>
                        <Route element={<RequireAuth />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/passwords" element={<PasswordsList />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
