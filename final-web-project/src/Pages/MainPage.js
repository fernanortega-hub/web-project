import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import NavBar from '../Components/MainPage/NavBar/NavBar';
import PostForm from '../Components/MainPage/PostForm/PostForm';
import DisplayPosts from '../Components/MainPage/DisplayPosts/DisplayPosts';
import Footer from '../Components/MainPage/Footer/Footer';
import { ToastContainer, toast } from "react-toastify";
import { Auth } from "../Services/Services";
import Redirect from "./Redirect";



const MainPage = () => {
    const [role, setRole] = useState();
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
    //Para los panas: si no usaba useEffect entraba en loop hasta que devolviera la promesa --BORRAR--
    useEffect(()=>{

        const verifyUser = async (token) =>{
            try{
                let response = await Auth(token);
                setRole(response.role);
                localStorage.setItem('role', role);

            }catch(error){
                toast('Algo salio mal, inicia sesion nuevamente', { type: 'error' });
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                navigate('/');
            }
        }
        verifyUser(token);
    },[]);

    if(!localStorage.getItem('token')) return <Redirect/>;

    //createPost(title, description, url); -> setPost();
    //logout(); -> emptyLocalStorage && set role to undefined;
    return (    //prototype -> if approved then pass to components
        
        <div className="flex flex-col justify-items-center items-center bg-gray-200 gap-3 overflow-x-hidden">
            <ToastContainer />
            <NavBar/>
            {role === "admin" && <PostForm/>}
            <DisplayPosts/>
            <Footer/>
        </div>
    );
};

export default MainPage;