import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';  // React Router를 사용해 Link를 통해 이동

const RoomList = () => {
    const [rooms, setRooms] = useState([]);

    const fetchRooms = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/rooms/roomList', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}` // 토큰 적용
                }
            });

            if (response.data.success && response.data.result.data) {
                setRooms(response.data.result.data);
            } else {
                console.error('No room data found');
            }
        } catch (error) {
            console.error('Error fetching room list:', error);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    return (
        <div>
            <h2>Chat Rooms</h2>
            <ul>
                {rooms.length > 0 ? (
                    rooms.map((room) => (
                        <li key={room.id}>
                            {/* 방 이름을 누르면 해당 방으로 이동 */}
                            <Link to={`/room/${room.id}`}>{room.name}</Link> (ID: {room.id})
                        </li>
                    ))
                ) : (
                    <li>No rooms available</li>
                )}
            </ul>
        </div>
    );
};

export default RoomList;
