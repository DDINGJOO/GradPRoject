import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReadCategory = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    // 계층형 카테고리를 재귀적으로 렌더링하는 함수
    const renderCategories = (categoryList) => {
        return categoryList.map((category) => (
            <li key={category.id}>
                {category.name}
                {category.children && category.children.length > 0 && (
                    <ul>
                        {renderCategories(category.children)}
                    </ul>
                )}
            </li>
        ));
    };

    // 카테고리 데이터를 서버에서 가져오는 함수
    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/categories', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            setCategories(response.data.result.data);  // 계층 구조를 반영한 데이터 저장
        } catch (err) {
            console.error('Error fetching categories:', err);
            setError('Error occurred while fetching categories.');
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div>
            <h2>Category List</h2>
            {error && <p>{error}</p>}
            <ul>
                {renderCategories(categories)}
            </ul>
        </div>
    );
};

export default ReadCategory;
