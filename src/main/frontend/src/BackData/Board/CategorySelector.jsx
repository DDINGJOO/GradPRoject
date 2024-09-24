import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CategorySelector = ({ onSelect }) => {
    const [categories, setCategories] = useState([]);

    // 카테고리 목록을 가져오는 함수
    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/categories', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            setCategories(response.data.result.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // 카테고리 트리 렌더링
    const renderCategories = (categories) => {
        return categories.map((category) => (
            <li key={category.id}>
                <span onClick={() => onSelect(category.id)} style={{ cursor: 'pointer' }}>
                    {category.name} (ID: {category.id})
                </span>
                {category.children && category.children.length > 0 && (
                    <ul>{renderCategories(category.children)}</ul>
                )}
            </li>
        ));
    };

    return (
        <div>
            <h2>카테고리 선택</h2>
            <ul>{renderCategories(categories)}</ul>
        </div>
    );
};

export default CategorySelector;
