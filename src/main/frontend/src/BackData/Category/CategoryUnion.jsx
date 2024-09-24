import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CategoryManagement = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [parentId, setParentId] = useState('');
    const [error, setError] = useState(null);

    // 모든 카테고리를 서버에서 가져오는 함수
    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/categories', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            setCategories(response.data.result.data); // 카테고리 데이터 설정
        } catch (err) {
            console.error('Error fetching categories:', err);
            setError('Error occurred while fetching categories.');
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // 카테고리 생성 함수
    const handleCreate = async (e) => {
        e.preventDefault();
        const categoryData = {
            name: name,
            parentId: parentId ? parentId : null,
        };

        try {
            await axios.post('http://localhost:8080/api/categories', categoryData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            alert('Category created successfully!');
            fetchCategories(); // 카테고리 목록 새로 고침
            setName(''); // 입력 필드 초기화
            setParentId(''); // 입력 필드 초기화
        } catch (error) {
            console.error('Error creating category:', error);
            alert('Error creating category.');
        }
    };

    // 카테고리 삭제 함수
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this category?');
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:8080/api/categories/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            alert('Category deleted successfully!');
            fetchCategories(); // 카테고리 목록 새로 고침
        } catch (error) {
            console.error('There was an error deleting the category!', error);
            alert('Error deleting category.');
        }
    };

    // 재귀적으로 카테고리를 렌더링하는 함수
    const renderCategories = (categories) => {
        return categories.map((category) => (
            <li key={category.id}>
                {category.name} (id = {category.id}) {/* 카테고리 이름 옆에 ID 표시 */}
                <button onClick={() => handleDelete(category.id)}>Delete</button>
                {category.children && category.children.length > 0 && (
                    <ul>
                        {renderCategories(category.children)}
                    </ul>
                )}
            </li>
        ));
    };

    return (
        <div>
            <h2>Category Management</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleCreate}>
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
            <h3>Existing Categories</h3>
            <ul>
                {renderCategories(categories)}
            </ul>
        </div>
    );
};

export default CategoryManagement;
