import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

function Create(props) {

    const { friends, setFriends } = props;

    const [newFriend, setNewFriend] = useState({
        name: '',
        age: '',
        email: ''
    });

    const createFriend = (e) => {
        e.preventDefault();
        setFriends([
            ...friends,
            newFriend
        ]);
        axiosWithAuth().post(`/api/friends`, newFriend)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleChange = (e) => {
        setNewFriend({
            ...newFriend,
            [e.target.name]: e.target.value
        })
    }

    return (
        <form onSubmit={createFriend}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={newFriend.name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="age">Age:</label>
                <input
                    type="text"
                    id="age"
                    name="age"
                    value={newFriend.age}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={newFriend.email}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Create Friend</button>
        </form>
    )
}

export default Create;