import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SentMessages = () => {
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSentMessages = async () => {
            try {
                // 서버에서 로그인한 유저가 보낸 메시지 요청
                const response = await axios.get('http://localhost:8080/api/messages/sender', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // 로그인 시 받은 Access Token
                    }
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

        fetchSentMessages();
    }, []);

    return (
        <div>
            <h2>Sent Messages</h2>
            {error && <p>{error}</p>}
            {messages.length > 0 ? (
                <ul>
                    {messages.map((message) => (
                        <li key={message.id}>
                            <h3>{message.title}</h3>
                            <p><strong>To:</strong> {message.receiverName}</p>
                            <p>{message.content}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No messages sent yet.</p>
            )}
        </div>
    );
};

export default SentMessages;
