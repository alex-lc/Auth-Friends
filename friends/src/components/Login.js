import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Login(props) {

    let history = useHistory();

    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const login = e => {
        e.preventDefault();
        // console.log(user);
        axios.post(`http://localhost:5000/api/login`, user)
            .then((res) => {
                localStorage.setItem('token', res.data.payload);
                history.push("/friendslist");
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <form onSubmit={login}>
            <div>
                <label htmlFor="username">Username: </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="password">Password: </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                />
            </div>

            <button type="submit">Login</button>
        </form>
    )
}

export default Login;