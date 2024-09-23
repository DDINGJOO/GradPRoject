import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReceivedMessagesWithDelete = () => {
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);

    // 받은 메시지 목록을 서버에서 가져오는 함수
    const fetchReceivedMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/messages/receiver', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // 로그인 시 받은 Access Token
                },
            });

            if (response.data.success) {
                setMessages(response.data.result.data); // 받은 메시지 데이터를 저장
            } else {
                setError('Failed to fetch messages.');
            }
        } catch (err) {
            console.error('Error fetching messages:', err);
            setError('Error occurred while fetching messages.');
        }
    };

    // 메시지를 삭제하는 함수
    const deleteMessage = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/messages/receiver/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // 로그인 시 받은 Access Token
                },
            });

            if (response.status === 200) {
                // 메시지 삭제 후 남은 메시지 목록 갱신
                setMessages(messages.filter((message) => message.id !== id));
                alert('Message deleted successfully.');
            } else {
                alert('Failed to delete message.');
            }
        } catch (err) {
            console.error('Error deleting message:', err);
            alert('Error occurred while deleting message.');
        }
    };

    // 컴포넌트가 마운트될 때 받은 메시지 목록을 가져옴
    useEffect(() => {
        fetchReceivedMessages();
    }, []);

    return (
        <div>
            <h2>Received Messages</h2>
            {error && <p>{error}</p>}
            {messages.length > 0 ? (
                <ul>
                    {messages.map((message) => (
                        <li key={message.id}>
                            <h3>{message.title}</h3>
                            <p><strong>From:</strong> {message.senderName}</p>
                            <p>{message.content}</p>
                            {/* 메시지 삭제 버튼 */}
                            <button onClick={() => deleteMessage(message.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No messages received yet.</p>
            )}
        </div>
    );
};

export default ReceivedMessagesWithDelete;
