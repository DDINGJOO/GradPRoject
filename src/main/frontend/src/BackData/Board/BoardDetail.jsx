import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BoardDetail = () => {
    const { id } = useParams(); // 게시글 ID
    const [board, setBoard] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // 페이지 이동을 위해 useNavigate 사용

    useEffect(() => {
        const fetchBoard = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/boards/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // 토큰 추가
                    },
                });
                setBoard(response.data.result.data); // 데이터 설정
            } catch (err) {
                console.error('Error fetching board details:', err);
                setError('Error occurred while fetching board details.');
            }
        };

        fetchBoard();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('정말로 이 게시물을 삭제하시겠습니까?')) {
            try {
                await axios.delete(`http://localhost:8080/api/boards/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // 토큰 추가
                    },
                });
                alert('게시물이 삭제되었습니다.');
                navigate('/board'); // 삭제 후 게시물 목록으로 이동
            } catch (err) {
                console.error('Error deleting the board:', err);
                alert('게시물 삭제에 실패했습니다.');
            }
        }
    };

    if (error) {
        return <p>{error}</p>;
    }

    if (!board) {
        return <p>Loading...</p>; // 로딩 상태 처리
    }

    return (
        <div>
            <h2>{board.title} (id = {board.id})</h2>
            <p>{board.content}</p>
            <p>작성자: {board.userDto?.name || '정보 없음'}</p>
            <p>작성일: {board.createdAt}</p>
            {board.images && board.images.length > 0 && (
                <div>
                    <h3>이미지:</h3>
                    {board.images.map(image => (
                        <img key={image.id} src={`http://localhost:8080/images/${image.uniqueName}`} alt={image.originName} />
                    ))}
                </div>
            )}
            <button onClick={handleDelete}>게시물 삭제</button>
        </div>
    );
};

export default BoardDetail;
