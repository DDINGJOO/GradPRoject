import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BoardCreate = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    // 카테고리 목록을 가져오는 함수
    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/categories', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            setCategories(response.data.result.data); // 카테고리 데이터 설정
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleImageChange = (e) => {
        setImages([...e.target.files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        images.forEach((image) => {
            formData.append('images', image); // 이미지 첨부
        });

        try {
            const response = await axios.post(`http://localhost:8080/api/boards?category=${selectedCategory}`, formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'multipart/form-data', // FormData 사용시 반드시 설정
                },
            });
            console.log('Board created successfully:', response.data);
            alert('게시글이 생성되었습니다!');
            // 폼 필드 초기화
            setTitle('');
            setContent('');
            setImages([]);
            setSelectedCategory(''); // 카테고리 초기화
        } catch (error) {
            console.error('Error creating board:', error);
            alert('게시글 생성 중 오류가 발생했습니다.');
        }
    };

    // 카테고리를 계층적으로 표현하는 재귀 함수
    const renderCategories = (categories) => {
        return categories.map((category) => (
            <option key={category.id} value={category.id}>
                {category.name} (id = {category.id})
            </option>
        ));
    };

    const renderCategoryHierarchy = (categories) => {
        return categories.map((category) => (
            <optgroup label={`${category.name} (id = ${category.id})`} key={category.id}>
                {renderCategories(category.children)}
            </optgroup>
        ));
    };

    return (
        <div>
            <h2>Create Board</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Category:</label>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        required
                    >
                        <option value="">Select a category</option>
                        {renderCategoryHierarchy(categories)}
                    </select>
                </div>
                <div>
                    <label>Images:</label>
                    <input
                        type="file"
                        multiple
                        onChange={handleImageChange}
                    />
                </div>
                <button type="submit">Create Board</button>
            </form>
        </div>
    );
};

export default BoardCreate;
