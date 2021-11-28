import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import PostCard from "../Components/MainPage/DisplayPosts/PostCard/PostCard";
import { Auth } from "../Services/Services";
import Loading from "../Components/Loadings/Loading";
import { useNavigate } from "react-router";

const Favorites = () => {
    const navigate = useNavigate();
    const response3 = useRef();
    const [postIds, setPostIds] = useState([]);
    const [posts, setPosts] = useState([]);
    const [username, setUser] = useState("");
    
    useEffect(() => {
        async function getAllFavs() {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            };
    
            const response = await axios.get(`https://posts-pw2021.herokuapp.com/api/v1/post/fav`, config);
            setPosts(response.data);
        }
        
        getAllFavs();
    }, []);
    if(posts === undefined || null || []) {<Loading/>};

        response3.current = posts;
        if(response3.current === undefined || null || []) return <Loading/>;
        console.log(response3.current);

    

    return (
        <div>
            <h1> Laifdsbbb </h1>
            <button onClick={(e)=> {navigate('/MainPage')}}> Hola </button>
            
        </div>
    );
}

export default Favorites;