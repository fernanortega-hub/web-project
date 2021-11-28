import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import NavBar from '../Components/MainPage/NavBar/NavBar';
import PostForm from '../Components/MainPage/PostForm/PostForm';
import DisplayPosts from '../Components/MainPage/DisplayPosts/DisplayPosts';

import { ToastContainer, toast } from "react-toastify";
import { Auth } from "../Services/Services";
import Redirect from "../Components/Loadings/Redirect";
import LoadingPage from "../Components/Loadings/LoadingPage";

const MainPage = () => {
    const [username, setUser] = useState();
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role');

    // Si no se pone el useEffect, el componente entra en loop hasta que la promesa sea resuelta
    useEffect(() => {
        const verifyUser = async () => {
            try {
                const response = await Auth(token);
                setUser(response.username);
            } catch (error) {
                toast('Algo salio mal, inicia sesion nuevamente', { type: 'error' });
                navigate('/');
            }
        }
        verifyUser();
        document.title = "Principal";
    }, []);

    if(username===undefined) return <LoadingPage />

    if (!localStorage.getItem('token')) return <Redirect />;

    return (    
        <div className="flex flex-col justify-items-center items-center bg-gray-200 gap-3 overflow-x-hidden dark:bg-gray-900">
            <ToastContainer />
            <NavBar username={username} />
            {role === "admin" && <PostForm />}
            <DisplayPosts username={username} />
        </div>
    );
};

export default MainPage;