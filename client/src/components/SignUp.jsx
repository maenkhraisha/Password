import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useState } from "react";

function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        Axios.post("http://localhost:3500/auth/signup", {
            username,
            email,
            password,
        })
            .then((response) => {
                console.log(response);
                navigate("/login");
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <section className="signup">
            <h1>Sign Up</h1>
            <form>
                <div className="form-control">
                    <label htmlFor="username">User Name:</label>
                    <input
                        type="text"
                        id="username"
                        autoComplete="false"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        autoComplete="false"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="*****"
                        autoComplete="false"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button onClick={handleSubmit}>Sign Up</button>
                <div>
                    <p>Have Account?</p>
                    <Link to="/login">Login</Link>
                </div>
            </form>
        </section>
    );
}

export default SignUp;
