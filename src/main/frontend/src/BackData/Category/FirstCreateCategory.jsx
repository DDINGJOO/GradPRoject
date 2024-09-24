import React, { useState } from 'react';
import axios from 'axios';

const CategoryCreateAtFirst = () => {
    const [name, setName] = useState('');
    const [parentId, setParentId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('accessToken'); // 저장된 토큰 가져오기

        const data = {
            name: name,
            parentId: parentId || "", // parentId가 빈 문자열이면 최상위 카테고리
        };

        try {
            const response = await axios.post('http://localhost:8080/api/categories/start', data, {
                headers: {
                    'Authorization': `Bearer ${token}`, // 토큰을 헤더에 추가
                },
            });
            console.log('카테고리 생성 성공:', response.data);
        } catch (error) {
            console.error('카테고리 생성 실패:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="카테고리 이름"
                required
            />
            <input
                type="text"
                value={parentId}
                onChange={(e) => setParentId(e.target.value)}
                placeholder="부모 카테고리 ID (최상위면 빈칸)"
            />
            <button type="submit">카테고리 첫 생성</button>
        </form>
    );
};

export default CategoryCreateAtFirst;
