import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SearchBoard = () => {
    const [keyword, setKeyword] = useState('');
    const [boards, setBoards] = useState([]);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/boards/search?keyword=${keyword}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // 토큰 추가
                },
            });
            setBoards(response.data.result.data || []); // 기본값 설정
        } catch (err) {
            console.error('Error fetching search results:', err);
            setError('Error occurred while fetching search results.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch();
    };

    return (
        <div>
            <h2>게시글 검색</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="검색어를 입력하세요"
                    required
                />
                <button type="submit">검색</button>
            </form>
            {error && <p>{error}</p>}
            <ul>
                {boards.map((board) => (
                    <li key={board.id}>
                        <a href={`/board/${board.id}`}>{board.title} (id = {board.id})</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchBoard;
