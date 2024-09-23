import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/sign-in', {
                username,
                password,
            });

            // 서버의 응답 확인
            if (response.data.success) {
                // accessToken과 refreshToken 저장
                localStorage.setItem('accessToken', response.data.result.data.accessToken);
                localStorage.setItem('refreshToken', response.data.result.data.refreshToken);
                setMessage('Login successful!');
                // 리다이렉션 또는 다른 페이지로 이동하는 로직 추가 가능
            } else {
                setMessage('Login failed!'); // 로그인 실패 처리
            }
        } catch (error) {
            setMessage('Login failed! Please check your credentials.');
            console.error('Login error:', error.response); // 에러 로그 출력
        }
    };


    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username: </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default LoginPage;
