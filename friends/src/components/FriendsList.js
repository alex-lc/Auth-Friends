import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

// components
import Create from './Create';

function FriendsList(props) {

    const [friends, setFriends] = useState([]);

    useEffect(() => {
        axiosWithAuth().get(`/api/friends`)
            .then((res) => {
                // console.log(res);
                setFriends(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

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
                        </div>
                    )
                })
            }
        </div>
    )
}

export default FriendsList;