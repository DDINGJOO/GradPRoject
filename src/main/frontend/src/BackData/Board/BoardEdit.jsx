import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BoardEdit = () => {
    const { id } = useParams(); // 게시글 ID
    const [board, setBoard] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [addedImages, setAddedImages] = useState([]); // 추가된 이미지 상태
    const [deletedImages, setDeletedImages] = useState([]); // 삭제할 이미지 ID 상태
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
                const fetchedBoard = response.data.result.data;
                setBoard(fetchedBoard); // 데이터 설정
                setTitle(fetchedBoard.title); // 제목 설정
                setContent(fetchedBoard.content); // 본문 설정
            } catch (err) {
                console.error('Error fetching board details:', err);
                setError('Error occurred while fetching board details.');
            }
        };

        fetchBoard();
    }, [id]);

    const handleImageChange = (e) => {
        setAddedImages([...e.target.files]); // 추가된 이미지 파일 상태 설정
    };

    const handleDeleteImage = (imageId) => {
        setDeletedImages([...deletedImages, imageId]); // 삭제할 이미지 ID 추가
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);

        // 추가된 이미지를 FormData에 추가
        addedImages.forEach((file) => {
            formData.append('addedImages', file); // 추가된 이미지 파일 추가
        });

        // 삭제할 이미지 ID를 FormData에 추가
        deletedImages.forEach((id) => {
            formData.append('deletedImages', id); // 삭제할 이미지 ID 추가
        });

        try {
            await axios.put(`http://localhost:8080/api/boards/${id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // 토큰 추가
                    'Content-Type': 'multipart/form-data', // multipart/form-data 설정
                },
            });
            alert('게시물이 수정되었습니다.');
            navigate(`/boards/${id}`); // 수정 후 게시물 상세 페이지로 이동
        } catch (err) {
            console.error('Error updating the board:', err);
            alert('게시물 수정에 실패했습니다.');
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
            <h2>게시물 수정 (id = {board.id})</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>제목:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>내용:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>추가된 이미지 첨부:</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple // 여러 개의 이미지 파일 선택 가능
                        onChange={handleImageChange}
                    />
                </div>
                <div>
                    <h4>현재 이미지 목록</h4>
                    {board.images.map((image) => (
                        <div key={image.id}>
                            <img src={`http://localhost:8080/images/${image.uniqueName}`} alt={image.originName} width="100" />
                            <button type="button" onClick={() => handleDeleteImage(image.id)}>삭제</button>
                        </div>
                    ))}
                </div>
                <button type="submit">수정하기</button>
            </form>
        </div>
    );
};

export default BoardEdit;
