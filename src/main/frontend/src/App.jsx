import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './BackData/Auth/LoginPage';
import SignUpPage from './BackData/Auth/SignUpPage';
import UserList from './BackData/Member/UserList';
import UserDetail from './BackData/Member/UserDetail';
import UserEdit from './BackData/Member/UserEdit';
import CurrentUser from "./BackData/Member/CurrentUser";
import SendMessage from "./BackData/Message/SendMessage";
import ReadMessagesListBySender from "./BackData/Message/ReadMessagesListBySender";
import ReadMessagesListByReceiver from "./BackData/Message/ReadMessagesListByReceiver";
import DeleteMessageByReceiver from "./BackData/Message/DeleteMessageByReceiver";
import DeleteMessagesBySender from "./BackData/Message/DeleteMessagesBySender";
import CreateCategory from "./BackData/Category/CreateCategory";
import DeleteCategory from "./BackData/Category/DeleteCategory";
import FirstCreateCategory from "./BackData/Category/FirstCreateCategory";
import ReadCategory from "./BackData/Category/ReadCategory";
import CategoryUnion from "./BackData/Category/CategoryUnion";
import BoardCreate from "./BackData/Board/BoardCreate";
import BoardList from "./BackData/Board/BoardList";
import BoardDetail from "./BackData/Board/BoardDetail";
import BoardSearch from "./BackData/Board/BoardSearch";
import BoardEdit from "./BackData/Board/BoardEdit";
import Comment from "./BackData/Comment/Comment";



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

                {/* 메세지 CRUD*/}
                <Route path="messages/send" element={<SendMessage />} />
                <Route path="messages/sender" element={<ReadMessagesListBySender />} />
                <Route path="messages/receiver" element={<ReadMessagesListByReceiver />} />
                <Route path="messages/receiver/delete/" element={<DeleteMessageByReceiver />} />
                <Route path="messages/sender/delete/" element={<DeleteMessagesBySender />} />

                {/* 카테고리 CRUD */}
                <Route path="/categories" element={<ReadCategory />} />
                <Route path="/categories/new" element={<CreateCategory />} />
                <Route path="/categories/delete" element={<DeleteCategory />} />
                <Route path="/categories/init" element={<FirstCreateCategory />} />
                <Route path="/categories/union" element={<CategoryUnion />} />

                {/* 게시글 CRUD */}
                <Route path="/boards/create" element={<BoardCreate />} />
                <Route path="/boards/list" element={<BoardList />} />
                <Route path="/boards/detail/:id" element={<BoardDetail />} />
                <Route path="/boards/search" element={<BoardSearch />} />
                <Route path="/boards/:id/edit" element={<BoardEdit />} />

                {/* 기본 경로  */}
                <Route path="/" element={<UserList />} />
            </Routes>
        </Router>
    );
};

export default App;
