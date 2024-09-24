import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 추가된 import

const BoardList = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [boards, setBoards] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // 추가된 useNavigate

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

    // 게시물 목록을 가져오는 함수
    const fetchBoards = async (categoryId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/boards/all/${categoryId}/?page=0`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            setBoards(response.data.result.data);
        } catch (error) {
            console.error('Error fetching boards:', error);
            setError('게시물 목록을 가져오는 중 오류가 발생했습니다.');
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (selectedCategoryId) {
            fetchBoards(selectedCategoryId);
        }
    }, [selectedCategoryId]);

    // 카테고리 트리 렌더링
    const renderCategories = (categories) => {
        return categories.map((category) => (
            <li key={category.id}>
                <span onClick={() => setSelectedCategoryId(category.id)} style={{ cursor: 'pointer' }}>
                    {category.name} (ID: {category.id})
                </span>
                {category.children && category.children.length > 0 && (
                    <ul>{renderCategories(category.children)}</ul>
                )}
            </li>
        ));
    };

    // 게시물 클릭 핸들러
    const handleBoardClick = (boardId) => {
        navigate(`/board/${boardId}`); // 게시물 상세 페이지로 이동
    };

    return (
        <div>
            <h2>카테고리 선택</h2>
            <ul>{renderCategories(categories)}</ul>

            {selectedCategoryId && (
                <>
                    <h2>게시물 목록 (카테고리 ID: {selectedCategoryId})</h2>
                    {error && <p>{error}</p>}
                    <ul>
                        {boards.map((board) => (
                            <li key={board.id} onClick={() => handleBoardClick(board.id)} style={{ cursor: 'pointer' }}>
                                <h3>{board.title}</h3>
                                <p>{board.content}</p>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default BoardList;
