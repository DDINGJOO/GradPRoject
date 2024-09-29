import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const ChatRoom = () => {
    const { roomId } = useParams();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const stompClientRef = useRef(null);  // stompClient를 useRef로 관리하여 재렌더링 시에도 유지
    const [isConnected, setIsConnected] = useState(false); // 연결 상태를 추적

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws-stomp');
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, () => {
            setIsConnected(true); // 연결 완료
            stompClientRef.current = stompClient; // stompClient 저장

            // 방 구독
            stompClient.subscribe(`/room/${roomId}`, (msg) => {
                const receivedMessage = JSON.parse(msg.body);
                setMessages((prevMessages) => [...prevMessages, receivedMessage]);
            });
        }, (error) => {
            console.error('WebSocket connection error:', error);
        });

        return () => {
            if (stompClientRef.current) {
                stompClientRef.current.disconnect();
            }
        };
    }, [roomId]);

    const sendMessage = () => {
        if (stompClientRef.current && isConnected && message.trim()) {
            const chatMessage = {
                sender: 'YourUsername',  // 실제 사용자 이름
                message: message,
            };

            // 메시지 전송
            stompClientRef.current.send(`/send/${roomId}`, {}, JSON.stringify(chatMessage));
            setMessage('');
        } else if (!isConnected) {
            console.error('Cannot send message, WebSocket connection is not established.');
        }
    };

    return (
        <div>
            <h2>Chat Room {roomId}</h2>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>
                        <strong>{msg.sender}:</strong> {msg.message}
                    </li>
                ))}
            </ul>

            {/* 메시지 입력과 전송 */}
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message"
            />
            <button onClick={sendMessage}>Send</button>
            {/* 연결되기 전에는 전송 버튼이 비활성화 */}
        </div>
    );
};

export default ChatRoom;
