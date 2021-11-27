import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import PostCard from "../Components/MainPage/DisplayPosts/PostCard/PostCard";
import { Auth } from "../Services/Services";


const Favorites = () => {
    const [favList, setFavList] = useState([]);
    const [postIds, setPostIds] = useState([]);
    const [posts, setPosts] = useState([]);
    const [username, setUser] = useState("");
    
    //CONSIGUE LISTA DE IDS
    useEffect(()=>{
        console.log("ENTRO 1")
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };

        const getFavIds = async () => {
            const { data: response } = await axios.get(`https://posts-pw2021.herokuapp.com/api/v1/post/fav`, config);
            setPostIds(response.favorites);
        };
        getFavIds();

    },[favList]);

    //CONSIGUE LOS ELEMENTOS DE LOS IDS
    useEffect(()=>{
        console.log("ENTRO 2")
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };
        let auxPosts =[];
        const getPost = async (favId) => {
            const {data: response} = await axios.get(`https://posts-pw2021.herokuapp.com/api/v1/post/one/${favId}`, config);
            let post;
            if(response) 
            post = response;
            console.log("respuesta:" + post);
            auxPosts.push(post);
        }
        
        const arrayChecker = () => {
            if(postIds){
                postIds.map((id)=>{
                    getPost(id);
                });
            }
            console.log("POSTS: " + auxPosts);
            setPosts(auxPosts);
        }
        arrayChecker();
    }, [postIds]);

    //CONSIGUE USERNAME
    useEffect(() => {
        const verifyUser = async () => {
            try {
                const response = await Auth(localStorage.getItem('token'));
                setUser(response.username);
            } catch (error) {
                toast('Algo salio mal, inicia sesion nuevamente', { type: 'error' });
//                navigate('/');
            }
        }
        verifyUser();
    }, [posts]);

    return(
        <div>
            {postIds && posts.map((post)=>{ <PostCard username={username} struct={post}/>})}
        </div>
    );
}

export default Favorites;