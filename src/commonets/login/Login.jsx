import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { adminLogin } from "../api/Apifunction";

export const Login = () => {
    const [login, setLogin] = useState({
        username: "",
        password: "",
    });

    const [err, setError] = useState("");
    const navigate = useNavigate();
    
    const handleInput = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await adminLogin(login);
            if (res.role === "ADMIN") {
                navigate("/home", { replace: true });
            } else if (res.role === "TEACHER") {
                navigate("/teacherhome", { state: { username: login.username }, replace: true });
            } else if (res.role === "STUDENT") {
                navigate("/studenthome", { replace: true });
            } else {
                setError("Invalid username or password!");
            }
        } catch (error) {
            setError("Login failed. Please try again.");
        }
    };

    return (
        <section className="container col-6 mt-5 mb-5">
            {err && <p className="alert alert-danger">{err}</p>}
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <label htmlFor="username" className="col-sm-2 col-form-label">
                        Username
                    </label>
                    <div>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            className="form-control"
                            value={login.username}
                            onChange={handleInput}
                            required
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <label htmlFor="password" className="col-sm-2 col-form-label">
                        Password
                    </label>
                    <div>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="form-control"
                            value={login.password}
                            onChange={handleInput}
                            required
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <button type="submit" className="btn btn-primary" style={{ marginRight: "10px" }}>
                        Login
                    </button>
                    <span style={{ marginLeft: "10px" }}>
                        Don't have an account yet? <Link to="/register"> Register</Link>
                    </span>
                </div>
            </form>
        </section>
    );
};
