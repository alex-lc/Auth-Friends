import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

// components
import Create from './Create';

function FriendsList(props) {

    const [friends, setFriends] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editedFriend, setEditedFriend] = useState({
        name: '',
        age: '',
        email: ''
    })

    useEffect(() => {
        axiosWithAuth().get(`/api/friends`)
            .then((res) => {
                // console.log(res);
                setFriends(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [friends]);

    const deleteFriend = (friend) => {
        axiosWithAuth().delete(`/api/friends/${friend.id}`)
            .then((res) => {
                console.log(res);
                setFriends([
                    ...friends
                ])
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const editFriend = (friend) => {
        axiosWithAuth().put(`/api/friends/${friend.id}`, editedFriend)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const toggleEditMode = (e) => {
        e.preventDefault();
        setEditMode(!editMode);
    }

    const handleChange = (e) => {
        setEditedFriend({

            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            <Create friends={friends} setFriends={setFriends} />
            {
                friends.map((friend) => {
                    return (
                        // console.log(friend);
                        <div key={friend.id}>
                            <p>Name: {friend.name}</p>
                            <p>Age: {friend.age}</p>
                            <p>Email: {friend.email}</p>
                            <button onClick={() => deleteFriend(friend)}>Delete Friend</button>
                            <button onClick={toggleEditMode}>Edit Friend</button>
                            {editMode &&
                                <form onSubmit={() => editFriend(friend)}>
                                    <div>
                                        <label>Name:</label>
                                        <input
                                            type="text"
                                            name="editName"
                                            value={editedFriend.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label>Age:</label>
                                        <input
                                            type="text"
                                            name="editAge"
                                            value={editedFriend.age}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label>Email:</label>
                                        <input
                                            type="email"
                                            name="editEmail"
                                            value={editedFriend.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <button>Finish Editing</button>
                                </form>}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default FriendsList;