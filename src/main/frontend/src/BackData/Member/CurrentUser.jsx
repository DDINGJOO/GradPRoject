import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // URL 파라미터를 사용하기 위해 추가

const UserDetail = () => {
    const { id } = useParams(); // URL에서 id 파라미터를 가져옴
    const [user, setUser] = useState(null); // 사용자 데이터를 저장할 state
    const [error, setError] = useState(null); // 에러를 저장할 state
    const [loading, setLoading] = useState(true); // 로딩 상태

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken'); // 로그인 시 저장한 토큰 가져오기
                const response = await axios.get(`http://localhost:8080/api/users/current`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`, // Access Token을 헤더에 추가
                        withCredentials:true,
                    },
                });
                setUser(response.data.result.data); // 받은 데이터에서 유저 정보 추출
                setLoading(false); // 로딩 완료
            } catch (error) {
                console.error('Error fetching user:', error);
                setError('Failed to fetch user data'); // 에러 처리
                setLoading(false); // 로딩 완료
            }
        };

        fetchUser(); // 컴포넌트가 마운트될 때 사용자 정보 요청
    }, [id]); // id가 변경될 때마다 사용자 정보 요청

    if (loading) return <div>Loading...</div>; // 로딩 중 메시지
    if (error) return <div>{error}</div>; // 에러 메시지 출력

    return (
        <div>
            <h1>Current login User</h1>
            {user ? (
                <div>
                    <p><strong>ID:</strong> {user.id}</p>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Nickname:</strong> {user.nickname}</p>
                </div>
            ) : (
                <div>No user data found</div>
            )}
        </div>
    );
};

export default UserDetail;
