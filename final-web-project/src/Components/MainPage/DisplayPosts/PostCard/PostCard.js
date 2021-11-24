
import react, { useState } from "react";
import { FaUserCircle, FaStar, FaComment, FaHeart } from "react-icons/fa";

import axios from "axios";
import Comments from "../Comment/Comment";
import AddComment from "../AddComment/AddComment";
import shortid from 'shortid';
/* 
const [favorite, setFavorite] = useState(false);

    // onClickFavorite = () => {
    //     setFavorite(!favorite);
    //     let config = {
    //         headers: {
    //             "Authorization": `Bearer ${token}`
    //         }
    //     };

    //     try {
    //         let responseFavorite = axios.patch();
    //     } catch (error) {
            
    //     }
    // };
// };

*/

const PostCard = ({username, struct }) => {
    const {
        _id, title, description, image, user, likes, createdAt, comments
    } = struct;
    //comments
    const [showComm, setShow] = useState(false);
    const [commentSt, setComments] = useState(comments)

    //likes 
    const [liked, setLiked] = useState(likes.some((it) => it.username === username));
    const [likesNumber, setLikes] = useState(likes.length);

    const [favoriteBut, setFavorite] = useState(false);

    function addCommentChange(comments){
        const value = ([...commentSt, {...comments, user: {username}}]);
        setComments(value);
    }
    
    async function likesPost() {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }; 
            
            const {dataUser} = await axios.patch(`https://posts-pw2021.herokuapp.com/api/v1/post/like/${_id}`,null, config);               
            //cuando das like
            if (!liked) {
                setLikes(likesNumber + 1);
                setLiked(true);
            } else {
                //Cuando le quitas like
                setLikes(likesNumber - 1);
                setLiked(false);      
            }
        } catch (error) {
            console.log(error);
        }  
    }

    function favoritesPost() {
        try {
            if(!favoriteBut){
                setFavorite(true);
            }else{
                setFavorite(false)
            }
        } catch (error) {
            console.log(error);           
        }    
    }
    //Problema, como que no se trae el username entonces el boton de like no queda seteado como like y al recargar cambia de color
    //Posible error: la url puede estar mala, la que trae el token con el axios
    //Es necesesario arreglar 
    //Ver AddComment
    console.log(username);
    console.log(user?.username);
    console.log(likes.includes({username}));
    return (
        <div class=" h-4/6 bg-gray-100 flex justify-center items-center">
            <div class="max-w-md container bg-white rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
                <div> 
                    <h1 class="text-2xl mt-2 ml-4 font-bold text-gray-800 cursor-pointer hover:text-gray-900 transition duration-100">{title}</h1>
                    <p class="ml-4 mt-1 mb-2 text-gray-700 hover:underline cursor-pointer">{description}</p>
                    {/*<p className=" w-full text-xs flex justify-end lg:text-lg"> {new Date(createdAt).toLocaleDateString()} </p>*/}
                </div>
                <img class="w-full cursor-pointer" src={image} alt="" />
                <div class="flex p-4 justify-between">
                    <div class="flex items-center space-x-0">
                        <FaUserCircle class="w-10 rounded-full " size={25} />
                        <h2 class="text-gray-800 font-bold cursor-pointer">@{user?.username}</h2>
                    </div>
                <div class="flex space-x-2">
                    <div class="flex space-x-1 items-center">
                        <button onClick={()=>setShow(!showComm) } className={`${showComm && `text-blue-400`} text-gray-400`}><FaComment size={25}/></button>
                        <span>{commentSt.length}</span>
                    </div>
                    <div class="flex space-x-1 items-center">
                        <button onClick={likesPost} className={`${liked && `text-blue-400`} text-gray-400`} fill="currentColor"> <FaHeart size={25} className="text-green"/></button>
                        <span> {likes.length}</span>
                    </div>
                    <div class="flex space-x-3 items-center">
                        <button onClick={favoritesPost} className={`${favoriteBut && `text-blue-400`} text-gray-400`}><FaStar size={25} /></button>
                        
                    </div>
                </div>
            </div>
                <div className={`${!showComm && `hidden`}`} >
                    {
                        comments && commentSt.map((it) => <Comments key={shortid.generate()} infoComment={it}/>)            
                    }
                    <AddComment post={_id} afterSubmit={addCommentChange}/>
                </div>
            </div>
        </div>
    )
}

export default PostCard;



