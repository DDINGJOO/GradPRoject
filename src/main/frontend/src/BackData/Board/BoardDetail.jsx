import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Comments from "../Comment/Comment";

const BoardDetail = () => {
    const { id } = useParams(); // URL 파라미터에서 게시글 ID 가져오기
    const [board, setBoard] = useState(null); // 게시글 상태
    const [error, setError] = useState(null); // 에러 상태

    useEffect(() => {
        const fetchBoardDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/boards/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // 토큰 추가
                    },
                });
                setBoard(response.data.result.data); // 게시글 데이터 설정
            } catch (err) {
                console.error('게시글 조회 실패:', err);
                setError('게시글을 불러오는 데 실패했습니다.');
            }
        };

        fetchBoardDetail(); // 게시글 상세 조회
    }, [id]);

    if (error) {
        return <p>{error}</p>; // 에러 처리
    }

    if (!board) {
        return <p>Loading...</p>; // 데이터 로딩 중
    }

    return (
        <div>
            <h1>{board.title}</h1>
            <p>{board.content}</p>
            <p>작성자: {board.userDto.name}</p>
            {board.images.map(image => (
                <img key={image.id} src={`http://localhost:8080/images/${image.uniqueName}`} alt={image.originName} />
            ))}
            <h3>댓글</h3>
            <Comments boardId={board.id} /> {/* 댓글 컴포넌트 사용 */}
        </div>
    );
};

export default BoardDetail;
