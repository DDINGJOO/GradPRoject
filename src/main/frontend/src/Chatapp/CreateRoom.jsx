import React, { useState } from 'react';
import axios from 'axios';

const CreateRoom = () => {
    const [roomName, setRoomName] = useState('');

    // Get the access token from localStorage or sessionStorage
    const token = localStorage.getItem('accessToken'); // Adjust if you are using sessionStorage or another method

    const createRoom = async () => {
        if (!roomName.trim()) {
            alert('Room name is required');
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:8080/api/rooms/create',
                {
                    roomName: roomName
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}` // Attach the token here
                    }
                }
            );
            alert(`Room "${response.data.result.name}" created successfully!`);
            setRoomName('');
        } catch (error) {
            console.error('There was an error creating the room:', error);
            if (error.response && error.response.status === 401) {
                alert('Unauthorized! Please log in again.');
            }
        }
    };

    return (
        <div>
            <h2>Create a Chat Room</h2>
            <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Enter room name"
            />
            <button onClick={createRoom}>Create Room</button>
        </div>
    );
};

export default CreateRoom;
