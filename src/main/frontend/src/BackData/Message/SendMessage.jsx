import React, { useState } from 'react';
import axios from 'axios';

const SendMessage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [receiverNickname, setReceiverNickname] = useState('');
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postData = {
            title: title,
            content: content,
            receiverNickname: receiverNickname,
        };

        try {
            // API 요청
            const response = await axios.post('http://localhost:8080/api/messages', postData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // 로그인 시 받은 access token
                }
            });

            if (response.data.success) {
                setMessage('Message sent successfully!');
            } else {
                setMessage('Failed to send message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setMessage('Error occurred while sending message.');
        }
    };

    return (
        <div>
            <h2>Send Message</h2>
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
                    ></textarea>
                </div>
                <div>
                    <label>Receiver Nickname:</label>
                    <input
                        type="text"
                        value={receiverNickname}
                        onChange={(e) => setReceiverNickname(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Send Message</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default SendMessage;
