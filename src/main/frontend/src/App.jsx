import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './BackData/Auth/LoginPage'; // 로그인 페이지
import SignUpPage from './BackData/Auth/SignUpPage'; // 회원가입 페이지
import UserList from './BackData/Member/UserList'; // 유저 리스트
import UserDetail from './BackData/Member/UserDetail'; // 유저 상세
import UserEdit from './BackData/Member/UserEdit'; // 유저 수정
import CurrentUser from "./BackData/Member/CurrentUser";
import SendMessage from "./BackData/Message/SendMessage";
import ReadMessagesListBySender from "./BackData/Message/ReadMessagesListBySender";
import ReadMessagesListByReceiver from "./BackData/Message/ReadMessagesListByReceiver";
import DeleteMessageByReceiver from "./BackData/Message/DeleteMessageByReceiver";
import DeleteMessagesBySender from "./BackData/Message/DeleteMessagesBySender";


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
                <Route path="/users/current" element={<CurrentUser />} />

                {/* 메세지 보내기, 확인, 삭제*/}
                <Route path="messages/send" element={<SendMessage />}/>
                <Route path="messages/sender" element={<ReadMessagesListBySender />}/>
                <Route path="messages/receiver" element={<ReadMessagesListByReceiver />}/>
                <Route path="messages/receiver/delete/" element={<DeleteMessageByReceiver />}/>
                <Route path="messages/sender/delete/" element={<DeleteMessageByReceiver />}/>



                {/* 기본 경로 (루트로 접속했을 때 리다이렉트) */}
                <Route path="/" element={<UserList />} />
            </Routes>
        </Router>
    );
};

export default App;
