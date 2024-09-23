import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserEdit = () => {
    const { id } = useParams(); // URL에서 ID 가져오기
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({ name: '', nickname: '' });
    const [error, setError] = useState('');
    const [currentUserId, setCurrentUserId] = useState(null); // 로그인한 유저 ID

    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        if (token) {
            // 로그인한 유저의 정보를 가져오기
            axios.get('http://localhost:8080/api/users/current', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => {
                    const loggedInUserId = response.data.result.data.id;
                    setCurrentUserId(loggedInUserId);

                    // URL에서 가져온 ID와 로그인한 유저의 ID 비교
                    if (loggedInUserId.toString() !== id) {
                        setError('본인이 아닙니다.');
                    } else {
                        // 일치할 경우 유저 정보 가져오기
                        axios.get(`http://localhost:8080/api/users/${id}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        })
                            .then(res => {
                                setUserInfo({
                                    name: res.data.result.data.name,
                                    nickname: res.data.result.data.nickname
                                });
                            })
                            .catch(err => {
                                setError('유저 정보를 불러오는데 실패했습니다.');
                            });
                    }
                })
                .catch(() => {
                    setError('로그인이 필요합니다.');
                });
        } else {
            setError('로그인이 필요합니다.');
        }
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('accessToken');

        axios.put(`http://localhost:8080/api/users/${id}`, userInfo, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(() => {
                navigate(`/users/${id}`); // 수정 후 유저 상세 페이지로 이동
            })
            .catch(() => {
                setError('유저 정보를 수정하는데 실패했습니다.');
            });
    };

    if (error) {
        return <div>{error}</div>; // 에러 메시지 표시
    }

    return (
        <div>
            <h1>Edit User</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={userInfo.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Nickname:</label>
                    <input
                        type="text"
                        name="nickname"
                        value={userInfo.nickname}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default UserEdit;
