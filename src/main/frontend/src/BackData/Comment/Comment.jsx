import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Comments = ({ boardId }) => {
    const [comments, setComments] = useState([]); // 댓글 목록 상태
    const [newComment, setNewComment] = useState(''); // 새 댓글 상태
    const [error, setError] = useState(null); // 에러 상태

    // 댓글 목록을 조회하는 함수
    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/comments?boardId=${boardId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // 토큰 추가
                },
            });
            setComments(response.data.result.data); // 댓글 목록 설정
        } catch (err) {
            console.error('댓글 조회 실패:', err);
            setError('댓글을 불러오는 데 실패했습니다.');
        }
    };

    // 댓글 작성 함수
    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!newComment) return;

        const commentData = {
            content: newComment,
            boardId: boardId,
        };

        try {
            await axios.post('http://localhost:8080/api/comments', commentData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // 토큰 추가
                    'Content-Type': 'application/json', // JSON 형식으로 전송
                },
            });
            setNewComment(''); // 댓글 입력 초기화
            fetchComments(); // 댓글 목록 갱신
        } catch (err) {
            console.error('댓글 추가 실패:', err);
            setError('댓글 추가에 실패했습니다.');
        }
    };

    // 댓글 삭제 함수
    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(`http://localhost:8080/api/comments/${commentId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // 토큰 추가
                },
            });
            fetchComments(); // 댓글 목록 갱신
        } catch (err) {
            console.error('댓글 삭제 실패:', err);
            setError('댓글 삭제에 실패했습니다.');
        }
    };

    useEffect(() => {
        fetchComments(); // 컴포넌트가 마운트될 때 댓글 목록 조회
    }, [boardId]);

    if (error) {
        return <p>{error}</p>; // 에러 처리
    }

    return (
        <div>
            <h3>댓글 목록</h3>
            <form onSubmit={handleAddComment}>
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="댓글을 입력하세요"
                    required
                />
                <button type="submit">댓글 추가</button>
            </form>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id}>
                        <strong>{comment.userDto.name}</strong>: {comment.content}
                        <button onClick={() => handleDeleteComment(comment.id)}>삭제</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Comments;
