import React from 'react';
import axios from 'axios';

const DeleteCategory = ({ id }) => {
    const handleDelete = () => {
        const token = localStorage.getItem('accessToken'); // 저장된 토큰 가져오기

        axios.delete(`http://localhost:8080/api/categories/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`, // 토큰을 헤더에 추가
            },
        })
            .then(response => {
                alert('Category deleted successfully!');
            })
            .catch(error => {
                console.error('There was an error deleting the category!', error);
                alert('카테고리 삭제 중 오류가 발생했습니다.');
            });
    };

    return (
        <button onClick={handleDelete}>Delete Category</button>
    );
};

export default DeleteCategory;