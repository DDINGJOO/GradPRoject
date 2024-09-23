import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');

                const response = await axios.get('http://localhost:8080/api/users', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`, // 토큰을 헤더에 추가
                    },
                    withCredentials:true,
                });

                // 서버 응답 확인
                if (response.data.success) {
                    setUsers(response.data.result.data); // 유저 리스트 저장
                } else {
                    setError('Failed to fetch users');
                }
            } catch (err) {
                setError('An error occurred while fetching users');
                console.error('Error fetching users:', err.response); // 에러 로그 출력
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <p>Loading users...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <strong>Username:</strong> {user.username},
                        <strong>Name:</strong> {user.name},
                        <strong>Nickname:</strong> {user.nickname}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
