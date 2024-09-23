import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Auth/LoginPage'; // 로그인 페이지
import SignUpPage from './Auth/SignUpPage'; // 회원가입 페이지
import UserList from './Member/UserList'; // 유저 리스트
import UserDetail from './Member/UserDetail'; // 유저 상세
import UserEdit from './Member/UserEdit'; // 유저 수정
import CurrentUser from "./Member/CurrentUser";

const App = () => {
    return (
        <Router>
            <Routes>
                {/* 로그인 및 회원가입 경로 */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />

                {/* 유저 리스트, 상세 및 수정 */}
                <Route path="/users" element={<UserList />} />
                <Route path="/users/:id" element={<UserDetail />} />
                <Route path="/users/:id/edit" element={<UserEdit />} />
                <Route path="users/current" element={<CurrentUser />} />


                {/* 기본 경로 (루트로 접속했을 때 리다이렉트) */}
                <Route path="/" element={<UserList />} />
            </Routes>
        </Router>
    );
};

export default App;
