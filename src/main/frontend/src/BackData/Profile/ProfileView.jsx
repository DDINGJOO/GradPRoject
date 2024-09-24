import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProfileView = () => {
    const { id } = useParams(); // URL에서 사용자 ID 가져오기
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/profile/view/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // 토큰 추가
                    },
                });
                setProfile(response.data.result.data); // 프로필 데이터 설정
            } catch (err) {
                setError('프로필을 불러오는 데 실패했습니다.');
            }
        };

        fetchProfile();
    }, [id]);

    if (error) return <p>{error}</p>;
    if (!profile) return <p>Loading...</p>;

    return (
        <div>
            <h1>{profile.comment}</h1>
            <p>{profile.bio}</p>
            <p>{profile.location}</p>
            <img src={`http://localhost:8080/images/${profile.profileImage}`} alt="Profile" />
        </div>
    );
};

export default ProfileView;
