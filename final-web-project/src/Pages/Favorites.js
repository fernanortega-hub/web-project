import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import PostCard from "../Components/MainPage/DisplayPosts/PostCard/PostCard";
import { Auth } from "../Services/Services";
import Loading from "../Components/Loadings/Loading";
import { useNavigate } from "react-router";
import { whileStatement } from "@babel/types";

const Favorites = () => {
    const [PostFav, setPostFav] = useState({
        status: 'Loading',
        data: null,
    });
    const username = localStorage.getItem('username');

    useEffect(() => {
        const getFavList = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            };

            const { data: response } = await axios.get(`https://posts-pw2021.herokuapp.com/api/v1/post/fav`, config);

            response.favorites.map((id) => {
                if (id) {
                    getOne(id);
                }
            });
        };
        getFavList();

        const getOne = async (id) => {
            const postF = await axios.get(`https://posts-pw2021.herokuapp.com/api/v1/post/one/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setPostFav({ status: 'Ok', data: postF.data });
        };

    }, []);

    if (PostFav.data == null || undefined) return <Loading/>
    
    // console.log(PostFav.data);
    // console.log(Object.values(PostFav.data));
    let arrayObjects = [];
    
    arrayObjects = PostFav.data._id;


    console.log(arrayObjects);

    return(
        <div className="w-full min-h-screen bg-gray-100 rounded-xl space-y-10 flex flex-col py-8 items-center laptop:w-1/2 dark:bg-gray-600">
            <h1> HOla </h1>
            {/* {
                Object.values(PostFav.data) && Object.values(PostFav.data)((it) => <PostCard key={it._id} struct={it} username={username} />)
            } */}
        </div>
    );
};


export default Favorites;