import React, { useEffect, useState } from "react"
import Cookies from "universal-cookie"
import "./LoginFrom.css"
import axios from "axios"

function LoginFrom() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const cookies = new Cookies()

    useEffect(() => {
        const authorization = cookies.get("Authorization")
        axios
            .get("http://127.0.0.1/laravel-api/public/api/me", {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${authorization}`,
                },
            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    })

    function submitHandler(e) {
        e.preventDefault()
        axios
            .post("http://127.0.0.1/laravel-api/public/api/login", {
                email: email,
                password: password,
            })
            .then((res) => {
                cookies.set("Authorization", res.data, { path: "/" })
                console.log(res)
            })
            .catch((err) => console.log(err))
    }

    return (
        <div className="shadow bg-body rounded">
            <div className="banner-login rounded-top-2"></div>
            <div className="login-wrap px-md-5 py-md-4">
                <h3 className="mb-4 fw-light">Sign In</h3>
                <form className="signin-form">
                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="floatingEmail"
                            placeholder="name@example.com"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <label
                            htmlFor="floatingEmail"
                            className="text-secondary"
                        >
                            Email
                        </label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        <label
                            htmlFor="floatingPassword"
                            className="text-secondary"
                        >
                            Password
                        </label>
                    </div>
                    <div className="form-group mt-3">
                        <button
                            type="submit"
                            id="SignIn"
                            className="form-control btn btn-success lightgreen rounded submit p-3"
                            onClick={submitHandler}
                        >
                            Sign In
                        </button>
                    </div>
                </form>
                {/* <p className="mt-3">Not a member? Sign Up</p> */}
            </div>
        </div>
    )
}

export default LoginFrom
