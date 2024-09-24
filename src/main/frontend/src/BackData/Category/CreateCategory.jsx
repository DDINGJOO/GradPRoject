import React, { useState } from 'react';
import axios from 'axios';

const CategoryCreate = () => {
    const [name, setName] = useState('');
    const [parentId, setParentId] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const categoryData = {
            name: name,
            parentId: parentId ? parentId : null,  // Send null for no parent
        };

        try {
            const token = localStorage.getItem('accessToken');  // Get token from local storage
            if (!token) {
                setError('로그인 토큰이 필요합니다.');
                return;
            }

            const response = await axios.post('http://localhost:8080/api/categories', categoryData, {
                headers: {
                    'Authorization': `Bearer ${token}`,  // Add token to request headers
                },
            });

            setSuccessMessage('카테고리가 성공적으로 생성되었습니다.');
            setError(null);  // Clear any previous errors
        } catch (error) {
            console.error('Error creating category:', error);
            setError('카테고리를 생성하는 중 오류가 발생했습니다.');
            setSuccessMessage('');
        }

    };

    return (
        <div>
            <h2>Create Category</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        minLength="2"
                        maxLength="15"
                    />
                </div>
                <div>
                    <label>Parent Category ID (Optional):</label>
                    <input
                        type="number"
                        value={parentId}
                        onChange={(e) => setParentId(e.target.value)}
                    />
                </div>
                <button type="submit">Create Category</button>
            </form>
        </div>
    );
};

export default CategoryCreate;
