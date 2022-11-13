import React, { useState } from 'react';
import Login from './login';
import Home from './home'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import Info from './info';
import Todos from './todos';
import Posts from './posts';
import Albums from './albums';
import Post from './post';
import Comments from './comments';
import Album from './album';





function App() {

    const [users, setUsers] = useState();
    let data;
    let res;

    // Fecth GET Users

    async function getUserFromServer() {
        try {
            res = await fetch('https://jsonplaceholder.typicode.com/users')
            data = await res.json();
            setUsers(data)
        } catch (error) {
            alert(error, "network error")
        }
    }

    useEffect(() => {
        getUserFromServer();
    }, [])



    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login data={users} />} />
                <Route path='/home' element={<Home />}>
                    <Route index element={<Info />} />
                    <Route path='info' element={<Info />} />
                    <Route path='todos' element={<Todos />} />
                    <Route path='posts' element={<Posts />} />
                    <Route path='posts/:postID' element={<Post />} >
                        <Route path='comments' element={<Comments />} />
                    </Route>
                    <Route path='albums' element={<Albums />} />
                    <Route path='albums/:albumID' element={<Album />} />
                    <Route path='*' element={<div><h1>This page dose'nt existe</h1></div>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;