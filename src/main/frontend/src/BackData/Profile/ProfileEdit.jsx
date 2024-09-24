import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ProfileEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState({ comment: '', bio: '', location: '' });
    const [profileImage, setProfileImage] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/profile/view/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                });
                setProfile(response.data.result.data);
            } catch (err) {
                setError('프로필을 불러오는 데 실패했습니다.');
            }
        };

        fetchProfile();
    }, [id]);

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
            await axios.put(`http://localhost:8080/api/profile/edit/${id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate(`/profile/view/${id}`); // 수정 후 조회 페이지로 이동
        } catch (err) {
            setError('프로필을 수정하는 데 실패했습니다.');
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
            <button type="submit">수정</button>
        </form>
    );
};

export default ProfileEdit;
