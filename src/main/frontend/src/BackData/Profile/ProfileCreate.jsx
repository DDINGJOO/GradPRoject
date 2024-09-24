import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfileCreate = ({ id }) => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({ comment: '', bio: '', location: '' });
    const [profileImage, setProfileImage] = useState(null);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setProfileImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('comment', profile.comment);
        formData.append('bio', profile.bio);
        formData.append('location', profile.location);
        if (profileImage) formData.append('profileImageFile', profileImage);

        try {
            await axios.post(`http://localhost:8080/api/profile/create/${id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate(`/profile/view/${id}`); // 생성 후 조회 페이지로 이동
        } catch (err) {
            setError('프로필을 생성하는 데 실패했습니다.');
        }
    };

    if (error) return <p>{error}</p>;

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>소개</label>
                <input type="text" name="comment" value={profile.comment} onChange={handleInputChange} />
            </div>
            <div>
                <label>신체정보</label>
                <input type="text" name="bio" value={profile.bio} onChange={handleInputChange} />
            </div>
            <div>
                <label>지역</label>
                <input type="text" name="location" value={profile.location} onChange={handleInputChange} />
            </div>
            <div>
                <label>프로필 이미지</label>
                <input type="file" onChange={handleFileChange} />
            </div>
            <button type="submit">생성</button>
        </form>
    );
};

export default ProfileCreate;
